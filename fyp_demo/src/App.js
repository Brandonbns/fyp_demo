import "./App.css";
import LandingPage from "./pages/LandingPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import OptionMenu from "./pages/OptionMenu";
import SmeLandingPage from "./pages/smes/SmeLandingPage";
import LeasesLandingPage from "./pages/leases/LeasesLandingPage";
import LoansLandingPage from "./pages/loans/LoansLandingPage";

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
