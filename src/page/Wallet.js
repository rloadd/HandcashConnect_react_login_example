import React from 'react';
import { Button } from "@material-ui/core";
import {  
    UrlAuthToken, 
    SaveWallet, 
    EnsurePaymail,
    Exit, 
    GetWallet,
    } from "../helpers/utilities.js"

import { CircularProgress } from "@material-ui/core";

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {     
      paymail: "",
      authToken: "",
      avatarUrl: "",
    };
  }

  doSave(paymail, avatarUrl, authToken){
    SaveWallet(paymail, avatarUrl, authToken);
    this.setState({ paymail, authToken })
  }

  render() {
    let authToken = UrlAuthToken();
    if (authToken) {
      localStorage.setItem("authToken",authToken );
    }
        
    let paymail = localStorage.getItem("paymail");
    if (!paymail || paymail.length===0) {
      EnsurePaymail().then((res) => {
        //console.log("res ", res);
        this.doSave(res.publicProfile.paymail, res.publicProfile.avatarUrl, authToken);
      })
      .catch((error) => {
        console.error(error);
      });
    }

    return (
      <div id="buttons">
        <div id="spin">
          {paymail ? (
            <div>{paymail}<br/>
              <center>
                <img src={GetWallet("avatarUrl")} width="80px" alt="logo"/>
              </center>

              <div id="buttons">
                <form className="myForm">
                  <Button  onClick={() => {Exit()}} variant="contained" color="secondary" disableElevation>
                    Salir
                  </Button>  
                </form>
              </div>
            </div>                
            ) :
            (<CircularProgress />) 
          }
        </div>            
      </div>                 
      );
    }
  }
  export default Wallet;