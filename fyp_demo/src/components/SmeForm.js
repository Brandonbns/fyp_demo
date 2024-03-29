import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_API_URI } from "../commons/apiConfig";

export default function SmeForm() {
  // defining states
  //   Loan info

  const [pageState, setPageState] = useState(1);
  const [prediction, setPrediction] = useState({});
  const [showDefault, setShowDefault] = useState(false);
  const [formData, setFormData] = useState({
    smeName: "",
    sector: 0,
    term: 0,
    noEmp: 0,
    loanAmount: 0,
    rural: 0,
    interestRate: 0,
    unemploymentRate: 0,
    preCpi: 0,
    prevIpr: 0,
    curRatio: 0,
    debtCapital: 0,
    debtEquity: 0,
    grossMargin: 0,
    operatingMargin: 0,
    ebitMargin: 0,
    ebitdaMargin: 0,
    preTaxProfitMargin: 0,
    netProfitMargin: 0,
    assetTurnover: 0,
    roe: 0,
    rote: 0,
    roa: 0,
    roi: 0,
  });

  const [isError, setIsError] = useState(false);
  const [formError, setFormError] = useState({
    smeName: "",
    sector: "",
    term: "",
    noEmp: "",
    loanAmount: "",
    rural: "",
    interestRate: "",
    unemploymentRate: "",
    preCpi: "",
    prevIpr: "",
    curRatio: "",
    debtCapital: "",
    debtEquity: "",
    grossMargin: "",
    operatingMargin: "",
    ebitMargin: "",
    ebitdaMargin: "",
    preTaxProfitMargin: "",
    netProfitMargin: "",
    assetTurnover: "",
    roe: "",
    rote: "",
    roa: "",
    roi: "",
  });

  const clearForm = () => {
    setFormData({
      smeName: "",
      sector: 0,
      term: 0,
      noEmp: 0,
      loanAmount: 0,
      rural: 0,
      interestRate: 0,
      unemploymentRate: 0,
      preCpi: 0,
      prevIpr: 0,
      curRatio: 0,
      debtCapital: 0,
      debtEquity: 0,
      grossMargin: 0,
      operatingMargin: 0,
      ebitMargin: 0,
      ebitdaMargin: 0,
      preTaxProfitMargin: 0,
      netProfitMargin: 0,
      assetTurnover: 0,
      roe: 0,
      rote: 0,
      roa: 0,
      roi: 0,
    });
    setPageState(1);
    setPrediction({});
    setShowDefault(false);
  };

  const getDefault = () => {
    setShowDefault(true);
  };

  const handleRuralChange = (event) => {
    const { checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      rural: checked ? 1 : 0,
    }));
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    if (name == "smeName") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: newValue,
      }));
    } else if (!isNaN(parseFloat(value))) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: parseFloat(newValue),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: newValue,
      }));
    }
  };

  const goBack = () => {
    setPageState(1);
    setShowDefault(false);
  };

  const validate = () => {
    setIsError(false);
    Object.entries(formData).map(([key, value]) => {
      console.log(key, value, typeof value);
      if (key == "smeName") {
        if (typeof value === "string") {
          setFormError((prevData) => ({
            ...prevData,
            [key]: "",
          }));
        } else {
          setIsError(true);
          setFormError((prevData) => ({
            ...prevData,
            [key]: "SME Name should be a string",
          }));
        }
      } else if (key == "loanAmount") {
        if (typeof value === "string") {
          setIsError(true);
          setFormError((prevData) => ({
            ...prevData,
            [key]: "Loan amount should be a number",
          }));
        } else if (parseFloat(value) <= 0) {
          setIsError(true);
          setFormError((prevData) => ({
            ...prevData,
            [key]: "Loan amount should be greater than 0",
          }));
        } else {
          setFormError((prevData) => ({
            ...prevData,
            [key]: "",
          }));
        }
      } else if (typeof value != "number" || isNaN(parseFloat(value))) {
        setIsError(true);
        setFormError((prevData) => ({
          ...prevData,
          [key]: `${key} should be a number`,
        }));
      } else {
        setFormError((prevData) => ({
          ...prevData,
          [key]: "",
        }));
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // validate();
    // console.log(formError, "form error");
    // console.log(isError, "is error");

    let data = {
      sme_name: formData.smeName,
      term: parseInt(formData.term),
      sector: parseInt(formData.sector),
      no_emp: parseInt(formData.noEmp),
      loan_amount: parseFloat(formData.loanAmount),
      rural: parseInt(formData.rural),
      interest_rate: parseFloat(formData.interestRate),
      unemployment_rate: parseFloat(formData.unemploymentRate),
      prev_cpi: parseFloat(formData.preCpi),
      prev_ipr: parseFloat(formData.prevIpr),
      cur_ratio: parseFloat(formData.curRatio),
      debt_capital: parseFloat(formData.debtCapital),
      debt_equity: parseFloat(formData.debtEquity),
      gross_marging: parseFloat(formData.grossMargin),
      operating_margin: parseFloat(formData.operatingMargin),
      ebit_margin: parseFloat(formData.ebitMargin),
      ebitda_margin: parseFloat(formData.ebitdaMargin),
      pre_tax_profit: parseFloat(formData.preTaxProfitMargin),
      net_profit_margin: parseFloat(formData.netProfitMargin),
      asset_turnover: parseFloat(formData.assetTurnover),
      roe: parseFloat(formData.roe),
      rote: parseFloat(formData.rote),
      roa: parseFloat(formData.roa),
      roi: parseFloat(formData.roi),
    };

    // Access captured form data from the state
    console.log(data);

    if (!isError) {
      axios
        .post(BASE_API_URI + "/SmeDefault", data, { verify: false })
        .then((response) => {
          setPrediction(response.data);
          setPageState(2);
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error, "error happened");
        });
    }
  };

  return (
    <>
      {pageState === 1 ? (
        <div>
          <h2>SmeForm</h2>
          <form onSubmit={handleSubmit} id="smeForm">
            <fieldset>
              <legend>SME Information</legend>
              <label> SME Name: </label>
              <input
                type="text"
                name="smeName"
                value={formData.smeName}
                onChange={handleInputChange}
              />
              <span className="formError">{formError.smeName}</span>
              <br />
              <label>Sector: </label>
              <select id="sector" name="sector" onChange={handleInputChange}>
                <option value="">Select</option>
                <option value="11">
                  Agriculture, forestry, fishing and hunting
                </option>
                <option value="42">Wholesale trade</option>
                <option value="22">Utilities</option>
                <option value="23">Construction</option>
                <option value="31">Manufacturing</option>
                <option value="44">Retail trade</option>
                <option value="48">Transportation and warehousing</option>
                <option value="51">Information</option>
                <option value="52">Finance and insurance</option>
                <option value="55">
                  Management of companies and enterprises
                </option>
                <option value="56">
                  Administrative and support and waste management and
                  remediation services
                </option>
                <option value="61">Educational services</option>
                <option value="62">Health care and social assistance</option>
                <option value="71">Arts, entertainment, and recreation</option>
                <option value="72">Accommodation and food services</option>
                <option value="81">Other</option>
              </select>

              <br />
              <label>Number of Employees: </label>
              <input
                type="text"
                name="noEmp"
                value={formData.noEmp}
                onChange={handleInputChange}
              />
              <span className="formError">{formError.noEmp}</span>
              <br />
              <label>Rural: </label>
              <input
                type="checkbox"
                name="rural"
                checked={formData.rural}
                onChange={handleRuralChange}
              />
            </fieldset>
            <fieldset>
              <legend>Loan Information</legend>
              <label>Loan loanAmount: </label>
              <input
                type="text"
                name="loanAmount"
                value={formData.loanAmount}
                onChange={handleInputChange}
              />
              <br />
              <label>Loan Term: </label>
              <input
                type="text"
                name="term"
                value={formData.term}
                onChange={handleInputChange}
              />
              <br />
              <label>Interest Rate: </label>
              <input
                type="text"
                name="interestRate"
                value={formData.interestRate}
                onChange={handleInputChange}
              />
            </fieldset>
            <fieldset>
              <legend>Macro Economic Indicators</legend>
              <label>Unemployement Rate: </label>
              <input
                type="text"
                name="unemploymentRate"
                value={formData.unemploymentRate}
                onChange={handleInputChange}
              />
              <br />
              <label>Previous CPI: </label>
              <input
                type="text"
                name="preCpi"
                value={formData.preCpi}
                onChange={handleInputChange}
              />
              <br />
              <label>Previous Industrial Production Rate: </label>
              <input
                type="text"
                name="prevIpr"
                value={formData.prevIpr}
                onChange={handleInputChange}
              />
            </fieldset>
            <fieldset>
              <legend>Financial Indicators</legend>
              <label>Current Ratio: </label>
              <input
                type="text"
                name="curRatio"
                value={formData.curRatio}
                onChange={handleInputChange}
              />
              <br />
              <label>Debt/Capital Ratio: </label>
              <input
                type="text"
                name="debtCapital"
                value={formData.debtCapital}
                onChange={handleInputChange}
              />
              <br />
              <label>Debt/Equity Ratio: </label>
              <input
                type="text"
                name="debtEquity"
                value={formData.debtEquity}
                onChange={handleInputChange}
              />
              <br />
              <label>Gross Profit Margin: </label>
              <input
                type="text"
                name="grossMargin"
                value={formData.grossMargin}
                onChange={handleInputChange}
              />
              <br />
              <label>Operating Margin: </label>
              <input
                type="text"
                name="operatingMargin"
                value={formData.operatingMargin}
                onChange={handleInputChange}
              />
              <br />
              <label>EBIT Margin: </label>
              <input
                type="text"
                name="ebitMargin"
                value={formData.ebitMargin}
                onChange={handleInputChange}
              />
              <br />
              <label>EBITDA Margin: </label>
              <input
                type="text"
                name="ebitdaMargin"
                value={formData.ebitdaMargin}
                onChange={handleInputChange}
              />
              <br />
              <label>Loan loanAmount: </label>
              <input
                type="text"
                name="preTaxProfitMargin"
                value={formData.preTaxProfitMargin}
                onChange={handleInputChange}
              />
              <br />
              <label>Net Profit Margin: </label>
              <input
                type="text"
                name="netProfitMargin"
                value={formData.netProfitMargin}
                onChange={handleInputChange}
              />
              <br />
              <label>Asset Turnover: </label>
              <input
                type="text"
                name="assetTurnover"
                value={formData.assetTurnover}
                onChange={handleInputChange}
              />
              <br />
              <label>ROE: </label>
              <input
                type="text"
                name="roe"
                value={formData.roe}
                onChange={handleInputChange}
              />
              <br />
              <label>Return on Tangible Equity: </label>
              <input
                type="text"
                name="rote"
                value={formData.rote}
                onChange={handleInputChange}
              />
              <br />
              <label>ROA: </label>
              <input
                type="text"
                name="roa"
                value={formData.roa}
                onChange={handleInputChange}
              />
              <br />
              <label>ROI: </label>
              <input
                type="text"
                name="roi"
                value={formData.roi}
                onChange={handleInputChange}
              />
            </fieldset>
            <input type="reset" onClick={clearForm}></input>
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : pageState === 2 ? (
        <div>
          <h1>{prediction.sme}</h1>
          <h1>{prediction.predictions.risk_level}</h1>
          <h1>{prediction.predictions.credit_risk}</h1>
          {/* button to get default prediction */}
          {prediction.predictions.risk_level === 1 ? (
            <button onClick={getDefault}>Get default prediction</button>
          ) : (
            <></>
          )}
          {/* show default or not */}
          {showDefault ? <h1>{prediction.predictions.default}</h1> : <></>}
          {/* button to go back */}
          <button onClick={goBack}>Back</button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
