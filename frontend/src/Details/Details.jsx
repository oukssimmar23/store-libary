import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../pageaccueil/Header";
import './Details.css';

export default function Details({ livres, panier, setPanier }) {
  const { id } = useParams();
  const livre = livres.find((livre) => Number(livre.id) === Number(id));
  const [quantite, setQuantite] = useState(1);

  useEffect(() => {
    const savedPanier = JSON.parse(localStorage.getItem("panier")) || [];
    setPanier(savedPanier);
  }, []);

  const plus = () => setQuantite(quantite + 1);
  const moins = () => quantite > 1 && setQuantite(quantite - 1);

  const ajouterAuPanier = () => {
    if (!livre) return;

    setPanier((prevPanier) => {
      const newPanier = [...prevPanier];
      const existItem = newPanier.find((item) => item.id === livre.id);

      if (existItem) {
        existItem.quantite += quantite;
      } else {
        newPanier.push({ ...livre, quantite });
      }

      localStorage.setItem("panier", JSON.stringify(newPanier));
      return newPanier;
    });
    return alert("تم اضافة في سلة بنجاح");
  };

  if (!livre) {
    return (
      <div className="error-message">
        <h2 className="text-danger">❌ الكتاب غير موجود!</h2>
      </div>
    );
  }

  return (
    <div className="details-page">
      <Header />
      
      <div className="details-container">
        <div className="detail-card">
          <div className="detail-header">
            <div className="image-wrapper">
              <img 
                src={livre.image} 
                alt={livre.title} 
                className="detail-image" style={{marginBottom:"800px",height:"500px"}}
              />
              <span className="badge-best-seller">الأكثر مبيعاً</span>
            </div>
          </div>

          <div className="detail-content">
            <h1 className="detail-title">{livre.title}</h1>
            
            <div className="detail-meta">
              <span className="detail-badge">✍️ {livre.auteur}</span>
              <span className="detail-badge">📚 {livre.categorie}</span>
              <span className="detail-badge">🌐 {livre.langue || 'غير محدد'}</span>
            </div>

            <div className="detail-pricing">
              <h2 className="price">{livre.prix} DH</h2>
              <small className="tax-included">شامل للضرائب</small>
            </div>

            <div className="quantity-controls">
              <button onClick={moins} className="quantity-btn">-</button>
              <span className="quantity-display">{quantite}</span>
              <button onClick={plus} className="quantity-btn">+</button>
            </div>

            <button 
              className="add-to-cart-btn"
              onClick={ajouterAuPanier}
            >
              🛒 إضافة إلى السلة
            </button>
                <br /><br /><br />
            <div className="specs-section">
              <h5>📄 المواصفات الفنية</h5>
              <div className="specs">
                <p><strong>📅 سنة النشر:</strong> {livre.anneePublication || 'غير محدد'}</p>
                <p><strong>✨ الحالة:</strong> {livre.etat || 'جديد'}</p>
                <p><strong>🔍 رقم ISBN:</strong> {livre.isbn || 'غير محدد'}</p>
                <p><strong>📝 عدد الصفحات:</strong> {livre.nombrePages || 'غير محدد'}</p>
              </div>
            </div>

            <div className="detail-description">
              <h5>📖 الوصف</h5>
              <p className="description-text">{livre.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
