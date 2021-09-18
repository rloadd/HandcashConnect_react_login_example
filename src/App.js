import Auth from "./page/Auth";
import Wallet from "./page/Wallet";
import Callback from "./page/Callback";

import { Switch, Route, BrowserRouter } from "react-router-dom";

import './App.css';
function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Auth} />
        <Route path="/success" component={Callback} />
        <Route path="/wallet" component={Wallet} />
      </Switch>
      
      </BrowserRouter>
    </div>
  );
}

export default App;

