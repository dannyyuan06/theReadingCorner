import { render } from "@testing-library/react";
import '@testing-library/jest-dom'
import AboutOurClub from "./page";

describe("AboutOurClub Component", () => {
  it("renders the component without errors", () => {
    const { getByText } = render(<AboutOurClub />);
    
    // Replace with appropriate test assertions
    expect(getByText("ABOUT OUR CLUB")).toBeInTheDocument();
    expect(getByText("We envision a world where literacy is the catalyst for change. We're here to make a difference.")).toBeInTheDocument();
    // Add more assertions as needed
  });
  
  it("matches snapshot", () => {
    const { asFragment } = render(<AboutOurClub />);
    
    // Use Jest's snapshot testing to compare component output with a saved snapshot
    expect(asFragment()).toMatchSnapshot();
  });
});