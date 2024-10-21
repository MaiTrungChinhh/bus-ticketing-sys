import React from 'react';
import PropTypes from 'prop-types';

const StepProgress = ({ currentStep }) => {
  const steps = ['Chọn chuyến', 'Chi tiết vé', 'Thanh toán'];

  return (
    <div className="w-full mb-4">
      <ul className="flex justify-center space-x-4">
        {steps.map((step, index) => (
          <li key={index} className="flex items-center">
            <div
              className={`px-4 py-2 rounded-full text-white transition duration-300 ease-in-out ${
                index === currentStep ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              {step}
            </div>
            {index < steps.length - 1 && (
              <svg
                className="w-4 h-4 mx-2 text-gray-400"
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
