import { Link } from "react-router-dom";
import "./affichageevaluation.css";

export default function TopRatedBooks({ livres = [] }) {
  const topRatedBooks = livres.filter(book => book.evaluation >= 8).slice(-3);

  if (topRatedBooks.length === 0) {
    return (
      <div className="no-books-message">
        <h2>📚 لا توجد كتب بتقييم أعلى من 8</h2>
      </div>
    );
  }

  return (
    <section className="premium-evaluation-section">
      <div className="section-header">
        <h2 className="section-heading">
          <span className="section-title">📚 أروع الكتب</span>
        </h2>
      </div>

      <div className="book-grid">
        {topRatedBooks.map((livre) => (
          <div className="novel-card" key={livre._id}>
            <Link to={`/details/${livre.id}`} className="novel-link">
              <div className="image-wrapper">
                <img
                  src={livre.image}
                  alt={livre.title}
                  className="novel-cover"style={{marginBottom:"400px",width:"300px",height:"500px"}}
                />
                <div className="content-overlay">
                  <div className="info-box">
                    <h4>{livre.title}</h4>
                    <div className="info-details">
                      <span className="price-tag">{livre.prix} DH</span>
                      <span className="rating-badge">⭐ {livre.evaluation}/10</span>
                    </div>
                  </div>
                  <div className="map-icon-wrapper">
                    <span className="map-icon" data-tooltip={`متوفر في: ${livre.location}`}>📍</span>
                    <span className="location-text">{livre.library}</span>
                  </div>

                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}