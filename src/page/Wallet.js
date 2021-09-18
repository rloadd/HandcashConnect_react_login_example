import React from 'react';
import { Button } from "@material-ui/core";
import {      
    hSaveWallet, 
    hEnsurePaymail,
    hExit, 
    hGetWallet,
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

  doSave(paymail, avatarUrl){
    hSaveWallet("paymail",paymail);
    hSaveWallet("avatarUrl", avatarUrl);

    //Set the state to trigger the re-rendering
    this.setState({ paymail, avatarUrl })
  }

  render() {
    if (!hGetWallet("paymail") || hGetWallet("avatarUrl")) {
      hEnsurePaymail().then((res) => {
        this.doSave(res.publicProfile.paymail, res.publicProfile.avatarUrl);
      })
      .catch((error) => {
        console.error(error);
        hExit();
      });
    }

    return (
      <div id="buttons">
        <div id="spin">
        <center>
          {hGetWallet("paymail") ? (
            <div>{hGetWallet("paymail")}<br/>
              <img src={hGetWallet("avatarUrl")} width="80px" alt="logo"/>
              <div id="buttons">
                <form className="myForm">
                  <Button  onClick={() => {hExit()}} variant="contained" color="primary" disableElevation>
                    Salir
                  </Button>  
                </form>
              </div>
            </div>                
            ) :
            (<CircularProgress />) 
          }
          </center>
        </div>            
      </div>                 
      );
    }
  }
  export default Wallet;