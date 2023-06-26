import React, { useState } from "react";

const SmesForm1 = () => {
  // Initialize state variables
  const [checkboxValues, setCheckboxValues] = useState({
    checkbox1: false,
    checkbox2: false,
  });
  const [selectedOption, setSelectedOption] = useState("");
  const [textInput, setTextInput] = useState("");

  // Event handlers for form inputs
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [name]: checked,
    }));
  };

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleTextChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Access captured form data from the state
    const formData = {
      checkboxes: checkboxValues,
      dropdown: selectedOption,
      text: textInput,
    };

    // Do something with the form data
    console.log(formData);
  };

  return (
    <div className="SmesForm">
      <form onSubmit={handleSubmit}>
        <h2>My Form</h2>
        <label>
          Checkbox 1
          <input
            type="checkbox"
            name="checkbox1"
            checked={checkboxValues.checkbox1}
            onChange={handleCheckboxChange}
          />
        </label>
        <label>
          Checkbox 2
          <input
            type="checkbox"
            name="checkbox2"
            checked={checkboxValues.checkbox2}
            onChange={handleCheckboxChange}
          />
        </label>

        <label>
          Dropdown
          <select value={selectedOption} onChange={handleDropdownChange}>
            <option value="">Select an option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </label>

        <label>
          Text Input
          <input type="text" value={textInput} onChange={handleTextChange} />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SmesForm;
