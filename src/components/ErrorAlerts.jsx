export default function ErrorAlert({ message, onRetry }) {
    return (
      <div className="alert alert-danger">
        {message}
        {onRetry && (
          <button 
            className="btn btn-sm btn-outline-danger ms-2"
            onClick={onRetry}
          >
            Retry
          </button>
        )}
      </div>
    );
  }