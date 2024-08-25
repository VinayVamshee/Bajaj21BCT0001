import React, { useState } from "react";
import axios from "axios";

function Home() {
  const [jsonInput, setJsonInput] = useState(""); // State to handle JSON input
  const [responseData, setResponseData] = useState(null); // State to handle response data
  const [error, setError] = useState(""); // State to handle errors
  const [selectedOptions, setSelectedOptions] = useState([]); // State to handle selected dropdown options

  // Handle change in JSON input
  const handleJsonInputChange = (event) => {
    setJsonInput(event.target.value);
  };

  // POST method to send data to the backend
  const postRequest = async (data) => {
    try {
      const response = await axios.post("https://bajaj-server-orpin.vercel.app/bfhl", data); // Sending parsed JSON
      setResponseData(response.data); // Set response data from backend
    } catch (err) {
      setError("Invalid JSON or server error.");
    }
  };

  // Handle form submit to trigger POST request
  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    setError("");
    setResponseData(null);

    try {
      const parsedInput = JSON.parse(jsonInput); // Parse JSON input
      if (parsedInput.data) {
        postRequest(parsedInput); // Call POST method with parsed JSON data
      } else {
        setError("Invalid JSON format. The 'data' field is required.");
      }
    } catch (err) {
      setError("Invalid JSON format. Please check the JSON syntax.");
    }
  };

  // Handle change in dropdown options
  const handleSelectChange = (event) => {
    const value = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedOptions(value); // Update selected options in state
  };

  // Function to filter response data based on selected options
  const filterResponseData = (responseData) => {
    const filteredData = {};
    if (selectedOptions.includes("Numbers")) {
      filteredData.numbers = responseData.numbers;
    }
    if (selectedOptions.includes("Alphabets")) {
      filteredData.alphabets = responseData.alphabets;
    }
    if (selectedOptions.includes("Highest lowercase alphabet")) {
      filteredData.highest_lowercase_alphabet = responseData.highest_lowercase_alphabet;
    }
    return filteredData; // Return the filtered response based on options
  };

  return (
    <div className="Home">
      <h1>API Input</h1>
      <form onSubmit={handleFormSubmit}>
        <textarea
          value={jsonInput}
          onChange={handleJsonInputChange}
          placeholder='Enter JSON here (e.g., {"data": ["2", "4", "5", "92"]})'
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p className="error">{error}</p>} {/* Display error if any */}
      {responseData && (
        <>
          <select multiple onChange={handleSelectChange}>
            <option value="Numbers">Numbers</option>
            <option value="Alphabets">Alphabets</option>
            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
          </select>
          <pre>{JSON.stringify(filterResponseData(responseData), null, 2)}</pre> {/* Display filtered data */}
        </>
      )}
    </div>
  );
}

export default Home;
