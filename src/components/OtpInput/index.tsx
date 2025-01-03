import { useState } from "react";
import { OtpInputProps } from "./types";

const OtpInput = ({ length, hanldeOnSubmit }: OtpInputProps) => {
  const [otp, setOtp] = useState(Array(length).fill(""));

  const handleOnChange = (index: any, e: any) => {
    const val = e.target.value;

    console.log(val, e);

    let newOtp = [...otp];

    newOtp[index] = val.subtring(1, 1);
    setOtp(newOtp);
  };

  const handleOnKeyDown = () => {};

  const handleOnFocus = () => {};

  return otp.map((value, index) => {
    return (
      <input
        key={`otp-input-${index}`}
        type="text"
        value={value}
        onChange={(e) => handleOnChange(index, e)}
        onKeyDown={handleOnKeyDown}
        onFocus={handleOnFocus}
      />
    );
  });
};

export default OtpInput;
