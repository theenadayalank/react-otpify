import React, { useEffect, useRef, useState } from "react";

import { OtpInputProps } from "../types";
import "./OtpInput.scss";

const OtpInput = ({
  length = 6,
  onChange,
  onSubmit,
  placeholder = "-",
  error = false,
  disabled = false,
}: OtpInputProps) => {
  const [otpValues, setOtpValues] = useState<string[]>(Array(length).fill(""));
  const otpRefs = useRef<HTMLInputElement[]>([]);

  const updateOtpValues = (newValues: string[]) => {
    setOtpValues(newValues);
    const otpString = newValues.join("");
    onChange?.(otpString);

    // Call onSubmit when all values are filled
    if (newValues.every((val) => val !== "")) {
      onSubmit?.(otpString);
    }
  };

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    if (!/^\d?$/.test(value)) return; // Allow only single-digit numbers

    const updatedValues = [...otpValues];
    updatedValues[index] = value;
    updateOtpValues(updatedValues);

    if (value && index < length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && !otpValues[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleClick = (index: number) => {
    otpRefs.current[index]?.setSelectionRange(1, 1);
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    const pastedData = event.clipboardData.getData("text").slice(0, length);
    const updatedValues = [...otpValues];

    pastedData.split("").forEach((char, idx) => {
      if (/^\d$/.test(char) && idx < length) {
        updatedValues[idx] = char;
      }
    });

    updateOtpValues(updatedValues);

    // Focus the next empty input after pasting
    const firstEmptyIndex = updatedValues.findIndex((val) => val === "");
    if (firstEmptyIndex !== -1) {
      otpRefs.current[firstEmptyIndex]?.focus();
    } else {
      otpRefs.current[length - 1]?.focus();
    }
  };

  useEffect(() => {
    if (!disabled) {
      otpRefs.current[0]?.focus();
    }
  }, [disabled]);

  return (
    <div className={`otp-input-container ${error ? "error" : ""}`}>
      {otpValues.map((value: any, index: any) => (
        <input
          key={`otp-input-${index}`}
          type="text"
          className={`otp-input ${error ? "error" : ""}`}
          ref={(el) => (otpRefs.current[index] = el! as any)}
          value={value}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onClick={() => handleClick(index)}
          onPaste={handlePaste}
          maxLength={1}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={error}
          aria-disabled={disabled}
        />
      ))}
    </div>
  );
};

export default OtpInput;
