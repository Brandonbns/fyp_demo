import React from "react";
import { Button, ButtonGroup, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function OptionMenu() {
  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-center mt-5">
          {/* <div class="optionMenu"> */}
          <div className="optionMenuContent ">
            <h1>Loan Default Prediction - Demo</h1>
            <div className="d-flex justify-content-center">
              <p>Team Analyzers</p>
            </div>
            <div className="loanOptions d-flex justify-content-center mt-3">
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
            {/* </div> */}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default OptionMenu;
