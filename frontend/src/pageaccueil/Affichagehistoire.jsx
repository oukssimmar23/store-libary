import { Link } from "react-router-dom";
import "./affichagehistoire.css"; // Fichier CSS partagé

export default function LatestHistoryBooks({ livres = [] }) {
  const derniersLivres = Array.isArray(livres)
    ? livres.filter((his) => his.categorie === "histoire").slice(-3)
    : [];

  if (derniersLivres.length === 0) {
    return (
      <div className="no-books-message">
        📖 لا توجد قصص متاحة حالياً
      </div>
    );
  }

  return (
    <section className="premium-evaluation-section">
      <div className="section-header">
        <h2 className="section-heading">
          📖 آخر القصص
          <span className="badge bg-success ms-3">مميز</span>
        </h2>
      </div>

      <div className="book-grid">
        {derniersLivres.map((livre) => (
          <div className="novel-card" key={livre._id}>
            <Link to={`/details/${livre.id}`} className="card-link">
              <div className="image-wrapper">
                <img
                  src={livre.image}
                  alt={livre.title}
                  className="novel-cover"
                />
                <div className="content-overlay">
                  <h4 className="book-title">{livre.title}</h4>
                  <div className="info-box">
                    <div className="price-tag">{livre.prix} DH</div>
                    <div className="rating-badge">قصة تاريخية</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="text-center mt-5">
        <Link to="/histoire" className="cta-button">
          عرض المزيد
          <i className="bi bi-clock-history ms-2"></i>
        </Link>
      </div>
    </section>
  );
}
