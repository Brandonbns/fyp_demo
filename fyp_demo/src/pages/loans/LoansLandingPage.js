import axios from "axios";
import React from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { BASE_API_URI } from "../../commons/apiConfig";

const LoansLandingPage = () => {
  const [annual_inc, setAnnualInc] = React.useState("");
  const [term, setTerm] = React.useState("");
  const [debt_payments, setDebtPayments] = React.useState("");
  const [int_rate, setIntRate] = React.useState("");
  const [last_fico_range_high, setLastFicoRangeHigh] = React.useState("");
  const [last_fico_range_low, setLastFicoRangeLow] = React.useState("");
  const [loan_amnt, setLoanAmnt] = React.useState("");
  const [cluster_label, setClusterLabel] = React.useState("");
  const [loan_status, setLoanStatus] = React.useState("");

  const calcDti = () => {
    let monthly_income = +annual_inc / 12;
    let dti = +debt_payments / monthly_income;
    return dti * 100;
  };

  const dti = calcDti() || "";

  const predict = (e) => {
    e.preventDefault();

    const data = {
      annual_inc: +annual_inc,
      term: +term,
      debt_payments: +debt_payments,
      dti: +dti,
      int_rate: +int_rate / 100,
      last_fico_range_high: +last_fico_range_high,
      last_fico_range_low: +last_fico_range_low,
      loan_amnt: +loan_amnt,
    };

    console.log(data);

    axios
      .post(BASE_API_URI + "/personal_loans", data, { verify: false })
      .then((response) => {
        console.log(response.data);
        const { loan_status, cluster_label } = response.data;
        setLoanStatus(loan_status);
        setClusterLabel(cluster_label);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const displayCluster = () => {
    if (cluster_label === 0) {
      return <Alert variant="info">Low Risk</Alert>;
    } else if (cluster_label === 1) {
      return <Alert variant="warning">Medium Risk</Alert>;
    } else if (cluster_label === 2) {
      return <Alert variant="danger">High Risk</Alert>;
    } else {
      return <Alert variant="light" style={{ width: "10rem" }}></Alert>;
    }
  };

  const displayStatus = () => {
    if (loan_status === 0) {
      return <Alert variant="success">Non default</Alert>;
    } else if (loan_status === 1) {
      return <Alert variant="danger">Default</Alert>;
    } else {
      return <Alert variant="light" style={{ width: "10rem" }}></Alert>;
    }
  };

  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-center mt-5">
          <Card style={{ width: "60rem" }}>
            <Card.Header>
              <Card.Title>Personal Loans</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form as={Row}>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Annual Income</Form.Label>
                    <Form.Control
                      name="annual_inc"
                      value={annual_inc}
                      onChange={(e) => setAnnualInc(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Debt Payments</Form.Label>
                    <Form.Control
                      name="debt_payments"
                      value={debt_payments}
                      onChange={(e) => setDebtPayments(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Interest Rate</Form.Label>
                    <Form.Control
                      name="int_rate"
                      value={int_rate}
                      onChange={(e) => setIntRate(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Debt to Income Ratio:</Form.Label>
                    <Form.Control
                      plaintext
                      readOnly
                      name="dti"
                      value={(+dti).toFixed(2)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Last FICO Range High</Form.Label>
                    <Form.Control
                      name="last_fico_range_high"
                      value={last_fico_range_high}
                      onChange={(e) => setLastFicoRangeHigh(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Last FICO Range Low</Form.Label>
                    <Form.Control
                      name="last_fico_range_low"
                      value={last_fico_range_low}
                      onChange={(e) => setLastFicoRangeLow(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Loan Amount</Form.Label>
                    <Form.Control
                      name="loan_amnt"
                      value={loan_amnt}
                      onChange={(e) => setLoanAmnt(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Term</Form.Label>
                    <Form.Control
                      name="term"
                      value={term}
                      onChange={(e) => setTerm(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col className="d-flex flex-column justify-content-center align-items-center">
                  <Button className="mb-3" type="submit" onClick={predict}>
                    Predict
                  </Button>
                  <p>
                    <b>Cluster Label</b>
                  </p>
                  {displayCluster()}
                  <p>
                    <b>Loan Status</b>
                  </p>
                  {displayStatus()}
                </Col>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoansLandingPage;
