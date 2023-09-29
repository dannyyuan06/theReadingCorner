import { Field } from "./Field";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { isCorrectType } from "./credentials/Form";
import '@testing-library/jest-dom'
import { usernameFormValidation } from "@/lib/validation/UsernameForm";
import { passwordValidation } from "@/lib/validation/Password";

const isCorrectMockTrue:isCorrectType = {
  username: [true, ""],
  email: [true, ""],
  firstName: [true, ""],
  lastName: [true, ""],
  password: [true, ""],
  confirmPassword: [true, ""],
  description: [true, ""]
}

const isCorrectMockFalse:isCorrectType = {
  username: [false, "An error occured"],
  email: [false, "An error occured"],
  firstName: [false, "An error occured"],
  lastName: [false, "An error occured"],
  password: [false, "An error occured"],
  confirmPassword: [false, "An error occured"],
  description: [false, "An error occured"]
}

const formDataTest = {
  username: "johndoe20",
  email: "johndoe@email.com",
  firstName: "John",
  lastName: "Doe",
  description: "",
  password: "Password0!",
  confirmPassword: "Password0!",
}

const name = "username";
const type = "text";

describe("Field component", () => {
  it("should render the Field component with the correct label", () => {

    render(<Field name={name} formData={formDataTest} setFormData={jest.fn()} type={type} isCorrect={isCorrectMockTrue}/>);

    expect(screen.getByLabelText("Username:")).toBeInTheDocument();
  });

  it("should render the Field component with the correct input type", () => {

    render(<Field name={name} formData={formDataTest} setFormData={jest.fn()} type={type} isCorrect={isCorrectMockTrue}/>);

    expect(screen.getByRole("textbox")).toHaveAttribute("type", type);
  });

  it("should render the Field component with the correct validation message for long username", async () => {

    render(<Field name={name} formData={formDataTest} setFormData={jest.fn()} validation={usernameFormValidation} type={type} isCorrect={isCorrectMockFalse} />);

    const input = screen.getByTestId("input");
    fireEvent.change(input, {target: {value: "awehaqewhwehaerhaerha"}});

    await waitFor(() => {
      expect(screen.getByText("Username must be between 8 and 16 valid characters.")).toBeInTheDocument();
    });
    
  });

  it("should render the Field component with the correct validation message for ", async () => {

    render(<Field name={name} formData={formDataTest} setFormData={jest.fn()} validation={usernameFormValidation} type={type} isCorrect={isCorrectMockFalse} />);

    const input = screen.getByTestId("input");
    fireEvent.change(input, {target: {value: "a"}});

    await waitFor(() => {
      expect(screen.getByText("Username must be between 8 and 16 valid characters.")).toBeInTheDocument();
    });
    
  });

  it("should render the Field component with the correct validation message for non alphanumeric usernames", async () => {

    render(<Field name={name} formData={formDataTest} setFormData={jest.fn()} validation={usernameFormValidation} type={type} isCorrect={isCorrectMockFalse} />);

    const input = screen.getByTestId("input");
    fireEvent.change(input, {target: {value: "********"}});

    await waitFor(() => {
      expect(screen.getByText("Username can only contain alphanumeric characters and underscores.")).toBeInTheDocument();
    });
    
  });

  it("should render the Field component with the correct validation message for first character as an non alphabetical username", async () => {

    render(<Field name={name} formData={formDataTest} setFormData={jest.fn()} validation={usernameFormValidation} type={type} isCorrect={isCorrectMockFalse} />);

    const input = screen.getByTestId("input");
    fireEvent.change(input, {target: {value: "1alksjdb"}});

    await waitFor(() => {
      expect(screen.getByText("The first character of the username must be an alphabetic character.")).toBeInTheDocument();
    });

  });

  it("should render the Field component with the correct validation message for less than 8 character password", async () => {

    render(<Field name={name} formData={formDataTest} setFormData={jest.fn()} validation={passwordValidation} type={type} isCorrect={isCorrectMockFalse} />);

    const input = screen.getByTestId("input");
    fireEvent.change(input, {target: {value: "a"}});

    await waitFor(() => {
      expect(screen.getByText("Password must be between 8 and 16 valid characters.")).toBeInTheDocument();
    });
    
  });

  it("should render the Field component with the correct validation message for password with no numbers", async () => {

    render(<Field name={name} formData={formDataTest} setFormData={jest.fn()} validation={passwordValidation} type={type} isCorrect={isCorrectMockFalse} />);

    const input = screen.getByTestId("input");
    fireEvent.change(input, {target: {value: "aqueafhuashd"}});

    await waitFor(() => {
      expect(screen.getByText("Password must contain at least one numerical character.")).toBeInTheDocument();
    });
    
  });

  it("should render the Field component with the correct validation message for password with no alphabetical characters", async () => {

    render(<Field name={name} formData={formDataTest} setFormData={jest.fn()} validation={passwordValidation} type={type} isCorrect={isCorrectMockFalse} />);

    const input = screen.getByTestId("input");
    fireEvent.change(input, {target: {value: "129837581285"}});

    await waitFor(() => {
      expect(screen.getByText("Password must contain at least one alphabetical character.")).toBeInTheDocument();
    });
    
  });

  // The rest of the validation tests are in the validation directory

  it("should call the changeHandler function when the input value changes", () => {

    const setFormData = jest.fn()

    render(<Field name={name} formData={formDataTest} setFormData={setFormData} type={type} isCorrect={isCorrectMockTrue}/>);

    const input:HTMLInputElement = screen.getByTestId("input");
    fireEvent.change(input, {target: {value:"johndoe"}})

    expect(setFormData).toBeCalled();
  });

  it("should call the validation function when the input value changes", async () => {
    const validation = jest.fn().mockResolvedValue([true, "Valid username"]);

    render(<Field name={name} formData={formDataTest} setFormData={jest.fn()} type={type} validation={validation} isCorrect={isCorrectMockTrue}/>);

    const input = screen.getByTestId("input");
    fireEvent.change(input, {target: {value:"johndoe"}})

    await waitFor(() => {
      expect(validation).toHaveBeenCalledWith(
        "johndoe"
      );
    });
  });

  it("should update the validation message when the validation function returns a new value", async () => {
    const validation = jest.fn().mockResolvedValue([true, "Valid username"]);

    render(<Field name={name} formData={formDataTest} setFormData={jest.fn()} validation={validation} type={type} isCorrect={isCorrectMockFalse} />);

    const input = screen.getByTestId("input");
    fireEvent.change(input, {target: {value:"johndoe"}})
    await waitFor(() => {
      expect(screen.getByText("Valid username")).toBeInTheDocument();
    });
    
  });
})