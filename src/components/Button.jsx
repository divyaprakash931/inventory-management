import React from 'react';
import PropTypes from 'prop-types';

// Button component definition
const Button = ({ type = 'button', onClick, className, children, ...props }) => {
  return (
    <button
      type={type} // Specifies the button type (button, submit, reset)
      onClick={onClick} // Handles click events
      className={`rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 text-nowrap ${className}`} // Styling for the button
      {...props} // Passes additional props like aria-label or data attributes
    >
       {children} {/* Renders button content */}
    </button>
  );
};

// Define expected prop types for better validation and documentation
Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']), // Specifies allowed button types
  onClick: PropTypes.func, // Callback function for click events
  className: PropTypes.string, // Additional CSS classes for styling
  children: PropTypes.node.isRequired, // Content to be displayed inside the button (text, elements, etc.)
};

export default Button;
