import React, { useState, useEffect } from "react";

const ComboBox = ({ onSelect }) => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("excelData"));
    if (storedData) {
      const formattedData = storedData.slice(1).map((item) => ({
        name: item[1],
        data: item,
      }));
      setItems(formattedData);
    }
  }, []);

  const handleSelect = (item) => {
    setSelectedItem(item);
    setInputValue(item.name);
    onSelect(item.data); // Pass the full array of data to the parent
    setIsOpen(false); // Close dropdown
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      <div className="flex items-center">
        <input
          className="py-3 ps-4 pe-9 block w-full border-2 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsOpen(true); // Open dropdown on input change
          }}
          placeholder="Select a name"
          onFocus={toggleDropdown} // Open dropdown when focused
        />
        <button type="button" onClick={toggleDropdown} className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <svg
            className="shrink-0 w-4 h-4 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m7 15 5 5 5-5M7 9l5-5 5 5"></path>
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="absolute z-50 w-full max-h-72 p-1 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto">
          {items
            .filter((item) => item.name.toLowerCase().includes(inputValue.toLowerCase()))
            .map((item) => (
              <div
                key={item.name}
                className="cursor-pointer py-2 px-4 text-sm text-gray-800 hover:bg-gray-100 flex justify-between items-center"
                onClick={() => handleSelect(item)}
              >
                <span>{item.name}</span>
                {selectedItem && selectedItem.name === item.name && (
                  <svg
                    className="shrink-0 w-4 h-4 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ComboBox;
