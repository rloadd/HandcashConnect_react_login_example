import { resolve } from "path";

const { HandCashConnect } = require("@handcash/handcash-connect");
const AppId = "60b56ceef6663d0b5545baa8";  //Your AppID
export const handCashConnect = new HandCashConnect(AppId);

export function useQuery() {
  return new URLSearchParams(window.location.search); 
}

export function UrlAuthToken() {
    const query = useQuery();
    return  query.get("authToken"); 
}

export const SaveWallet = (paymail, avatarURL, authToken) => {
  console.log("svewallet", paymail, authToken);
  localStorage.setItem("paymail", paymail);
  localStorage.setItem("authToken", authToken);
  localStorage.setItem("avatarUrl", avatarURL);
};


export const GetWallet = (field) => {
  switch (field) {
    case "paymail":
    case "authToken":
    case "avatarUrl":
      return localStorage.getItem(field);
    default:
      return "";
  }
}

export function Exit() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("paymail");
  localStorage.removeItem("avatarUrl");
  window.location.href="/"
 }

export function fullhost () {
  var url = window.location.href
  var arr = url.split("/");
  return arr[0] + "//" + arr[2];
}

export function EnsureAuthToken(){
  let authToken = GetWallet("authToken");
  if (! authToken) {  
    // Use this field to redirect the user to the HandCash authorization screen.
    const redirectionLoginUrl = handCashConnect.getRedirectionUrl();
    window.location.href = redirectionLoginUrl;
  }
}

export function EnsurePaymail(){
  let paymail = GetWallet("paymail");
  let authToken = GetWallet("authToken");

  //  console.log(paymail,authToken)
  if (! paymail || paymail==="") {
    const account = handCashConnect.getAccountFromAuthToken(authToken);

    return account.profile
      .getCurrentProfile()
      .then((res) => {
        console.log(res);
          return(res);
    })
    .catch((error) => {      
      console.error("Very likely the current authToken is invalid. Dropped!!", error);
      Exit();
    });
  }  else {
    return new Promise(() => { resolve(paymail); });
  }
}


