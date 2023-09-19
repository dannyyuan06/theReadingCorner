const confirmPasswordValidation = (
  password: string,
  confirmPassword: string
): [boolean, string] => [
  password === confirmPassword, // Return expression bool
  // Return message
  password === confirmPassword ? "Valid" : "Passwords do not match",
];
export default confirmPasswordValidation;
