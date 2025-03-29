import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./Details.css"; // Ajoute ce fichier pour appliquer le CSS

export default function Details({ livres }) {
  const { id } = useParams();
  const livre = livres.find(livre => Number(livre.id) === Number(id)); 
  const [quantity, setQuantity] = useState(0);

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => setQuantity(quantity > 0 ? quantity - 1 : 0);

  if (!livre) {
    return <p className="text-center text-red-500">❌ الكتاب غير موجود!</p>;
  }

  return (
    <div className="details-container">
      {/* Section de l'image avec un cadre */}
      <div className="image-container">
        <div className="image-frame">
          <img src={livre.image} alt={livre.titre} />
        </div>
      </div>

      {/* Section des détails */}
      <div className="details-content">
        <table className="details-table">
          <tbody>
            <tr><td>{livre.title}</td><th>📖 العنوان</th></tr>
            <tr><td>{livre.auteur}</td><th>✍️ الكاتب</th></tr>
            <tr><td>{livre.categorie}</td><th>📚 النوع</th></tr>
            <tr><td>{livre.evaluation} / 10</td><th>⭐ التقييم</th></tr>
            <tr><td>{livre.prix} DH</td><th>💰 الثمن</th></tr>
            <tr><td>{livre.description}</td><th>📝 الوصف</th></tr>
          </tbody>
        </table>

        {/* Contrôles de quantité et bouton d'ajout */}
        <div className="quantity-controls">
          <button onClick={handleDecrease} className="quantity-button">-</button>
          <p className="text-lg font-semibold">{quantity}</p>
          <button onClick={handleIncrease} className="quantity-button">+</button>
          <button className="add-to-cart">🛒 إضافة إلى السلة</button>
        </div>
      </div>
    </div>
  );
}
