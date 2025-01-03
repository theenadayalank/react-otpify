export interface OtpInputProps {
  length: number;
  onChange?: (otp: string) => void;
  onSubmit?: (otp: string) => void;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
}
