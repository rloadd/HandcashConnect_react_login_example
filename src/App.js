import Auth from "./page/Auth";
import Options from "./page/Wallet";

import { Switch, Route, BrowserRouter } from "react-router-dom";

import './App.css';
function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Auth} />
        <Route path="/success" component={Options} />
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
