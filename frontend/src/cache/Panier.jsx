import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Panier.css";

export default function Panier() {
  const [panier, setPanier] = useState([]);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    adresseUtilisateur: "",
    adresseCommande: "",
  });

  useEffect(() => {
    const savedPanier = JSON.parse(localStorage.getItem("panier")) || [];
    setPanier(savedPanier);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const total = panier.reduce(
    (total, item) => total + item.prix * (item.quantite || 1),
    0
  );

  const removeFromPanier = (id) => {
    const updatedPanier = panier.filter((item) => item.id !== id);
    setPanier(updatedPanier);
    localStorage.setItem("panier", JSON.stringify(updatedPanier));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const orderData = {
        ...formData,
        livres: panier.map((item) => ({
          id: item.id,
          quantite: item.quantite,
          title: item.title,
          prix: item.prix,
          image: item.image,
          auteur: item.auteur,
          categorie: item.categorie,
          description: item.description,
          anneePublication: item.anneePublication,
          nombrePages: item.nombrePages,
          langue: item.langue,
          etat: item.etat,
          isbn: item.isbn
        })),
      };

      const response = await axios.post("http://localhost:3003/commande-complete", orderData);
      console.log("تم إرسال الطلب بنجاح:", response.data);

      localStorage.removeItem("panier");
      setPanier([]);
      alert("✅ تم تأكيد الطلب بنجاح!");
    } catch (error) {
      console.error("حدث خطأ أثناء إرسال الطلب:", error.response?.data || error.message);
      alert("❌ وقع مشكل أثناء إرسال الطلب.");
    }
  };

  return (
    <div className="panier-container">
      <header className="panier-header">
  <div className="header-content">
    <h1 className="title">🛒 سلة المشتريات</h1>
    <p className="subtitle">اهلاً بك في سلتك! تصفح كتبك المفضلة واطلب الآن.</p>
  </div>
  <div className="header-cart-icon">
    <img src="/path/to/cart-icon.svg" alt="Cart Icon" />
  </div>
</header>


      {panier.length === 0 ? (
        <p>🪹 السلة فارغة</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>🗑️ حذف</th>
              <th>💰 السعر</th>
              <th>🔢 الكمية</th>
              <th>📖 الكتاب</th>
            </tr>
          </thead>
          <tbody>
            {panier.map((item) => (
              <tr key={item.id}>
                <td>
                  <button onClick={() => removeFromPanier(item.id)}>حذف</button>
                </td>
                <td>{item.prix * item.quantite} DH</td>
                <td>{item.quantite}</td>
                <td>{item.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {panier.length > 0 && (
        <>
          <h3>🧮 المجموع: {total} DH</h3>

          <form onSubmit={handleSubmit} className="form-shipping">
            <h3>📦 معلومات الشحن</h3>

            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="الاسم"
              required
            />

            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              placeholder="اللقب"
              required
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="البريد الإلكتروني"
              required
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="كلمة المرور"
              required
            />

            <input
              type="text"
              name="adresseUtilisateur"
              value={formData.adresseUtilisateur}
              onChange={handleChange}
              placeholder="عنوان المستخدم"
              required
            />

            <input
              type="text"
              name="adresseCommande"
              value={formData.adresseCommande}
              onChange={handleChange}
              placeholder="عنوان الشحن"
              required
            />

            <button type="submit">✅ تأكيد الطلب</button>
          </form>
        </>
      )}
    </div>
  );
}
