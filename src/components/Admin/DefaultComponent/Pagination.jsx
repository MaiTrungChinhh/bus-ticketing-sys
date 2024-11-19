import React, { useState } from 'react';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  onItemsPerPageChange,
  itemsPerPage,
}) => {
  const [inputValue, setInputValue] = useState(itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  const handleItemsPerPageChange = (event) => {
    const value = event.target.value;
    const numericValue = Number(value);
    setInputValue(value);
    if (!isNaN(numericValue) && numericValue > 0) {
      onItemsPerPageChange(numericValue);
    }
  };

  const handleInputBlur = () => {
    const numericValue = Number(inputValue);
    if (!isNaN(numericValue) && numericValue > 0) {
      onItemsPerPageChange(numericValue);
    } else {
      setInputValue(itemsPerPage);
    }
  };

  return (
    <div className="w-full p-4">
      <div className="flex items-center justify-end mb-4 space-x-2 text-lg">
        <label className="mr-2">Số phần tử trên trang:</label>
        <input
          type="number"
          min="1"
          value={inputValue}
          onChange={handleItemsPerPageChange}
          onFocus={(e) => e.target.select()}
          onBlur={handleInputBlur}
          className="border border-gray-300 rounded-md p-1 w-16 text-center focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <div className="flex items-center justify-center space-x-2 text-lg">
        <button
          className={`px-4 py-2 border rounded-md bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Trang trước
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            className={`px-4 py-2 border rounded-md bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 ${currentPage === index + 1
              ? 'font-bold text-blue-600 border-blue-500'
              : ''
              }`}
            onClick={() => handlePageChange(index + 1)}
            key={index + 1}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={`px-4 py-2 border rounded-md bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Trang sau
        </button>
      </div>
    </div>
  );
};

export default Pagination;
