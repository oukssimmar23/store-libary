// Home.jsx
import React, { useEffect, useState } from 'react';
import Header from "./Header"
import Affichageevaluation from './affichageevaluation';
import Affichagehistoire from './Affichagehistoire';
import Affichagelivre from './Affichagelivre';
import Affichageroman from './affichageroman';
import axios from 'axios';
import "./Home.css";
import Footer from '../fotter/fotter';
import { Container, Row, Col } from 'react-bootstrap';
import sectionImage from './section.jpg'; // تأكد أن الصورة هنا

export const Home = () => {
  const [livres, setLivres] = useState();

  const getLivres = async () => {
    const response = await axios.get("http://localhost:3003/livres");
    setLivres(response.data);
  }

  useEffect(() => {
    getLivres();
  }, []);

  return (
    <div className="home-wrapper">

    
      <div className="header shared-background">
        <Header></Header>
      </div>

      {/* Hero Section بنفس الخلفية */}
      <section className="hero-section shared-background">
        <div className="hero-overlay">
          <Container>
            <Row className="justify-content-center text-center">
              <Col lg={8}>
                <h1 className="hero-title animate__animated animate__fadeInDown">اقرأ</h1>
                <h3 className="hero-subtitle animate__animated animate__fadeInUp">
                  حيث تبدأ رحلتك مع الحكمة والإيمان!
                </h3>
                <p className="hero-text animate__animated animate__fadeInUp">
                  قصص وروايات دينية تُنير قلبك وعقلك<br/>
                  في عالم يمتلئ بالمحتوى المتنوع، تظل الكلمة الطيبة والنص الهادف هما السبيل إلى راحة النفس وطمأنينة الروح.
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      {/* المحتوى */}
      <Container fluid className="main-content">
        <Affichageevaluation livres={livres} />
        <Affichagehistoire livres={livres} />
        <Affichagelivre livres={livres} />
        <Affichageroman livres={livres} />
      </Container>

      <Footer />
    </div>
  );
}
