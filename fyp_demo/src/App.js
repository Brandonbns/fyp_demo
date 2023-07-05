import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import OptionMenu from "./pages/OptionMenu";
import LeasesLandingPage from "./pages/leases/LeasesLandingPage";
import LoansLandingPage from "./pages/loans/LoansLandingPage";
import SmeLandingPage from "./pages/smes/SmeLandingPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <OptionMenu></OptionMenu>
          </Route>
          <Route path="/personal_loans">
            <LoansLandingPage></LoansLandingPage>
          </Route>
          <Route path="/sme_loans">
            <SmeLandingPage></SmeLandingPage>
          </Route>
          <Route path="/leases">
            <LeasesLandingPage></LeasesLandingPage>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
