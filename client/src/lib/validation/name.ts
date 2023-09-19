export const nameValidation = (text: string): [boolean, string] => {
  // is whitespace check
  const nameRegex = /^(\w{1,40}?)$/;
  if (!nameRegex.test(text)) return [false, "Invalid Name"];

  return [true, "Valid"];
};
