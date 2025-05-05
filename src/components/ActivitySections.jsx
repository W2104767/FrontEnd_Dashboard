export const ActivitySection = ({ children }) => (
    <section className="mb-5">
      <h2 className="h4 mb-3">Recent Activity</h2>
      <div className="bg-white p-3 rounded shadow-sm">
        {children}
      </div>
    </section>
  );