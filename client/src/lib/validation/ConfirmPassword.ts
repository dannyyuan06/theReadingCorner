
const confirmPasswordValidation = (password: string, confirmPassword: string):[boolean, string] => [password === confirmPassword, password === confirmPassword ? "Valid" :"Passwords do not match"]
export default confirmPasswordValidation
