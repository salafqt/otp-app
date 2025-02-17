import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const OTPInput = ({ length = 6, onSubmit }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (index, e) => {
    const value = e.target.value.replace(/\D/g, ""); // Ensure only numbers
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);
    const newOtp = pasteData
      .split("")
      .concat(new Array(length - pasteData.length).fill(""));
    setOtp(newOtp);

    newOtp.forEach((num, i) => {
      if (inputRefs.current[i]) {
        inputRefs.current[i].value = num;
      }
    });
    inputRefs.current[Math.min(pasteData.length, length - 1)].focus();
  };

  const handleFocus = (index) => {
    inputRefs.current[index].select();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(otp.join(""));
  };

  return (
    <div className="container text-center">
      <h3>Enter OTP</h3>
      <form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-center">
          {otp.map((value, index) => (
            <input
              key={index}
              type="text"
              className="otp-input form-control text-center mx-1"
              maxLength="1"
              inputMode="numeric"
              value={value}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              onFocus={() => handleFocus(index)}
              ref={(el) => (inputRefs.current[index] = el)}
            />
          ))}
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Verify OTP
        </button>
      </form>
    </div>
  );
};

const App = () => {
  const handleOtpSubmit = (otp) => {
    alert("Entered OTP: " + otp);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <OTPInput length={6} onSubmit={handleOtpSubmit} />
    </div>
  );
};

export default App;
