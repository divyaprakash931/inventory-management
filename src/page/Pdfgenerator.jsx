import React from 'react';
import { jsPDF } from 'jspdf';

const PdfGenerator = ({ invoiceData }) => {
  // Sample data object
  const addTextToPdf = (doc, content, x, y, fontSize, fontStyle, color) => {
    doc.setFontSize(fontSize);
    doc.setFont("Helvetica", fontStyle);
    doc.setTextColor(...color);
    doc.text(String(content), x, y);
  };

  const drawRectangleWithBorder = (doc, x, y, width, height, borderColor, borderWidth) => {
    doc.setDrawColor(...borderColor);
    doc.setLineWidth(borderWidth);
    doc.rect(x, y, width, height, 'S');
  };

  const drawHorizontalLine = (doc, x1, y, x2, color, lineWidth) => {
    doc.setDrawColor(...color);
    doc.setLineWidth(lineWidth);
    doc.line(x1, y, x2, y);
  };

  const drawVerticalLine = (doc, x, y1, y2, color, lineWidth) => {
    doc.setDrawColor(...color);
    doc.setLineWidth(lineWidth);
    doc.line(x, y1, x, y2);
  };

  const generatePdf = () => {
    const doc = new jsPDF();

    // Frame for the invoice
    drawRectangleWithBorder(doc, 5, 10, 200, 235, [0, 0, 0], 0.1);

    // Horizontal lines for header and table
    drawHorizontalLine(doc, 5, 25, 205, [0, 0, 0], 0.1); // Header bottom line
    drawHorizontalLine(doc, 5, 55, 205, [0, 0, 0], 0.1); // Party details bottom line
    drawHorizontalLine(doc, 5, 85, 205, [0, 0, 0], 0.1); // Table header top line
    drawHorizontalLine(doc, 155+10, 70, 205, [0, 0, 0], 0.1); // Invoice details line
    drawVerticalLine(doc, 155+10, 55, 85, [0, 0, 0], .1); // Divider for invoice date/number

    drawHorizontalLine(doc, 5, 95, 205, [0, 0, 0], 0.1); // Divider under item header

    // Table grid lines
    drawVerticalLine(doc, 15, 85, 185, [0, 0, 0], 0.1); // S/N
    drawVerticalLine(doc, 105, 85, 185, [0, 0, 0], 0.1); // Description
    drawVerticalLine(doc, 130, 85, 185, [0, 0, 0], 0.1); // Quantity
    drawVerticalLine(doc, 150, 85, 185, [0, 0, 0], 0.1); // Rate
    drawVerticalLine(doc, 175, 85, 185, [0, 0, 0], 0.1); // Amount

    // GST and tax lines
    drawVerticalLine(doc, 105, 185, 235, [0, 0, 0], 0.1); // Divider for tax
    drawVerticalLine(doc, 175, 185, 235, [0, 0, 0], 0.1); // Divider for total
    drawHorizontalLine(doc, 5, 185, 205, [0, 0, 0], 0.1); // Tax table line
    drawHorizontalLine(doc, 105, 160 + 35, 205, [0, 0, 0], 0.1); 
    drawHorizontalLine(doc, 105, 170 + 35, 205, [0, 0, 0], 0.1); 
    drawHorizontalLine(doc, 105, 180 + 35, 205, [0, 0, 0], 0.1); 
    drawHorizontalLine(doc, 105, 190 + 35, 205, [0, 0, 0], 0.1); 
 // Net Tax Line
    drawHorizontalLine(doc, 5, 235, 205, [0, 0, 0], 0.1); 

    // Header content
    addTextToPdf(doc, invoiceData?.companyName, 60, 20, 16, "bold", [0, 0, 0]);
    addTextToPdf(doc, invoiceData?.companyAddress, 30, 35, 14, "normal", [0, 0, 0]);
    addTextToPdf(doc, `GST No: ${invoiceData?.companyGST} | Mob: ${invoiceData?.companyPhone} | PAN No: ${invoiceData?.companyPAN}`, 30, 43, 14, "normal", [0, 0, 0]);

    // Party and invoice information
    addTextToPdf(doc, `Party: ${invoiceData?.partyCompanyName}`, 10, 65, 14, "normal", [0, 0, 0]);
    addTextToPdf(doc, invoiceData?.partyCompanyAddress, 10, 72, 12, "normal", [0, 0, 0]);
    addTextToPdf(doc, `GST No: ${invoiceData?.partyCompanyGST} | Mob: ${invoiceData?.partyCompanyPhone} | PAN No: ${invoiceData?.partyCompanyPAN}`, 10, 80, 12, "normal", [0, 0, 0]);

    addTextToPdf(doc, `Invoice No: ${invoiceData?.invoiceNumber}`, 160+7, 64, 12, "normal", [0, 0, 0]);
    addTextToPdf(doc, `Date: ${invoiceData?.invoiceDate}`, 160+7, 79, 12, "normal", [0, 0, 0]);

    // Table header
    addTextToPdf(doc, "S/N", 6, 90, 12, "bold", [0, 0, 0]);
    addTextToPdf(doc, "Description", 45, 90, 11, "bold", [0, 0, 0]);
    addTextToPdf(doc, "HSN Code", 108, 90, 11, "bold", [0, 0, 0]);
    addTextToPdf(doc, "Quantity", 133, 90, 11, "bold", [0, 0, 0]);
    addTextToPdf(doc, "Rate", 157, 90, 11, "bold", [0, 0, 0]);
    addTextToPdf(doc, "Amount", 180, 90, 11, "bold", [0, 0, 0]);

    // Table content
    invoiceData?.items?.forEach((item, index) => {
      addTextToPdf(doc, index+1, 8, 105 + index * 10, 10, "normal", [0, 0, 0]);
      addTextToPdf(doc, item?.description, 40-22, 105 + index * 10, 10, "normal", [0, 0, 0]);
      addTextToPdf(doc, item?.hsn, 110, 105 + index * 10, 10, "normal", [0, 0, 0]);
      addTextToPdf(doc, item?.quantity, 135, 105 + index * 10, 10, "normal", [0, 0, 0]);
      addTextToPdf(doc, item?.rate, 155, 105 + index * 10, 10, "normal", [0, 0, 0]);
      addTextToPdf(doc, item?.quantity*item?.rate, 180, 105 + index * 10, 10, "normal", [0, 0, 0]);
    });

    // Total section
    addTextToPdf(doc, "Total Amount Before Tax", 110, 190, 10, "bold", [0, 0, 0]);
    addTextToPdf(doc, invoiceData?.totalBeforeTax, 180, 190, 10, "normal", [0, 0, 0]);

    // GST and taxes
    addTextToPdf(doc, `SGST ${invoiceData?.sgstPercentage}%`, 110, 200, 10, "normal", [0, 0, 0]);
    addTextToPdf(doc, invoiceData?.sgstAmount, 180, 200, 10, "normal", [0, 0, 0]);
    addTextToPdf(doc, `CGST ${invoiceData?.cgstPercentage}%`, 110, 210, 10, "normal", [0, 0, 0]);
    addTextToPdf(doc, invoiceData?.cgstAmount, 180, 210, 10, "normal", [0, 0, 0]);
    addTextToPdf(doc,`IGST ${invoiceData?.igstPercentage}%`, 110, 220, 10, "normal", [0, 0, 0]);
    addTextToPdf(doc, invoiceData?.igstAmount, 180, 220, 10, "normal", [0, 0, 0]);

    // Grand Total
    addTextToPdf(doc, "Grand Total", 110, 230, 10, "bold", [0, 0, 0]);
    addTextToPdf(doc, invoiceData?.grandTotal, 180, 230, 10, "bold", [0, 0, 0]);
    addTextToPdf(doc, `Net Tax Payable: ${invoiceData?.taxableAmount}(${invoiceData?.taxableAmountInWords})`, 10, 240, 10, "bold", [0, 0, 0]);

    // Declaration Section
    const addDeclarationSection = (doc, x, y) => {
      addTextToPdf(doc, 'Declaration:', x, y, 10, 'bold', [0, 0, 0]);
      addTextToPdf(doc, 'We declare that this invoice shows the actual price of the goods described', x, y + 5, 10, 'normal', [0, 0, 0]);
      addTextToPdf(doc, 'and that all particulars are true and correct?.', x, y + 10, 10, 'normal', [0, 0, 0]);
      addTextToPdf(doc, invoiceData?.companyName, x + 135, y + 5, 10, 'bold', [0, 0, 0]);
      addTextToPdf(doc, 'Authorized Signature', x + 140, y + 30, 10, 'normal', [0, 0, 0]);
    };

    // Adding the declaration section
    addDeclarationSection(doc, 10, 250);

    // Save the PDF
    doc.save("invoice.pdf");
  };

  return (
    <div className='flex justify-end '>
      <button className='bg-green-500 text-white font-bold py-2 px-4 rounded' onClick={generatePdf}>Download PDF</button>
    </div>
  );
};

export default PdfGenerator;
