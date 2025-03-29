import { Link } from 'react-router-dom';

export default function Roman({ livres = [] }) {
    const filterRoman = livres.filter(livre => livre.categorie === "roman");

    if (filterRoman.length === 0) {
        return <h1>Aucun roman disponible</h1>;
    }

    return (
        <fieldset style={{ 
            border: "2px solid #ff5722", 
            padding: "20px", 
            borderRadius: "10px", 
            backgroundColor: "#121212", 
            color: "white", 
            textAlign: "right" 
        }}>
            <legend style={{ 
                fontSize: "20px", 
                fontWeight: "bold", 
                color: "#ff5722", 
                float: "right", 
                padding: "0 10px" 
            }}>
                📖 قائمة الروايات
            </legend>
            
            <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '15px', 
                justifyContent: 'center', 
                marginTop: "30px" 
            }}>
                {filterRoman.map(livre => (
                    <div key={livre.id} style={{ 
                        width: '120px', 
                        border: '1px solid #ff5722', 
                        borderRadius: '10px', 
                        padding: '10px', 
                        textAlign: 'center', 
                        backgroundColor: "#1e1e1e" 
                    }}>
                        <img 
                            src={livre.image} 
                            alt={livre.title} 
                            style={{ 
                                width: '100px', 
                                height: '130px', 
                                objectFit: 'cover', 
                                borderRadius: '5px', 
                                backgroundColor: "white" 
                            }} 
                        />
                        <h1 style={{ fontSize: '12px', margin: '5px 0' }}>{livre.title}</h1>
                        <p style={{ fontSize: '10px', color: '#bbb' }}>{livre.prix} DH</p>
                        
                        <button style={{ 
                            backgroundColor: '#ff5722', 
                            color: 'white', 
                            border: 'none', 
                            padding: '5px', 
                            fontSize: "10px", 
                            borderRadius: '5px', 
                            cursor: 'pointer' 
                        }}>
                            Ajouter au panier
                        </button>
                        
                        <Link to={`/details/${livre.id}`} style={{ 
                            display: 'block', 
                            marginTop: '5px', 
                            fontSize: "10px", 
                            textDecoration: 'none', 
                            color: '#ff5722' 
                        }}>
                            Voir les détails
                        </Link>
                    </div>
                ))}
            </div>
        </fieldset>
    );
}

