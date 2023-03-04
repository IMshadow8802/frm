import React, { useState, useEffect } from "react";
import axios from "axios";
import "./form1.css";

const Form1 = () => {
  const [countryData, setCountryData] = useState([]);
  const [surveyRate1Data, setSurveyRate1Data] = useState([]);
  const [surveyRate2Data, setSurveyRate2Data] = useState([]);
  const [selectedValues, setSelectedValues] = useState({
    countryId: "",
    country: "",
    mode: "",
    sl: "",
    perc: "",
    rate: "",
  });

  const handleSelect = (event) => {
    const { name, value } = event.target;
    if (name === "option1") {
      const [countryId, country] = value.split(",");
      setSelectedValues((prevState) => ({
        ...prevState,
        countryId,
        country,
      }));
    } else {
      setSelectedValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(
        `http://localhost:5555/api/get/tblSurveyRate?country=${selectedValues.countryId}&mode=${selectedValues.mode}&sl=${selectedValues.sl}&perc=${selectedValues.perc}`
      );

      setSelectedValues((prevState) => ({
        ...prevState,
        rate: response.data,
      }));

      console.log("Selected Country Id:", selectedValues.countryId);
      console.log("Selected SL:", selectedValues.sl);
      console.log("Selected PERC:", selectedValues.perc);
      console.log("selected Mode", selectedValues.mode);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const loadCountryData = async () => {
      const response = await axios.get(
        "http://localhost:5555/api/get/tblCountry"
      );
      setCountryData(response.data);
    };

    const loadSurveyRate1Data = async () => {
      const response = await axios.get(
        "http://localhost:5555/api/get/tblSurveyRate1"
      );
      setSurveyRate1Data(response.data);
    };

    const loadSurveyRate2Data = async () => {
      const response = await axios.get(
        "http://localhost:5555/api/get/tblSurveyRate2"
      );
      setSurveyRate2Data(response.data);
    };

    loadCountryData();
    loadSurveyRate1Data();
    loadSurveyRate2Data();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="form">
      <label className="label">
        Country:
        <select
          name="option1"
          value={selectedValues.option1}
          onChange={handleSelect}
          className="select"
        >
          <option value="">Select a country</option>
          {countryData.map((country) => (
            <option key={country.description} value={`${country.id}`}>
              {country.description}
            </option>
          ))}
        </select>
      </label>
      <label className="label">
        Mode:
        <select
          name="mode"
          value={selectedValues.mode}
          onChange={handleSelect}
          className="select"
        >
          <option value="">Select a mode</option>
          <option value="B2B">B2B</option>
          <option value="B2C">B2C</option>
        </select>
      </label>
      <label className="label">
        Survey Length:
        <select
          name="sl"
          value={selectedValues.option2}
          onChange={handleSelect}
          className="select"
        >
          <option value="">Select a Survey Length</option>
          {surveyRate1Data.map((rate) => (
            <option key={rate.description} value={rate.description}>
              {rate.description}
            </option>
          ))}
        </select>
      </label>
      <label className="label">
        Percentage:
        <select
          name="perc"
          value={selectedValues.option3}
          onChange={handleSelect}
          className="select"
        >
          <option value="">Select a Percentage</option>
          {surveyRate2Data.map((rate) => (
            <option key={rate.description} value={rate.description}>
              {rate.description}
            </option>
          ))}
        </select>
      </label>
      <label className="label">
        Rate:
        <input
          type="text"
          name="rate"
          value={selectedValues.rate}
          onChange={handleSelect}
          className="input"
        />
      </label>
      <button type="submit" className="button">
        Submit
      </button>
    </form>
  );
};

export default Form1;
