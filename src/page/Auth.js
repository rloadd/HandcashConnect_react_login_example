import React from "react";
import logo from '../media/logo.jpeg'; // Tell webpack this JS file uses this image

// import { Button } from "@material-ui/core";


const { HandCashConnect } = require("@handcash/handcash-connect");
const AppId = "60b56ceef6663d0b5545baa8";
export const handCashConnect = new HandCashConnect(AppId);
// Use this field to redirect the user to the HandCash authorization screen.
const redirectionLoginUrl = handCashConnect.getRedirectionUrl();

export default function Auth() {

  /* 
    Step 1.- Rrdirection to handcash connect URL for the user to give us authorization (link the app)
  */
  const HandCashLogin = (e) => {
    e.preventDefault();
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

