import React from 'react'
import "./Header.css"
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div>
       <header>
           
           <nav>
           <Link to="/histoire">القصص</Link>
              <Link to="/roman">الروايات</Link>
              <Link to="/livre">الكتب</Link>
              <Link to="/menu">قائمة</Link>
              <a href="accueil">الرئيسية</a>
           </nav>
           <img src="./اقرا-removebg-preview.png" alt="" />
       </header>
       <video width="100%" height="360" controls>
        <source src="./Iqra2.mp4" type="video/mp4" /> </video>
        
    </div>
  )
}
