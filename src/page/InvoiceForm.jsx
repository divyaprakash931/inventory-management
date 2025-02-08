import React, { useState, useEffect } from "react";
import PdfGenerator from "./Pdfgenerator"; // Assuming PdfGenerator is in the same folder
import ComboBox from "../components/ComboBox";

const InvoiceForm = () => {
  const [selectedCompany, setSelectedCompany] = useState("INDO TECH INDUSTRIES");
  const [isFormValid, setIsFormValid] = useState(false); // State to track form validity

  const [invoiceData, setInvoiceData] = useState({
    companyName: "INDO TECH INDUSTRIES",
    companyAddress: "16, Kannan Illam, Avarampalayam Road, Ganapathy Coimbatore -6",
    companyGST: "33ARVPJ8270F1ZF",
    companyPhone: "9442641300",
    companyPAN: "ARVPJ8270F",
    partyCompanyName: "",
    partyCompanyAddress: "",
    partyCompanyPhone: "",
    partyCompanyPAN: "",
    partyCompanyGST: "",
    invoiceNumber: "",
    invoiceDate: "",
    items: [{ description: "", hsn: "", quantity: 0, rate: 0, amount: 0 }],
    totalBeforeTax: 0,
    taxableAmount: 0,
    taxableAmountInWords: "", // New state property for words representation
    gstType: "SGST+CGST", // Default GST type
    sgstPercentage: 9, // Default SGST percentage
    cgstPercentage: 9, // Default CGST percentage
    igstPercentage: 18, // Default IGST percentage
    sgstAmount: 0,
    cgstAmount: 0,
    igstAmount: 0,
    grandTotal: 0,
  });

  // Function to validate the form fields
  const validateForm = () => {
    const isValid =
      invoiceData.partyCompanyName &&
      invoiceData.invoiceNumber &&
      invoiceData.invoiceDate &&
      invoiceData.items.length > 0 &&
      invoiceData.items.every(item => item.description && item.hsn && item.quantity > 0 && item.rate > 0);
    setIsFormValid(isValid);
  };

  useEffect(() => {
    validateForm(); // Validate form whenever invoiceData changes
  }, [invoiceData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCompanyChange = (e) => {
    const selected = e.target.value;
    setSelectedCompany(selected);

    if (selected === "Universal Packaging") {
      setInvoiceData((prevData) => ({
        ...prevData,
        companyName: "UNIVERSAL PACKAGING",
        companyAddress: "Your Universal Packaging Address Here",
        companyGST: "GST_NUMBER_UNIVERSAL",
        companyPhone: "YOUR_PHONE_UNIVERSAL",
        companyPAN: "PAN_UNIVERSAL",
      }));
    } else {
      setInvoiceData((prevData) => ({
        ...prevData,
        companyName: "INDO TECH INDUSTRIES",
        companyAddress: "16, Kannan Illam, Avarampalayam Road, Ganapathy Coimbatore -6",
        companyGST: "33ARVPJ8270F1ZF",
        companyPhone: "9442641300",
        companyPAN: "ARVPJ8270F",
      }));
    }
  };

  const handleComboBoxSelect = (data) => {
    setInvoiceData((prevData) => ({
      ...prevData,
      partyCompanyName: data[1], // Company name from ComboBox
      partyCompanyAddress: data[3], // Address from ComboBox
      partyCompanyPhone: data[6], // Phone from ComboBox
      partyCompanyPAN: data[4], // PAN from ComboBox
      partyCompanyGST: data[5], // GST from ComboBox
    }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...invoiceData.items];
    updatedItems[index][name] = value;

    // Calculate the amount when quantity or rate changes
    if (name === "quantity" || name === "rate") {
      updatedItems[index].amount =
        updatedItems[index].quantity * updatedItems[index].rate;
    }

    // Update totalBeforeTax
    const totalBeforeTax = updatedItems.reduce(
      (total, item) => total + parseFloat(item.amount || 0),
      0
    );

    setInvoiceData((prevData) => ({
      ...prevData,
      items: updatedItems,
      totalBeforeTax,
    }));
  };

  const handleAddItem = () => {
    setInvoiceData((prevData) => ({
      ...prevData,
      items: [
        ...prevData.items,
        { description: "", hsn: "", quantity: 0, rate: 0, amount: 0 },
      ],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!invoiceData.partyCompanyName || !invoiceData.invoiceNumber || !invoiceData.invoiceDate) {
      alert("Please fill all required fields!");
      return;
    }

    // Calculate GST amounts and Grand Total
    const totalBeforeTax = invoiceData.totalBeforeTax;
    let sgstAmount = 0;
    let cgstAmount = 0;
    let igstAmount = 0;

    if (invoiceData.gstType === "SGST+CGST") {
      sgstAmount = (totalBeforeTax * invoiceData.sgstPercentage) / 100;
      cgstAmount = (totalBeforeTax * invoiceData.cgstPercentage) / 100;
    } else {
      igstAmount = (totalBeforeTax * invoiceData.igstPercentage) / 100;
    }

    const grandTotal = (totalBeforeTax + sgstAmount + cgstAmount + igstAmount).toFixed();
    const taxableAmount = (sgstAmount + cgstAmount + igstAmount).toFixed(); // Sum of GST amounts

    // Calculate the taxable amount in words
    const taxableAmountInWords = numberToCurrencyWords(taxableAmount);

    setInvoiceData((prevData) => ({
      ...prevData,
      sgstAmount,
      cgstAmount,
      igstAmount,
      taxableAmount, // Update taxableAmount in the state
      grandTotal,
      taxableAmountInWords, // Update taxableAmountInWords in the state
    }));

    // Call the PDF generator function here if needed
  };

  const numberToCurrencyWords = (num) => {
    const belowTwenty = [
      '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
      'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
      'Seventeen', 'Eighteen', 'Nineteen'
    ];

    const tens = [
      '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy',
      'Eighty', 'Ninety'
    ];

    const thousands = ['', 'Thousand', 'Lakh', 'Crore'];

    const getWords = (n) => {
      if (n < 20) return belowTwenty[n];
      if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + belowTwenty[n % 10] : '');
      if (n < 1000) return belowTwenty[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' and ' + getWords(n % 100) : '');

      if (n < 100000) { // for thousands
        return getWords(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 ? ' ' + getWords(n % 1000) : '');
      } else { // for lakhs and crores
        if (n < 10000000) { // for lakhs
          return getWords(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 ? ' ' + getWords(n % 100000) : '');
        } else { // for crores
          return getWords(Math.floor(n / 10000000)) + ' Crore' + (n % 10000000 ? ' ' + getWords(n % 10000000) : '');
        }
      }
    };

    const rupees = Math.floor(num);
    const paisa = Math.round((num - rupees) * 100);

    return `${getWords(rupees)} Rupees and ${paisa} Paisa Only`;
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Company Information */}
      <div className="border-2 rounded-lg p-4 mb-4 bg-white">
        <h2 className="text-lg font-bold mb-4">Company Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block font-bold mb-1">Select Company</label>
            <select
              value={selectedCompany}
              onChange={handleCompanyChange}
              className="border border-gray-300 rounded w-full p-2"
            >
              <option value="INDO TECH INDUSTRIES">Indo Tech Industries</option>
              <option value="Universal Packaging">Universal Packaging</option>
            </select>
          </div>
          <InputField
            label="Company Name"
            name="companyName"
            value={invoiceData.companyName}
            onChange={handleInputChange}
          />
          <InputField
            label="Company Address"
            name="companyAddress"
            value={invoiceData.companyAddress}
            onChange={handleInputChange}
            type="textarea"
            rows="2"
          />
          <InputField
            label="Company GST"
            name="companyGST"
            value={invoiceData.companyGST}
            onChange={handleInputChange}
          />
          <InputField
            label="Company Phone"
            name="companyPhone"
            value={invoiceData.companyPhone}
            onChange={handleInputChange}
          />
          <InputField
            label="Company PAN"
            name="companyPAN"
            value={invoiceData.companyPAN}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Party Information */}
      <div className="border-2 rounded-lg p-4 mb-4 bg-white">
        <h2 className="text-lg font-bold mb-4">Party Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block font-bold mb-1">Select Party</label>
            <ComboBox onSelect={handleComboBoxSelect} />
          </div>
          <InputField
            label="Party Company Name"
            name="partyCompanyName"
            value={invoiceData.partyCompanyName}
            onChange={handleInputChange}
            required
          />
          <InputField
            label="Party Company Address"
            name="partyCompanyAddress"
            value={invoiceData.partyCompanyAddress}
            onChange={handleInputChange}
            type="textarea"
            rows="2"
          />
          <InputField
            label="Party Company Phone"
            name="partyCompanyPhone"
            value={invoiceData.partyCompanyPhone}
            onChange={handleInputChange}
          />
          <InputField
            label="Party Company PAN"
            name="partyCompanyPAN"
            value={invoiceData.partyCompanyPAN}
            onChange={handleInputChange}
          />
          <InputField
            label="Party Company GST"
            name="partyCompanyGST"
            value={invoiceData.partyCompanyGST}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Invoice Information */}
      <div className="border-2 rounded-lg p-4 mb-4 bg-white">
        <h2 className="text-lg font-bold mb-4">Invoice Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Invoice Number"
            name="invoiceNumber"
            value={invoiceData.invoiceNumber}
            onChange={handleInputChange}
            required
          />
          <InputField
            label="Invoice Date"
            name="invoiceDate"
            value={invoiceData.invoiceDate}
            onChange={handleInputChange}
            type="date"
            required
          />
        </div>
      </div>

      {/* GST Selection */}
      <div className="border-2 rounded-lg p-4 mb-4 bg-white">
        <h2 className="text-lg font-bold mb-4">GST Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block font-bold mb-1">GST Type</label>
            <select
              name="gstType"
              value={invoiceData.gstType}
              onChange={handleInputChange}
              className="border border-gray-300 rounded w-full p-2"
            >
              <option value="SGST+CGST">SGST + CGST</option>
              <option value="IGST">IGST</option>
            </select>
          </div>
          {invoiceData.gstType === "SGST+CGST" && (
            <>
              <InputField
                label="SGST Percentage"
                name="sgstPercentage"
                type="number"
                value={invoiceData.sgstPercentage}
                onChange={handleInputChange}
              />
              <InputField
                label="CGST Percentage"
                name="cgstPercentage"
                type="number"
                value={invoiceData.cgstPercentage}
                onChange={handleInputChange}
              />
            </>
          )}
          {invoiceData.gstType === "IGST" && (
            <InputField
              label="IGST Percentage"
              name="igstPercentage"
              type="number"
              value={invoiceData.igstPercentage}
              onChange={handleInputChange}
            />
          )}
        </div>
      </div>

      {/* Items Section */}
      <div className="border-2 rounded-lg p-4 mb-4 bg-white">
  <h2 className="text-lg font-bold mb-4">Invoice Items</h2>
  {invoiceData.items.map((item, index) => (
    <div key={index} className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
      <InputField
        label={`Description ${index + 1} (Max 45 characters)`}
        name="description"
        value={item.description}
        onChange={(e) => handleItemChange(index, e)}
        maxLength={45} // Limit input to 45 characters
      />
      <InputField
        label="HSN"
        name="hsn"
        value={item.hsn}
        onChange={(e) => handleItemChange(index, e)}
      />
      <InputField
        label="Quantity"
        name="quantity"
        type="number"
        value={item.quantity}
        onChange={(e) => handleItemChange(index, e)}
      />
      <InputField
        label="Rate"
        name="rate"
        type="number"
        value={item.rate}
        onChange={(e) => handleItemChange(index, e)}
      />
    </div>
  ))}
  <button
    type="button"
    onClick={handleAddItem}
    className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4"
  >
    Add Item
  </button>
</div>
      {/* Total and Submit */}
      <div className="border-2 rounded-lg p-4 mb-4 bg-white">
        <h2 className="text-lg font-bold mb-4 mt-6">Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <span className="font-bold">SGST:</span> ₹{invoiceData.sgstAmount}
          </div>
          <div>
            <span className="font-bold">CGST:</span> ₹{invoiceData.cgstAmount}
          </div>
          <div>
            <span className="font-bold">IGST:</span> ₹{invoiceData.igstAmount}
          </div>
          <div>
            <span className="font-bold">Total Before Tax:</span> ₹{invoiceData.totalBeforeTax}
          </div>
          <div>
            <span className="font-bold">Taxable Amount</span> ₹{invoiceData.taxableAmount}
          </div>
          <div>
            <span className="font-bold">Grand Total:</span> ₹{invoiceData.grandTotal}
          </div>
        </div>
        <div>
            <span className="font-bold">Taxable Amount in Words:</span> {numberToCurrencyWords(invoiceData.taxableAmount)}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        disabled={!isFormValid} // Disable the button if form is not valid
      >
        {isFormValid ? "Calculate Amount" : "Fill Required Fields"}
      </button>
      {isFormValid && <PdfGenerator invoiceData={invoiceData} />} {/* Render PdfGenerator only when valid */}
    </form>
  );
};

const InputField = ({ label, name, value, onChange, type = "text", required = false, rows, maxLength }) => (
  <div>
    <label className="block font-bold mb-1" htmlFor={name}>
      {label}
    </label>
    {type === "textarea" ? (
      <textarea
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        rows={rows}
        className="border border-gray-300 rounded w-full p-2"
        required={required}
        maxLength={maxLength} // Apply maxLength here
      />
    ) : (
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="border border-gray-300 rounded w-full p-2"
        required={required}
        maxLength={maxLength} // Apply maxLength here
      />
    )}
    {maxLength && (
      <div className="text-sm text-gray-500">
        {value.length}/{maxLength} characters
      </div>
    )}
  </div>
);

export default InvoiceForm;
