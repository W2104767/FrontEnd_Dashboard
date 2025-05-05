import PropTypes from 'prop-types';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading,
  ...props
}) {
  const sizeClasses = {
    sm: 'py-1 px-2 text-sm',
    md: 'py-2 px-4',
    lg: 'py-3 px-6 text-lg'
  };

  return (
    <button
      className={`btn btn-${variant} ${sizeClasses[size]} rounded`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
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
  children: PropTypes.node.isRequired
};