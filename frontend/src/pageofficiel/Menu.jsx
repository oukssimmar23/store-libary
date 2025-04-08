// Menu.jsx
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import Header from '../pageaccueil/Header';
import "./Menu.css";

export default function Menu({ livres = [] }) {
  return (
    <div className="digital-library">
      <Header />
      
      <section className="premium-book-section py-6">
        <Container>
          <Row className="mb-5">
            <Col>
              <h2 className="section-heading with-underline"style={{textAlign:"center"}}>
              <Badge bg="warning" className="ms-3"style={{textAlign:"center"}}>أحدث الإصدارات</Badge>
                📚 مكتبتنا المميزة
                
              </h2>
            </Col>
          </Row>

          {livres.length === 0 ? (
            <div className="no-books-message text-center py-5">
              <h3 className="text-muted mb-4">📖 لا توجد كتب متاحة حالياً</h3>
              <Button variant="outline-warning" size="lg">
                تصفح التصنيفات
              </Button>
            </div>
          ) : (
            <Row xs={1} md={2} lg={3} xl={4} className="g-5">
              {livres.map(livre => (
                <Col key={livre.id} className="mb-4">
                  <Card className="premium-card hover-glow">
                    <Link to={`/details/${livre.id}`} className="stretched-link">
                      <div className="image-wrapper">
                        <Card.Img 
                          variant="top" 
                          src={livre.image} 
                          alt={livre.title}
                          className="premium-cover"
                        />
                        <div className="content-overlay">
                          <Card.Body className="d-flex flex-column">
                            <Card.Title className="text-light mb-3">
                              {livre.title}
                            </Card.Title>
                            <div className="mt-auto">
                              <Badge bg="light" text="dark" className="price-tag">
                                {livre.prix} DH
                              </Badge>
                              <Button 
                                variant="warning" 
                                size="sm" 
                                className="mt-3 explore-btn"
                              >
                                اطلع على التفاصيل
                                <i className="bi bi-arrow-left ms-2"></i>
                              </Button>
                            </div>
                          </Card.Body>
                        </div>
                      </div>
                    </Link>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>
    </div>
  );
}