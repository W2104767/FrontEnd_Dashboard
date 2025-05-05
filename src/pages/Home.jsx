import { Container } from 'react-bootstrap';
import { QuickActions, ActivitySection } from '../components';

export default function Home() {
  const handleCreate = () => { /* ... */ };
  const handleExport = () => { /* ... */ };

  return (
    <Container className="py-4">
      <h1 className="mb-4">Dashboard</h1>
      <ActivitySection>
        {/* Activity content (e.g., <RecentActivityList />) */}
      </ActivitySection>
      <QuickActions onCreate={handleCreate} onExport={handleExport} />
    </Container>
  );
}