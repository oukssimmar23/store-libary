// Recherche.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../pageaccueil/Header";
import "./Rech.css";

export default function Recherche({ livres }) {
  const [rech, setRech] = useState("");

  const livresFiltres = livres?.filter((liv) =>
    liv.title?.toLowerCase().includes(rech.toLowerCase())
  ) || [];

  return (
    <div className="search-page">
      <Header />

      <div className="search-container">
        {/* Search Section */}
        <div className="search-box-wrapper">
          <div className="search-group">
            <input
              type="search"
              value={rech}
              onChange={(e) => setRech(e.target.value)}
              placeholder="ابحث عن كتاب، رواية أو قصة..."
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>

        {/* Results Section */}
        {!livres ? (
          <div className="error-message">
            <h3>⚠️ حدث خطأ في تحميل البيانات</h3>
          </div>
        ) : (
          <>
            <h2 className="results-heading">
              <span className="book-icon">📚</span>
              "{rech}" نتائج البحث عن
              <span className="results-count">
                {livresFiltres.length} نتيجة
              </span>
            </h2>

            {livresFiltres.length > 0 ? (
              <div className="books-grid">
                {livresFiltres.map((liv) => (
                  <Link to={`/details/${liv.id}`} className="book-card-link" key={liv.id}>
                    <div className="book-card" style={{height:"300px",width:"200px"}}>
                      <img
                        src={liv.image}
                        alt={liv.title}
                        className="book-image"
                        style={{marginTop:"5px",height:"305px",width:"200px"}}
                      />
                      <div className="book-content">
                        <h3 className="book-title">{liv.title}</h3>
                        <div className="book-info">
                          <span className="book-price">{liv.prix} DH</span>
                          <span className="book-category">{liv.categorie}</span>
                        </div>
                        <Link
                          to={`/details/${liv.id}`}
                          className="details-button"
                        >
                          عرض التفاصيل
                        </Link>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <span className="no-results-icon">📚</span>
                <h3>❌ لم يتم العثور على نتائج</h3>
                <p>حاول استخدام كلمات بحث مختلفة</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
