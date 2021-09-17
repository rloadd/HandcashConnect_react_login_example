import React from "react";
import logo from '../media/logo.jpeg'; 
import { handCashConnect } from "../helpers/utilities.js"

export default function Auth() {

  /* 
    Step 1.- Rrdirection to handcash connect URL for the user to give us authorization (link the app)
  */
  const HandCashLogin = (e) => {
    e.preventDefault();
    const redirectionLoginUrl = handCashConnect.getRedirectionUrl();
    window.location.href = redirectionLoginUrl;
  };

  return (                            
    <div id="buttons">
      <img src={logo} alt="Logo" width="200px"/>           
      <div id="connectButton" onClick={HandCashLogin} style={{width: "250px", margin: "50px 0 0 0 "}}>           
        Connect with HandCash
      </div> 
    </div>          
  );
}

