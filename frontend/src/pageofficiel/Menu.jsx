// Menu.jsx
import { Link } from 'react-router-dom';
import Header from '../pageaccueil/Header';
import "./Menu.css";

export default function Menu({ livres = [] }) {
  return (
    <div className="digital-library">
      <Header />

      <section className="premium-book-section">
        <div className="custom-container">
          <div className="section-header">
            <h2 className="section-heading with-underline" style={{marginLeft:'850px'}}>
              📚 مكتبتنا المميزة
              <span className="badge-warning"style={{fontSize:"15px",color:"red"}}>أحدث الإصدارات</span>
            </h2>
          </div>

          {livres.length === 0 ? (
            <div className="no-books-message">
              <h3 className="text-muted">📖 لا توجد كتب متاحة حالياً</h3>
              <button className="btn-outline-warning">تصفح التصنيفات</button>
            </div>
          ) : (
            <div className="book-grid">
              {livres.map(livre => (
                <div key={livre.id} className="book-card">
                  <Link to={`/details/${livre.id}`} className="stretched-link">
                    <div className="image-wrapper">
                      <img 
                        src={livre.image} 
                        alt={livre.title} 
                        className="premium-cover"
                        style={{marginBottom:"400px",width:"300px",height:"500px"}}
                      />
                      <div className="content-overlay">
                        <div className="card-body">
                          <h3 className="book-title">{livre.title}</h3>
                          <div className="book-footer">
                            <span className="price-tag">{livre.prix} DH</span>
                            <button className="btn-warning small">
                              اطلع على التفاصيل
                              <i className="bi bi-arrow-left ms-2"></i>
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
