import { resolve } from "path";

const { HandCashConnect } = require("@handcash/handcash-connect");
const AppId = "60b56ceef6663d0b5545baa8";  //Your AppID
export const handCashConnect = new HandCashConnect(AppId);

export function UseQuery() {
  return new URLSearchParams(window.location.search); 
}

//Gets an URL encoded parameter
export function hUrlAuthToken() {
    const query = UseQuery();
    return  query.get("authToken"); 
}


//Save wallet data to LocalStorage
export const hSaveWallet = (field, value) => {
  let w = JSON.parse(localStorage.getItem("wallet"));

  //Another authToken -> forget previous data
  if (!w || ((field === "authToken") && (w[field]!==value))) {
    w = {};  
  }
  w[field] = value;
  localStorage.setItem("wallet", JSON.stringify(w));
};

//Retrieves data from localStorage to support the session
export const hGetWallet = (field) => {
  let w = JSON.parse(localStorage.getItem("wallet"));
  return w && w[field] ? w[field] : null;
}

//Cleans the session forgetting the localStorageData
export function hExit() {
  localStorage.removeItem("wallet");
  window.location.href="/"
 }


export function hEnsureAuthToken(){  
  if (!hGetWallet("authToken")) {  
    // Use this field to redirect the user to the HandCash authorization screen.
    const redirectionLoginUrl = handCashConnect.getRedirectionUrl();
    window.location.href = redirectionLoginUrl;
  }
}

export function hEnsurePaymail(){
  hEnsureAuthToken();
  
  if (!hGetWallet("paymail")) {
    const account = handCashConnect.getAccountFromAuthToken(hGetWallet("authToken"));
    return account.profile
      .getCurrentProfile()
      .then((res) => {
        console.log(res);
        return(res);
    })
    .catch((error) => {      
      console.error("Very likely the current authToken is invalid. Dropped!!", error);
      hExit();
    });
  }  else {
    return new Promise(() => { resolve(hGetWallet("paymail")); });
  }
}


