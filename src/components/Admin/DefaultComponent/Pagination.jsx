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
    <div>
      <div className="flex items-center justify-end mb-4 text-xl p-3">
        <label className="mr-2 text-xl">Số phần tử trên trang:</label>
        <input
          type="number"
          min="1"
          value={inputValue}
          onChange={handleItemsPerPageChange}
          onFocus={(e) => e.target.select()}
          onBlur={handleInputBlur}
          className="border rounded-md p-1 w-16 mr-2"
        />
        <div className="flex items-center space-x-2 text-xl">
          {' '}
          {/* Bố trí các nút trong một flex container */}
          <button
            className={`page-link px-4 py-1 border rounded-md bg-white text-gray-700 hover:bg-gray-100 ${
              currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Trang trước
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              className={`page-link px-4 py-1 border rounded-md bg-white text-gray-700 hover:bg-gray-100 ${
                currentPage === index + 1 ? 'font-bold text-blue-600' : ''
              }`}
              onClick={() => handlePageChange(index + 1)}
              key={index + 1}
            >
              {index + 1}
            </button>
          ))}
          <button
            className={`page-link px-4 py-1 border rounded-md bg-white text-gray-700 hover:bg-gray-100 ${
              currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Trang sau
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
