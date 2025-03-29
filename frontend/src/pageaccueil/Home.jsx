import React, { useEffect, useState } from 'react'
import Header from './Header'
import Affichageevaluation from './affichageevaluation'
import Affichagehistoire from './Affichagehistoire'
import Affichagelivre from './Affichagelivre'
import Affichageroman from './affichageroman'
import axios from 'axios'

export const Home = () => {

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
    <div>
        <Header></Header>
        <Affichageevaluation livres={livres}></Affichageevaluation>
        <Affichagehistoire livres={livres}></Affichagehistoire>
        <Affichagelivre livres={livres}></Affichagelivre>
        <Affichageroman livres={livres}></Affichageroman>
    </div>
  )
}
