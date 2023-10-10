import Register from "./page";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'

jest.mock("next/navigation", () => ({
  useSearchParams: () => ({get: (_:string) => ""}),
}));

describe("Register Component", () => {
  it("should render the Form component with the correct props", () => {
    render(<Register />);
  
    const form = screen.getByTestId("form-wrapper");
    expect(form).toBeInTheDocument();
  })
})
