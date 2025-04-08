import { Link } from 'react-router-dom';
import Header from '../pageaccueil/Header';
import './Livre.css';

export default function BooksList({ livres = [] }) {
  const filteredBooks = livres.filter(livre => livre.categorie === "livre");

  return (
    <div className="books-page">
      <Header />
      
      <section className="modern-books-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              📚 مكتبتنا الرقمية
              <span className="badge-new">جديد</span>
            </h2>
          </div>

          <div className="books-list">
            {filteredBooks.map(livre => (
              <div key={livre.id} className="modern-book-card">
                <Link to={`/details/${livre.id}`} className="card-link">
                  <div className="image-wrapper">
                    <img 
                      src={livre.image} 
                      alt={livre.title}
                      className="book-cover"
                    />
                    <div className="content-overlay">
                      <h3 className="book-title">{livre.title}</h3>
                      <div className="meta-info">
                        <span className="price-tag">{livre.prix} DH</span>
                        <div className="actions">
                          <button className="explore-btn">اقرأ المزيد</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
