import React from 'react';
import PropTypes from 'prop-types';

const StepProgress = ({ currentStep }) => {
  const steps = ['Chọn chuyến', 'Chi tiết vé', 'Thanh toán'];

  return (
    <div className="w-full mb-6">
      <ul className="flex justify-center items-center space-x-6">
        {steps.map((step, index) => (
          <li key={index} className="flex items-center">
            <div
              className={`px-6 py-3 rounded-full text-white font-medium text-lg transition-all duration-300 ease-in-out transform ${
                index === currentStep
                  ? 'bg-blue-600 scale-110'
                  : 'bg-gray-400 scale-100'
              } hover:scale-110 hover:bg-blue-500 cursor-pointer`}
            >
              {step}
            </div>

            {/* Hiển thị mũi tên giữa các bước */}
            {index < steps.length - 1 && (
              <svg
                className="w-5 h-5 mx-4 text-gray-500 transition-all duration-300 ease-in-out"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

StepProgress.propTypes = {
  currentStep: PropTypes.number.isRequired,
};

export default StepProgress;
