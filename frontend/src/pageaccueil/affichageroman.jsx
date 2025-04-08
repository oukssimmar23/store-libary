import { Link } from "react-router-dom";
import "./affichageroman.css";

export default function LatestNovels({ livres = [] }) {
  const filteredRomans = Array.isArray(livres)
    ? livres.filter((livre) => livre.categorie === "roman").slice(-3)
    : [];

  if (filteredRomans.length === 0) {
    return <h1 className="no-books">📚 لا توجد روايات متاحة</h1>;
  }

  return (
    <section className="premium-evaluation-section">
      <div className="section-header">
        <h2 className="section-heading" style={{ textAlign: "right" }}>
          <span className="badge">جديد</span>
          📖 آخر الروايات
        </h2>
      </div>

      <div className="book-grid">
        {filteredRomans.map((livre) => (
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
                  <div className="rating-stars">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="bi bi-star-fill" />
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <Link to="/roman" className="cta-button">
          عرض المزيد
          <i className="bi bi-arrow-left ms-2" />
        </Link>
      </div>
    </section>
  );
}
