import React, { useState } from "react";
import OtpInput from "../../lib";

const OtpifyDemo = () => {
  const [otp, setOtp] = useState(""); // State to hold the OTP value
  const [error, setError] = useState(false); // State to manage error display

  // Handle changes to the OTP input
  const handleOtpChange = (value) => {
    setOtp(value);
    console.log("Current OTP:", value);

    // Clear error state if the user modifies the input
    if (error) setError(false);
  };

  // Handle OTP submission
  const handleOtpSubmit = (value) => {
    console.log("OTP Submitted:", value);

    // Validate OTP
    if (value === "123456") {
      alert("OTP Verified Successfully!");
    } else {
      setError(true);
      alert("Invalid OTP");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>React OTPify Demo</h1>
      <OtpInput
        length={6} // Number of OTP input boxes
        onChange={handleOtpChange} // Triggered on OTP change
        onSubmit={handleOtpSubmit} // Triggered when all inputs are filled
        placeholder="-" // Placeholder for empty inputs
        error={error} // Highlight inputs on error
        disabled={false} // Disable input fields if true
      />
      <p style={{ marginTop: "20px" }}>
        Entered OTP: <strong>{otp}</strong>
      </p>
    </div>
  );
};

export default OtpifyDemo;
