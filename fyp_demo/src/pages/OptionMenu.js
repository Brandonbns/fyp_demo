import React from "react";
import { Link } from "react-router-dom";

function OptionMenu() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>Click on the buttons below to navigate to different pages:</p>
      <div>
        <Link to="/personal_loans">
          <button>Personal Loans</button>
        </Link>
        <Link to="/sme_loans">
          <button>SME Loans</button>
        </Link>
        <Link to="/leases">
          <button>Lease</button>
        </Link>
      </div>
    </div>
  );
}

export default OptionMenu;
