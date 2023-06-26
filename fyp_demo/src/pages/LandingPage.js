import React from "react";
import { BrowserRouter as Route, Switch } from "react-router-dom";
import SmeLandingPage from "./smes/SmeLandingPage";
import LeasesLandingPage from "./leases/LeasesLandingPage";
import OptionMenu from "./OptionMenu";
import LoansLandingPage from "./loans/LoansLandingPage";

function LandingPage() {
  return (
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
  );
}

export default LandingPage;
