import React from "react";
import Header from "../pageaccueil/Header";

const Contactus = () => {
  return (
    <div className="contactus-container">
       <Header></Header>
      <center><h2 style={{background:"beige"}}>نموذج الاتصال</h2></center>
     <center> <div className="contactus-iframe-container">
        <iframe
          className="contactus-iframe"
          src="https://docs.google.com/forms/d/e/1FAIpQLSfQ4S-KV6ZONpzEODrEMAklqhtQ3yDEDprunFehpzrwnv4QFg/viewform?embedded=true"
          width="640"
          height="1097"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
        />
      </div></center>
    </div>
  );
};

export default Contactus;
