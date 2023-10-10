import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { DiscountCode } from "./DiscountCode";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

global.navigator = {
  clipboard: {
    writeText: jest.fn(),
    readText: jest.fn(),
    read: jest.fn(),
    removeEventListener: jest.fn(),
    write: jest.fn(),
    addEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  },
} as any;

describe("DiscountCode", () => {
  it("should render the correct components", () => {
    const code = "TESTCODE";

    render(<DiscountCode code={code} />);

    const codeTitleElement = screen.getByText("CODE:");
    expect(codeTitleElement).toBeInTheDocument();

    const codeElement = screen.getByText(code);
    expect(codeElement).toBeInTheDocument();

    const copiedElement = screen.queryByText("Copied to clipboard");
    expect(copiedElement).not.toBeInTheDocument();
  });

  it("should show the copied message when the code is copied", async () => {
    const user = userEvent.setup();
    const code = "TESTCODE";

    render(<DiscountCode code={code} />);

    const codeElement = screen.getByText(code);
    await user.click(codeElement);
    
    await act(async () => {
      const copiedElement = screen.getByText("Copied to clipboard");
      expect(copiedElement).toBeInTheDocument();
    })
  });
});
