import { Link } from 'react-router-dom';
import Header from '../pageaccueil/Header';
import './Roman.css';

export default function Roman({ livres = [] }) {
  const novels = livres.filter(livre => livre.categorie === "roman");

  return (
    <div className="novel-library">
      <Header />
      
      <section className="premium-novels-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              📖 عالم الروايات
              <span className="badge-vintage">الأكثر مبيعاً</span>
            </h2>
          </div>

          {novels.length === 0 ? (
            <div className="no-books-message">
              <h3 className="no-books-text">📚 لا توجد روايات متاحة حالياً</h3>
              <button className="explore-more-btn">اكتشف المزيد</button>
            </div>
          ) : (
            <div className="novel-list">
              {novels.map(livre => (
                <div key={livre.id} className="novel-card">
                  <Link to={`/details/${livre.id}`} className="card-link">
                    <div className="image-wrapper">
                      <img 
                        src={livre.image} 
                        alt={livre.title}
                        className="novel-cover"
                      />
                      <div className="content-overlay">
                        <div className="card-body">
                          <h3 className="book-title">{livre.title}</h3>
                          <div className="price-and-btn">
                            <span className="price-tag">{livre.prix} DH</span>
                            <button className="explore-btn">
                              اقرأ الرواية
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
