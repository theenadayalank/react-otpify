# react-otpify 🔒✨

`react-otpify` is a customizable and accessible React component for handling OTP (One-Time Password) input. It allows users to input OTPs of a specified length, supports automatic focus management, error handling, and more. It is designed with flexibility, ease of use, and accessibility in mind.

## Features 🚀

- **Customizable Length**: Specify the length of the OTP input field.
- **Focus Management**: Automatically focuses the next input field after entering a digit.
- **Backspace Handling**: Focuses the previous input field when backspace is pressed on an empty field.
- **Paste Support**: Supports pasting OTPs, automatically filling the input fields and focusing the next empty field.
- **Submit on Complete**: Calls the `onSubmit` handler when all OTP fields are filled.
- **Error Handling**: Displays an error style when the `error` prop is `true`.
- **Disabled State**: Disables the OTP input fields when the `disabled` prop is `true`.
- **Custom Placeholder**: Allows customization of the placeholder text.
- **Accessibility**: Includes proper ARIA attributes for better accessibility.

## Installation 📦

To install `react-otpify`, you can use npm or yarn:

```bash
npm install react-otpify
# or
yarn add react-otpify
```

## Usage

### Basic Example 🖥️

```tsx
import React, { useState } from "react";
import OtpInput from "react-otpify";

const App = () => {
  const [otp, setOtp] = useState("");

  const handleOtpChange = (otpString: string) => {
    setOtp(otpString);
  };

  const handleOtpSubmit = (otpString: string) => {
    console.log("OTP Submitted: ", otpString);
  };

  return (
    <div>
      <h2>Enter OTP</h2>
      <OtpInput
        length={6}
        onChange={handleOtpChange}
        onSubmit={handleOtpSubmit}
        placeholder="-"
        error={false}
        disabled={false}
      />
      <p>Entered OTP: {otp}</p>
    </div>
  );
};

export default App;
```

### Props 📋

| Prop          | Type                          | Default | Description                                                        |
| ------------- | ----------------------------- | ------- | ------------------------------------------------------------------ |
| `length`      | `number`                      | `6`     | The length of the OTP input field.                                 |
| `onChange`    | `(otpString: string) => void` | `-`     | A callback function that is called whenever the OTP value changes. |
| `onSubmit`    | `(otpString: string) => void` | `-`     | A callback function that is called when all OTP fields are filled. |
| `placeholder` | `string`                      | `"-"`   | The placeholder text for each OTP input field.                     |
| `error`       | `boolean`                     | `false` | If `true`, applies an error style to the input fields.             |
| `disabled`    | `boolean`                     | `false` | If `true`, disables all OTP input fields.                          |

### Advanced Example

```tsx
import React, { useState } from "react";
import OtpInput from "react-otpify";

const AdvancedApp = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);

  const handleOtpChange = (otpString: string) => {
    setOtp(otpString);
    setError(otpString.length !== 6); // Example of setting error based on OTP length
  };

  const handleOtpSubmit = (otpString: string) => {
    if (otpString === "123456") {
      alert("OTP Verified!");
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div>
      <h2>Advanced OTP Input</h2>
      <OtpInput
        length={6}
        onChange={handleOtpChange}
        onSubmit={handleOtpSubmit}
        placeholder="-"
        error={error}
        disabled={false}
      />
      <p>Entered OTP: {otp}</p>
    </div>
  );
};

export default AdvancedApp;
```

### Accessibility

- **ARIA Attributes**: The component includes `aria-invalid` and `aria-disabled` attributes to improve accessibility for screen readers.
- **Focus Management**: The component automatically manages focus to improve user experience, especially when pasting OTPs or using the backspace key.

### Custom Styling 🎨

You can customize the styles of the OTP input fields by modifying the `OtpInput.css` file. Here's a basic example:

```css
/* OtpInput.css */
.otp-input-container {
  display: flex;
  gap: 10px;
}

.otp-input {
  width: 40px;
  height: 40px;
  text-align: center;
  font-size: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.otp-input:focus {
  border-color: #007bff;
}

.otp-input.error {
  border-color: red;
}

.otp-input[disabled] {
  background-color: #f0f0f0;
  cursor: not-allowed;
}
```

### Customizing the Placeholder

You can customize the placeholder by passing the `placeholder` prop:

```tsx
<OtpInput
  length={6}
  onChange={handleOtpChange}
  onSubmit={handleOtpSubmit}
  placeholder="-"
  error={false}
  disabled={false}
/>
```

### Error Handling

You can show an error state by setting the `error` prop to `true`. This will apply an error style to the input fields:

```tsx
<OtpInput
  length={6}
  onChange={handleOtpChange}
  onSubmit={handleOtpSubmit}
  placeholder="-"
  error={true}
  disabled={false}
/>
```

### Disabling the Inputs

To disable the OTP inputs, simply set the `disabled` prop to `true`:

```tsx
<OtpInput
  length={6}
  onChange={handleOtpChange}
  onSubmit={handleOtpSubmit}
  placeholder="-"
  error={false}
  disabled={true}
/>
```

### Testing 🧪

The component can be tested using Jest. Here's an example of a test case for the component:

```tsx
import { render, fireEvent } from "@testing-library/react";
import OtpInput from "react-otpify";

test("OTP input changes and submits correctly", () => {
  const handleChange = jest.fn();
  const handleSubmit = jest.fn();

  const { getByPlaceholderText } = render(
    <OtpInput
      length={6}
      onChange={handleChange}
      onSubmit={handleSubmit}
      placeholder="-"
    />
  );

  const inputs = Array.from({ length: 6 }).map(
    (_, index) => getByPlaceholderText("-")[index]
  );

  fireEvent.change(inputs[0], { target: { value: "1" } });
  fireEvent.change(inputs[1], { target: { value: "2" } });

  expect(handleChange).toHaveBeenCalledWith("12");
  fireEvent.change(inputs[5], { target: { value: "6" } });

  expect(handleSubmit).toHaveBeenCalledWith("123456");
});
```

## Contributing 🤝

We welcome contributions! To contribute, please fork this repository, create a new branch, and submit a pull request. Be sure to follow the coding standards and include tests for any new features.

## License 📜

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
