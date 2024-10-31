import React, { useState, useEffect } from 'react';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';

const AdvancedFilter = ({ filters, onApply, onSearch, selectedFilters }) => {
  const [customPriceRange, setCustomPriceRange] = useState({
    min: selectedFilters?.priceRange?.min || 0,
    max: selectedFilters?.priceRange?.max || 1000,
  });
  const [selectedOptions, setSelectedOptions] = useState({});

  const [searchInput, setSearchInput] = useState('');

  // Initialize selectedOptions based on filters and selectedFilters
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

  const handleCustomRangeChange = (e) => {
    const { name, value } = e.target;
    setCustomPriceRange((prev) => ({
      ...prev,
      [name]: value,
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
      customPriceRange,
    };
    onApply(appliedFilters);
  };

  return (
    <div className="AdvancedFilter">
      <div className="card-header bg-white shadow-md rounded-3xl overflow-hidden p-4 mb-4 flex items-center">
        <div className="search-bar flex items-center w-full">
          <span className="text-gray-500 mr-2">
            <i className="bx bx-search-alt text-2xl"></i>
          </span>
          <input
            type="search"
            className="form-control w-full rounded-lg px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="Search ..."
          />
        </div>
      </div>
      <div className="card bg-white shadow-md rounded-3xl overflow-hidden">
        <div className="card-body border-light p-6">
          {filters.map((filter, index) => (
            <FilterSection
              key={index}
              title={filter.title}
              items={filter.items}
              customRange={filter.customRange}
              extraContent={filter.extraContent}
              selectedOptions={selectedOptions}
              onCheckboxChange={handleCheckboxChange}
              customPriceRange={customPriceRange}
              onCustomRangeChange={handleCustomRangeChange}
            />
          ))}
        </div>
        <div className="card-footer p-4">
          <button
            onClick={handleApply}
            className="btn btn-primary w-full text-blue-500 hover:text-blue-600 p-2 m-2 bg-blue-100 hover:bg-blue-200 rounded-xl"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

const FilterSection = ({
  title,
  items,
  customRange,
  extraContent,
  selectedOptions,
  onCheckboxChange,
  customPriceRange,
  onCustomRangeChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={toggleCollapse}
        className="flex items-center text-gray-800 bg-gray-200 p-2 rounded-md font-medium text-xl w-full text-left"
      >
        {title}
        {isOpen ? (
          <MdExpandLess className="ml-auto text-3xl" />
        ) : (
          <MdExpandMore className="ml-auto text-3xl" />
        )}
      </button>
      {isOpen && (
        <div className="categories-list flex flex-col gap-2 mt-2">
          {items.map(({ id, label, type = 'checkbox' }) => (
            <div className="form-check text-lg" key={id}>
              <input
                type={type}
                className="form-check-input"
                id={id}
                checked={selectedOptions[id]}
                onChange={() => onCheckboxChange(id)}
              />
              <label
                className="form-check-label text-gray-700 pl-2"
                htmlFor={id}
              >
                {label}
              </label>
            </div>
          ))}
          {customRange && (
            <div className="formCost flex gap-1 items-center mt-2">
              <input
                className="form-control text-center border border-gray-300 rounded-md w-1/2"
                type="text"
                name="min"
                value={customPriceRange.min}
                onChange={onCustomRangeChange}
              />
              <span className="font-semibold text-gray-500">to</span>
              <input
                className="form-control text-center border border-gray-300 rounded-md w-1/2"
                type="text"
                name="max"
                value={customPriceRange.max}
                onChange={onCustomRangeChange}
              />
            </div>
          )}
          {extraContent}
        </div>
      )}
    </div>
  );
};

export default AdvancedFilter;
