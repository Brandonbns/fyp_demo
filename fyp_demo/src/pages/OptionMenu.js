import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

function OptionMenu() {
  return (
    <div class="optionMenu">
      <div className="optionMenuContent">
        <h1>Welcome to the Home Page</h1>
        <div className="loanOptions">
          <p>Click on the buttons below to navigate to different pages:</p>
          <ButtonGroup className="me-2" size="lg" aria-label="First group">
            <Link to="/personal_loans">
              <Button variant="primary">Personal Loans</Button>
            </Link>
            <Link to="/sme_loans">
              <Button variant="primary">SME Loans</Button>
            </Link>
            <Link to="/leases">
              <Button variant="primary">Lease</Button>
            </Link>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
}

export default OptionMenu;
