import axios from "axios";
import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const LeasesLandingPage = () => {
  const [disbursed_amount, set_disbursed_amount] = useState("");
  const [asset_cost, set_asset_cost] = useState("");
  const [ltv, set_ltv] = useState("");
  const [date_of_birth, set_date_of_birth] = useState("");
  const [employment_type, set_employment_type] = useState("");
  const [disbursaldate, set_disbursaldate] = useState("");
  const [aadhar_flag, set_aadhar_flag] = useState("");
  const [pan_flag, set_pan_flag] = useState("");
  const [voterid_flag, set_voterid_flag] = useState("");
  const [driving_flag, set_driving_flag] = useState("");
  const [passport_flag, set_passport_flag] = useState("");
  const [perform_cns_score, set_perform_cns_score] = useState("");
  const [perform_cns_score_description, set_perform_cns_score_description] =
    useState("");
  const [pri_no_of_accts, set_pri_no_of_accts] = useState("");
  const [pri_active_accts, set_pri_active_accts] = useState("");
  const [pri_overdue_accts, set_pri_overdue_accts] = useState("");
  const [pri_current_balance, set_pri_current_balance] = useState("");
  const [pri_sanctioned_amount, set_pri_sanctioned_amount] = useState("");
  const [pri_disbursed_amount, set_pri_disbursed_amount] = useState("");
  const [sec_no_of_accts, set_sec_no_of_accts] = useState("");
  const [sec_active_accts, set_sec_active_accts] = useState("");
  const [sec_overdue_accts, set_sec_overdue_accts] = useState("");
  const [sec_current_balance, set_sec_current_balance] = useState("");
  const [sec_sanctioned_amount, set_sec_sanctioned_amount] = useState("");
  const [sec_disbursed_amount, set_sec_disbursed_amount] = useState("");
  const [primary_instal_amt, set_primary_instal_amt] = useState("");
  const [sec_instal_amt, set_sec_instal_amt] = useState("");
  const [new_accts_in_last_six_months, set_new_accts_in_last_six_months] =
    useState("");
  const [
    delinquent_accts_in_last_six_months,
    set_delinquent_accts_in_last_six_months,
  ] = useState("");
  const [average_acct_age, set_average_acct_age] = useState("");
  const [credit_history_length, set_credit_history_length] = useState("");
  const [no_of_inquiries, set_no_of_inquiries] = useState("");
  const [loan_status, setLoanStatus] = React.useState("");

  const predict = async (event) => {
    event.preventDefault();

    const payload = {
      disbursed_amount,
      asset_cost,
      ltv,
      date_of_birth,
      employment_type,
      disbursaldate,
      aadhar_flag,
      pan_flag,
      voterid_flag,
      driving_flag,
      passport_flag,
      perform_cns_score,
      perform_cns_score_description,
      pri_no_of_accts,
      pri_active_accts,
      pri_overdue_accts,
      pri_current_balance,
      pri_disbursed_amount,
      sec_no_of_accts,
      sec_active_accts,
      sec_overdue_accts,
      sec_current_balance,
      sec_sanctioned_amount,
      sec_disbursed_amount,
      primary_instal_amt,
      sec_instal_amt,
      new_accts_in_last_six_months,
      delinquent_accts_in_last_six_months,
      average_acct_age,
      credit_history_length,
      no_of_inquiries,
    };

    console.log(payload);

    // const response = await axios.post("http://localhost:5000/predict", payload);
    // alert(`The prediction is: ${response.data.prediction}`);

    setLoanStatus(Math.random() < 0.5 ? 0 : 1);
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
              <Card.Title>Leases</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form as={Row}>
                <Col>
                  <label>
                    Disbursed Amount:
                    <input
                      type="text"
                      value={disbursed_amount}
                      onChange={(e) => set_disbursed_amount(e.target.value)}
                    />
                  </label>
                  <br />

                  <label>
                    Asset Cost:
                    <input
                      type="text"
                      value={asset_cost}
                      onChange={(e) => set_asset_cost(e.target.value)}
                    />
                  </label>
                  <br />

                  <label>
                    Loan To Value:
                    <input
                      type="text"
                      value={ltv}
                      onChange={(e) => set_ltv(e.target.value)}
                    />
                  </label>
                  <br />

                  <label>
                    Date of Birth:
                    <input
                      type="date"
                      value={date_of_birth}
                      onChange={(e) => set_date_of_birth(e.target.value)}
                    />
                  </label>
                  <br />

                  <label>
                    Employement Type:
                    <select
                      value={employment_type}
                      onChange={(e) => set_employment_type(e.target.value)}
                    >
                      <option value="option1">Salaried</option>
                      <option value="option2">Self Employed</option>
                    </select>
                  </label>
                  <br />

                  <label>
                    Disbursal Date:
                    <input
                      type="date"
                      value={disbursaldate}
                      onChange={(e) => set_disbursaldate(e.target.value)}
                    />
                  </label>
                  <br />

                  <label>
                    Identity Card Given:
                    <input
                      type="radio"
                      value="yes"
                      checked={aadhar_flag === "yes"}
                      onChange={(e) => set_aadhar_flag(e.target.value)}
                    />
                    Yes
                    <input
                      type="radio"
                      value="no"
                      checked={aadhar_flag === "no"}
                      onChange={(e) => set_aadhar_flag(e.target.value)}
                    />
                    No
                  </label>
                  <br />

                  <label>
                    Tax File Number Given:
                    <input
                      type="radio"
                      value="yes"
                      checked={pan_flag === "yes"}
                      onChange={(e) => set_pan_flag(e.target.value)}
                    />
                    Yes
                    <input
                      type="radio"
                      value="no"
                      checked={pan_flag === "no"}
                      onChange={(e) => set_pan_flag(e.target.value)}
                    />
                    No
                  </label>
                  <br />

                  <label>
                    Voter ID Given:
                    <input
                      type="radio"
                      value="yes"
                      checked={voterid_flag === "yes"}
                      onChange={(e) => set_voterid_flag(e.target.value)}
                    />
                    Yes
                    <input
                      type="radio"
                      value="no"
                      checked={voterid_flag === "no"}
                      onChange={(e) => set_voterid_flag(e.target.value)}
                    />
                    No
                  </label>
                  <br />

                  <label>
                    Driving License Number Given:
                    <input
                      type="radio"
                      value="yes"
                      checked={driving_flag === "yes"}
                      onChange={(e) => set_driving_flag(e.target.value)}
                    />
                    Yes
                    <input
                      type="radio"
                      value="no"
                      checked={driving_flag === "no"}
                      onChange={(e) => set_driving_flag(e.target.value)}
                    />
                    No
                  </label>
                  <br />

                  <label>
                    Passport Number Given:
                    <input
                      type="radio"
                      value="yes"
                      checked={passport_flag === "yes"}
                      onChange={(e) => set_passport_flag(e.target.value)}
                    />
                    Yes
                    <input
                      type="radio"
                      value="no"
                      checked={passport_flag === "no"}
                      onChange={(e) => set_passport_flag(e.target.value)}
                    />
                    No
                  </label>
                  <br />

                  <label>
                    Bureau Score:
                    <input
                      type="text"
                      value={perform_cns_score}
                      onChange={(e) => set_perform_cns_score(e.target.value)}
                    />
                  </label>
                  <br />

                  <label>
                    Bureau Score Rank:
                    <select
                      value={perform_cns_score_description}
                      onChange={(e) =>
                        set_perform_cns_score_description(e.target.value)
                      }
                    >
                      <option value="option1">
                        No Bureau History Available
                      </option>
                      <option value="option2">A-Very Low Risk </option>
                      <option value="option3">B-Very Low Risk</option>
                      <option value="option4">C-Very Low Risk</option>
                      <option value="option5">D-Very Low Risk</option>
                      <option value="option6">E-Low Risk</option>
                      <option value="option7">F-Low Risk</option>
                      <option value="option8">G-Low Risk</option>
                      <option value="option9">H-Medium Risk</option>
                      <option value="option10">I-Medium Risk</option>
                      <option value="option11">J-High Risk</option>
                      <option value="option12">K-High Risk</option>
                      <option value="option13">L-Very High Risk</option>
                      <option value="option14">M-Very High Risk</option>
                      <option value="option15">
                        Not Scored: Sufficient History Not Available
                      </option>
                      <option value="option16">
                        Not Scored: Not Enough Info available on the customer
                      </option>
                      <option value="option17">
                        Not Scored: No Activity seen on the customer (Inactive)
                      </option>
                      <option value="option18">
                        Not Scored: No Updates available in last 36 months
                      </option>
                      <option value="option19">
                        Not Scored: Only a Guarantor
                      </option>
                      <option value="option20">
                        Not Scored: More than 50 active Accounts found
                      </option>
                    </select>
                  </label>
                  <br />

                  <label>
                    Primary Number of Accounts:
                    <input
                      type="text"
                      value={pri_no_of_accts}
                      onChange={(e) => set_pri_no_of_accts(e.target.value)}
                    />
                  </label>
                  <br />

                  <label>
                    Primary Active Accounts:
                    <input
                      type="text"
                      value={pri_active_accts}
                      onChange={(e) => set_pri_active_accts(e.target.value)}
                    />
                  </label>
                  <br />

                  <label>
                    Primary Overdue Accounts:
                    <input
                      type="text"
                      value={pri_overdue_accts}
                      onChange={(e) => set_pri_overdue_accts(e.target.value)}
                    />
                  </label>
                  <br />

                  <label>
                    Primary Current Balance:
                    <input
                      type="text"
                      value={pri_current_balance}
                      onChange={(e) => set_pri_current_balance(e.target.value)}
                    />
                  </label>
                  <br />

                  <label>
                    Primary Sanctioned Amount:
                    <input
                      type="text"
                      value={pri_sanctioned_amount}
                      onChange={(e) =>
                        set_pri_sanctioned_amount(e.target.value)
                      }
                    />
                  </label>
                  <br />

                  <label>
                    Primary Disbursed Amount:
                    <input
                      type="text"
                      value={pri_disbursed_amount}
                      onChange={(e) => set_pri_disbursed_amount(e.target.value)}
                    />
                  </label>
                  <br />

                  <label>
                    Secondary Number of Accounts:
                    <input
                      type="text"
                      value={sec_no_of_accts}
                      onChange={(e) => set_sec_no_of_accts(e.target.value)}
                    />
                  </label>
                  <br />

                  <label>
                    Secondary Active Accounts:
                    <input
                      type="text"
                      value={sec_active_accts}
                      onChange={(e) => set_sec_active_accts(e.target.value)}
                    />
                  </label>
                  <br />

                  <label>
                    Secondary Overdue Accounts:
                    <input
                      type="text"
                      value={sec_overdue_accts}
                      onChange={(e) => set_sec_overdue_accts(e.target.value)}
                    />
                  </label>
                  <br />

                  <label>
                    Secondary Current Balance:
                    <input
                      type="text"
                      value={sec_current_balance}
                      onChange={(e) => set_sec_current_balance(e.target.value)}
                    />
                  </label>
                  <br />

                  <label>
                    Secondary Sanctioned Amount:
                    <input
                      type="text"
                      value={sec_sanctioned_amount}
                      onChange={(e) =>
                        set_sec_sanctioned_amount(e.target.value)
                      }
                    />
                  </label>
                  <br />

                  <label>
                    Secondary Disbursed Amount:
                    <input
                      type="text"
                      value={sec_disbursed_amount}
                      onChange={(e) => set_sec_disbursed_amount(e.target.value)}
                    />
                  </label>
                  <br />

                  <label>
                    Primary Installment Amount:
                    <input
                      type="text"
                      value={primary_instal_amt}
                      onChange={(e) => set_primary_instal_amt(e.target.value)}
                    />
                  </label>
                  <br />

                  <label>
                    Secondary Installment Amount:
                    <input
                      type="text"
                      value={sec_instal_amt}
                      onChange={(e) => set_sec_instal_amt(e.target.value)}
                    />
                  </label>
                  <br />

                  <label>
                    New Accounts in last 6 months:
                    <input
                      type="text"
                      value={new_accts_in_last_six_months}
                      onChange={(e) =>
                        set_new_accts_in_last_six_months(e.target.value)
                      }
                    />
                  </label>
                  <br />

                  <label>
                    Delinquent Accounts in last 6 months:
                    <input
                      type="text"
                      value={delinquent_accts_in_last_six_months}
                      onChange={(e) =>
                        set_delinquent_accts_in_last_six_months(e.target.value)
                      }
                    />
                  </label>
                  <br />

                  <label>
                    Average Account Age:
                    <input
                      type="text"
                      value={average_acct_age}
                      onChange={(e) => set_average_acct_age(e.target.value)}
                    />
                  </label>
                  <br />

                  <label>
                    Credit history Length:
                    <input
                      type="text"
                      value={credit_history_length}
                      onChange={(e) =>
                        set_credit_history_length(e.target.value)
                      }
                    />
                  </label>
                  <br />

                  <label>
                    Number of Inquiries:
                    <input
                      type="text"
                      value={no_of_inquiries}
                      onChange={(e) => set_no_of_inquiries(e.target.value)}
                    />
                  </label>
                  <br />
                </Col>
                <Col className="d-flex flex-column justify-content-center align-items-center">
                  <Button className="mb-3" type="submit" onClick={predict}>
                    Predict
                  </Button>
                  <p>
                    <b>Lease Status</b>
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

export default LeasesLandingPage;
