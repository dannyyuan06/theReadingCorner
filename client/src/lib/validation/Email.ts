export const emailValidation = (text: string): [boolean, string] => {
  // is email check

  // [^<>()[\]\.,;:\s@\"] chars not allowed in email
  // (\.[^<>()[\]\.,;:\s@\"]+) More than one char after a . like john.doe@email.com not john.@email.com
  // (\".+\")) Allow for quotes because of some raw string parsing
  // @ the @ symbol is definitely needed
  // ([^<>()[\]\.,;:\s@\"]+\.) Anything that doesn't match that class plus a dot
  // [^<>()[\]\.,;:\s@\"]{2,} Again the same class with at least two characters
  const emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
  if (!emailRegex.test(text)) return [false, "Invalid Email Address"];

  return [true, "Valid"];
};
