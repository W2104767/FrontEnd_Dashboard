import { Container } from 'react-bootstrap';

export default function Home() {
  return (
    <Container className="py-4">
      {/* Clear heading hierarchy */}
      <h1 className="mb-4">Dashboard</h1>
      
      {/* Section with clear purpose */}
      <section className="mb-5">
        <h2 className="h4 mb-3">Recent Activity</h2>
        <div className="bg-white p-3 rounded shadow-sm">
          {/* Activity content */}
        </div>
      </section>

      {/* Visual separation between sections */}
      <section>
        <h2 className="h4 mb-3">Quick Actions</h2>
        <div className="d-flex gap-3">
          <button className="btn btn-primary">Create New</button>
          <button className="btn btn-outline-secondary">Export</button>
        </div>
      </section>
    </Container>
  );
}