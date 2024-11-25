import React, { useEffect, useState } from 'react';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';

const AdvancedFilter = ({ filters, onApply, onSearch, selectedFilters }) => {
  const [customPriceRange, setCustomPriceRange] = useState({
    min: selectedFilters?.priceRange?.min || 0,
    max: selectedFilters?.priceRange?.max || 1000,
  });
  const [selectedOptions, setSelectedOptions] = useState({});
  const [searchInput, setSearchInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const initialOptions = {};
    filters.forEach((filter) => {
      filter.items.forEach((item) => {
        initialOptions[item.id] =
          selectedFilters?.[
            filter.title.toLowerCase().replace(' ', '_')
          ]?.includes(item.id) || false;
      });
    });
    setSelectedOptions(initialOptions);
  }, [filters, selectedFilters]);

  const handleCheckboxChange = (id) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    onSearch(value);
  };

  const handleApply = () => {
    const appliedFilters = {
      selectedOptions,
    };
    onApply(appliedFilters);
    setIsOpen(false);
  };

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Phần chứa ô tìm kiếm và nút bộ lọc */}
      <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg shadow-lg">
        {/* Tìm kiếm */}
        <div className="flex-1">
          <input
            type="search"
            className="w-full h-12 rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-lg"
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="Tìm kiếm ..."
          />
        </div>

        {/* Bộ lọc */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={toggleCollapse}
            className="flex items-center justify-center h-12 px-4 py-2 bg-blue-100 rounded-lg font-medium text-lg hover:bg-blue-200 transition duration-300"
            style={{ minWidth: '120px' }} // Cân đối chiều dài nút
          >
            Bộ lọc
            {isOpen ? (
              <MdExpandLess className="ml-2 text-xl" />
            ) : (
              <MdExpandMore className="ml-2 text-xl" />
            )}
          </button>
        </div>
      </div>

      {/* Phần bộ lọc */}
      {isOpen && (
        <div className="categories-list flex flex-col gap-2 mt-2 w-full p-4 bg-white border border-gray-300 rounded-lg shadow-md">
          {filters.map((filter, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-medium text-gray-700 mb-2">{filter.title}</h3>
              <div className="flex flex-wrap gap-4 items-center">
                {filter.items.map(({ id, label }) => (
                  <label key={id} className="flex items-center text-lg">
                    <input
                      type="checkbox"
                      id={id}
                      className="w-5 h-5 mr-2"
                      checked={selectedOptions[id]}
                      onChange={() => handleCheckboxChange(id)}
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={handleApply}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 transition duration-300"
          >
            Áp dụng
          </button>
        </div>
      )}
    </div>
  );
};

export default AdvancedFilter;
