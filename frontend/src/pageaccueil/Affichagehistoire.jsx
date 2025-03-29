import { Link } from "react-router-dom";

export default function Affichagehistoire({ livres = [] }) { 
    const derniersLivres = Array.isArray(livres) 
        ? livres.filter(his => his.categorie === "histoire").slice(-5)
        : [];

    if (derniersLivres.length === 0) {
        return <h1>Aucun livre d'histoire disponible</h1>;
    }

    return (
        <fieldset style={{ border: "2px solid #ff4081", padding: "20px", borderRadius: "10px", backgroundColor: "#121212", color: "white", textAlign: "right" }}>
            <legend style={{ fontSize: "20px", fontWeight: "bold", color: "#ff4081", float: "right", padding: "0 10px" }}>📖 آخر القصص</legend>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center', marginTop: "30px" }}>
                {derniersLivres.map((livre) => (
                    <div key={livre._id} style={{ width: '120px', border: '1px solid #ff4081', borderRadius: '10px', padding: '10px', textAlign: 'center', backgroundColor: "#1e1e1e" }}>
                        <img src={livre.image} alt={livre.title} 
                            style={{ width: '100px', height: '130px', objectFit: 'contain', borderRadius: '5px', backgroundColor: "white" }} 
                        />
                        <h1 style={{ fontSize: '12px', margin: '5px 0' }}>{livre.title}</h1>
                        <p style={{ fontSize: '10px', color: '#bbb' }}>{livre.prix} €</p>
                        <button style={{ backgroundColor: '#ff4081', color: 'white', border: 'none', padding: '5px', fontSize: "10px", borderRadius: '5px', cursor: 'pointer' }}>
                            Ajouter au panier
                        </button>
                        <Link to={`/details/${livre.id}`} style={{ display: 'block', marginTop: '5px', fontSize: "10px", textDecoration: 'none', color: '#ff4081' }}>
                            Voir les détails
                        </Link>
                    </div>
                ))}
            </div>
        </fieldset>
    );
}
