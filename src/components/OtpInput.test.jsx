import React from "react";
import { render, fireEvent } from "@testing-library/react";
import OtpInput from "./OtpInput";

describe("OtpInput Component", () => {
  it("renders the correct number of inputs", () => {
    const { getAllByRole } = render(<OtpInput length={4} />);
    const inputs = getAllByRole("textbox");
    expect(inputs.length).toBe(4);
  });

  it("calls onChange when values change", () => {
    const handleChange = jest.fn();
    const { getAllByRole } = render(
      <OtpInput length={4} onChange={handleChange} />
    );
    const inputs = getAllByRole("textbox");

    fireEvent.change(inputs[0], { target: { value: "1" } });
    expect(handleChange).toHaveBeenCalledWith("1");
  });

  it("calls onSubmit when all inputs are filled", () => {
    const handleSubmit = jest.fn();
    const { getAllByRole } = render(
      <OtpInput length={4} onSubmit={handleSubmit} />
    );
    const inputs = getAllByRole("textbox");

    fireEvent.change(inputs[0], { target: { value: "1" } });
    fireEvent.change(inputs[1], { target: { value: "2" } });
    fireEvent.change(inputs[2], { target: { value: "3" } });
    fireEvent.change(inputs[3], { target: { value: "4" } });

    expect(handleSubmit).toHaveBeenCalledWith("1234");
  });

  it("handles paste event correctly", () => {
    const handleChange = jest.fn();
    const { getAllByRole } = render(
      <OtpInput length={4} onChange={handleChange} />
    );
    const inputs = getAllByRole("textbox");

    fireEvent.paste(inputs[0], {
      clipboardData: { getData: () => "1234" },
    });

    expect(inputs[0].value).toBe("1");
    expect(inputs[1].value).toBe("2");
    expect(inputs[2].value).toBe("3");
    expect(inputs[3].value).toBe("4");
    expect(handleChange).toHaveBeenCalledWith("1234");
  });

  it("disables inputs when disabled prop is true", () => {
    const { getAllByRole } = render(<OtpInput length={4} disabled />);
    const inputs = getAllByRole("textbox");

    inputs.forEach((input) => {
      expect(input).toBeDisabled();
    });
  });

  it("shows error styles when error prop is true", () => {
    const { getAllByRole, container } = render(<OtpInput length={4} error />);
    const inputs = getAllByRole("textbox");

    inputs.forEach((input) => {
      expect(input).toHaveClass("error");
    });

    expect(container.firstChild).toHaveClass("error");
  });
});
