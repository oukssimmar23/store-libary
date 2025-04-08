// Recherche.jsx
import React, { useState } from "react";
import { Container, Row, Col, Form, Card, Button,Badge} from "react-bootstrap";
import { Search, Book } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import Header from "../pageaccueil/Header";
import "./Rech.css";

export default function Recherche({ livres }) {
  const [rech, setRech] = useState("");

  const livresFiltres = livres?.filter((liv) => 
    liv.title?.toLowerCase().includes(rech.toLowerCase())
  ) || [];

  return (
    <div className="search-page">
      <Header />
      
      <Container className="py-5">
        {/* Search Section */}
        <div className="search-box-wrapper mb-5">
          <Form.Group className="position-relative">
            <Form.Control
              type="search"
              value={rech}
              onChange={(e) => setRech(e.target.value)}
              placeholder="ابحث عن كتاب، رواية أو قصة..."
              className="search-input pe-5"
            />
            <Search className="search-icon" />
          </Form.Group>
        </div>

        {/* Results Section */}
        {!livres ? (
          <div className="text-center py-5">
           
            <h3 className="text-muted">⚠️ حدث خطأ في تحميل البيانات</h3>
          </div>
        ) : (
          <>
            <h2 className="results-heading mb-4">
              <Book className="me-3" />
              "{rech}" نتائج البحث عن 
              <span className="badge bg-primary ms-3">
                {livresFiltres.length} نتيجة
              </span>
            </h2>

            {livresFiltres.length > 0 ? (
              <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                {livresFiltres.map((liv) => (
                 <Link to={`/details/${liv.id}`} className="card-link"><Col key={liv.id}>
                    <Card className="book-card hover-effect">
                      <Card.Img
                        variant="top"
                        src={liv.image}
                        alt={liv.title}
                        className="book-image"
                      />
                      <Card.Body>
                        <Card.Title className="book-title">
                          {liv.title}
                        </Card.Title>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <span className="book-price">{liv.prix} DH</span>
                          <Badge bg="secondary">{liv.categorie}</Badge>
                        </div>
                        <Button 
                          variant="primary" 
                          as={Link} 
                          to={`/details/${liv.id}`}
                          className="w-100 details-btn"
                        >
                          عرض التفاصيل
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col></Link>
                ))}
              </Row>
            ) : (
              <div className="no-results text-center py-5">
                <Book size={60} className="text-muted mb-4" />
                <h3 className="text-muted">❌ لم يتم العثور على نتائج</h3>
                <p className="text-secondary mt-2">حاول استخدام كلمات بحث مختلفة</p>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
}