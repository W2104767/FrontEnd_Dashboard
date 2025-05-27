import PropTypes from 'prop-types';
import { useState } from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading: propIsLoading = false,
  onClick, // Add onClick prop
  ...props
}) {
  const [internalIsLoading, setInternalIsLoading] = useState(false);
  const isButtonLoading = propIsLoading || internalIsLoading;

  const sizeClasses = {
    sm: 'py-1 px-2 text-sm',
    md: 'py-2 px-4',
    lg: 'py-3 px-6 text-lg'
  };

  const handleClick = async (e) => {
    if (onClick) {
      setInternalIsLoading(true);
      try {
        await onClick(e); // Support async onClick
      } finally {
        setInternalIsLoading(false);
      }
    }
  };

  return (
    <button
      className={`btn btn-${variant} ${sizeClasses[size]} rounded`}
      disabled={isButtonLoading}
      onClick={handleClick} // Use custom handler
      {...props}
    >
      {isButtonLoading ? (
        <>
          <span className="spinner-border spinner-border-sm me-2" />
          Loading...
        </>
      ) : children}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  isLoading: PropTypes.bool,
  onClick: PropTypes.func, // Add PropTypes for onClick
  children: PropTypes.node.isRequired
};