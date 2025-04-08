// Histoire.jsx
import { Link } from "react-router-dom";
import Header from "../pageaccueil/Header";
import "./Histoire.css";

export default function HistoryBooks({ livres = [] }) {
  const historicalBooks = livres.filter(livre => livre.categorie === "histoire");

  return (
    <div className="historical-page">
      <Header />
      
      <section className="antique-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
             كتب التاريخ
              <span className="badge-vintage">تراث</span>
            </h2>
          </div>

          <div className="row">
            {historicalBooks.map(livre => (
              <div key={livre.id} className="col-item">
                <div className="antique-card">
                  <Link to={`/details/${livre.id}`} className="card-link">
                    <div className="image-container">
                      <img 
                        src={livre.image} 
                        alt={livre.title}
                        className="antique-image"
                      />
                      <div className="time-period">{livre.period}</div>
                    </div>
                    
                    <div className="content-overlay">
                      <h3 className="book-title">{livre.title}</h3>
                      <div className="price-rating">
                        <span className="price-tag">{livre.prix} DH</span>
                        <div className="stars">
                          {[...Array(Math.floor(livre.evaluation))].map((_, i) => (
                            <i key={i} className="star-icon">★</i>
                          ))}
                        </div>
                      </div>
                      <button className="explore-btn">
                        استكشف المخطوطة
                      </button>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
