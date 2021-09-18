import React from 'react';
import {  
    hUrlAuthToken, 
    hSaveWallet, 
} from "../helpers/utilities.js"

class Callback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {     
      paymail: "",
      authToken: "",
      avatarUrl: "",
    };
  }

  render() {
    let authToken = hUrlAuthToken();
    if (authToken) {
      hSaveWallet("authToken",authToken);
      window.location.href = "/wallet"
    }    
    return (<div></div>)
  }
}

  export default Callback;