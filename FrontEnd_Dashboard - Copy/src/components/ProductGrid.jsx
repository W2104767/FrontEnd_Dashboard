import { Container, Row, Col } from 'react-bootstrap';

function ProductGrid() {
  return (
    <Container>
      <Row>
        {/* 1 column on mobile, 2 on tablet, 3 on desktop */}
        <Col xs={12} md={6} lg={4}>
          <ProductCard />
        </Col>
        <Col xs={12} md={6} lg={4}>
          <ProductCard />
        </Col>
        <Col xs={12} md={6} lg={4}>
          <ProductCard />
        </Col>
      </Row>
    </Container>
  );
}