const QuickActions = ({ onCreate, onExport }) => {
    return (
      <section>
        <h2 className="h4 mb-3">Quick Actions</h2>
        <div className="d-flex gap-3">
          <button onClick={onCreate} className="btn btn-primary">Create New</button>
          <button onClick={onExport} className="btn btn-outline-secondary">Export</button>
        </div>
      </section>
    );
  };
  
  export default QuickActions;