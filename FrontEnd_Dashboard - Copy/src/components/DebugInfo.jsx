export default function DebugInfo() {
    return (
      <div>
        <h1>{import.meta.env.VITE_APP_NAME}</h1>
        {import.meta.env.VITE_DEBUG && (
          <p>API Base: {import.meta.env.VITE_API_URL}</p>
        )}
      </div>
    );
  }