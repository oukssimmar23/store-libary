import { Link } from "react-router-dom";
import "./affichagelivre.css";

export default function LatestBooks({ livres = [] }) {
  const derniersLivres = Array.isArray(livres)
    ? livres.filter((his) => his.categorie === "livre").slice(-3)
    : [];

  if (derniersLivres.length === 0) {
    return (
      <div className="no-books-message">
        📚 لا توجد كتب متاحة حالياً
      </div>
    );
  }

  return (
    <section className="premium-evaluation-section">
      <div className="section-header">
        <h2 className="section-heading">
          📚 آخر الكتب
          <span className="badge">جديد</span>
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
                  <div className="price-tag">{livre.prix} DH</div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <Link to="/livre" className="cta-button">
          عرض المزيد
          <i className="bi bi-arrow-left ms-2"></i>
        </Link>
      </div>
    </section>
  );
}
