import { Routes,Route } from "react-router-dom";
import Histoire from "./pageofficiel/Histoire"
import  Livre from "./pageofficiel/Livre"
import  Menu from "./pageofficiel/Menu"
import Roman from "./pageofficiel/Roman"
import Details from "./Details/Details"



import { useState,useEffect } from "react";
import axios from "axios"
import { Home } from "./pageaccueil/Home";

function App() {
  const [livres, setLivres] = useState();

  const getLivres = async () =>{
    const response = await axios.get("http://localhost:4001/livres")
    setLivres(response.data)
    console.log(response);
    
  }


  useEffect(() => {
    getLivres()
      
      
  }, []);
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/menu" element={<Menu livres={livres} ></Menu>}></Route>
        <Route path="/histoire" element={<Histoire livres={livres} ></Histoire>} ></Route>
        <Route path="/roman" element={<Roman livres={livres} ></Roman>}></Route>
        <Route path="/livre" element={<Livre livres={livres} ></Livre>}></Route>
        <Route path="/details/:id" element={<Details livres={livres} ></Details>}></Route>
        
      </Routes>
    </div>
  );
}

export default App;
