import { Routes, Route } from "react-router-dom";
import Histoire from "./pageofficiel/Histoire";
import Livre from "./pageofficiel/Livre";
import Menu from "./pageofficiel/Menu";
import Roman from "./pageofficiel/Roman";
import Details from "./Details/Details";
import Panier from "./cache/Panier";
import { useState, useEffect } from "react";
import axios from "axios";
import { Home } from "./pageaccueil/Home";

import Recherche from "./navigate/Recherche";
import Contacts from "./navigate/Contacts"

import Contactus from "./fotter/Contactus";

function App() {
  const [livres, setLivres] = useState([]); // ✅ إصلاح التهيئة
  const [panier, setPanier] = useState([]); // ✅ إضافة السلة

  // ✅ استدعاء البيانات عند تحميل الصفحة
  useEffect(() => {
    const getLivres = async () => {
      try {
        const response = await axios.get("http://localhost:3003/livres");
        setLivres(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des livres:", error);
      }
    };
    getLivres();
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/cont" element={<Contactus  />}></Route>
        <Route path="/contacts" element={<Contacts  />}></Route>
       <Route path="/rech" element={<Recherche livres={livres} />} ></Route>
        
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu livres={livres} />} />
        <Route path="/histoire" element={<Histoire livres={livres} />} />
        <Route path="/roman" element={<Roman livres={livres} />} />
        <Route path="/livre" element={<Livre livres={livres} />} />
        
        {/* ✅ تمرير `setPanier` لضبط السلة */}
        <Route path="/details/:id" element={<Details livres={livres} panier={panier} setPanier={setPanier} />} />
        
        {/* ✅ إزالة `:id` من `/panier` لأنه يعرض جميع المنتجات */}
        <Route path="/panier" element={<Panier panier={panier} setPanier={setPanier} />} />
        
      </Routes>
    </div>
  );
}

export default App;
