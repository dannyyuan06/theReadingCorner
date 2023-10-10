import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { EditDiscountButton } from "./EditDiscountButton";
import { DiscountDirectory } from "@prisma/client";
import userEvent from "@testing-library/user-event";

const mockDiscount: DiscountDirectory = {
  discountdirectoryid: 12345,
  title: "Test Discount",
  description: "This is a test discount.",
  code: "TESTCODE",
  expireDate: new Date("2023-12-31T23:59:59Z"),
  imageLink: "/images/profile-picture.png",
  startDate: new Date("2023-08-28T23:59:59Z"),
  link: "www.amazon.com",
};

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: jest.fn(),
  }),
}));

global.fetch = jest.fn();

describe("Edit Discount Component", () => {
  it("should render the component correctly", () => {
    render(<EditDiscountButton discountDetails={mockDiscount} />);

    const moreButton = screen.getByTestId("more-button");
    expect(moreButton).toBeInTheDocument();
  });

  it("should render the more button when pressed", async () => {
    const user = userEvent.setup();
    render(<EditDiscountButton discountDetails={mockDiscount} />);

    const moreButton = screen.getByTestId("more-button");
    await user.click(moreButton);

    const editButton = screen.getByText("Edit");
    expect(editButton).toBeInTheDocument();

    const deleteButton = screen.getByText("Delete");
    expect(deleteButton).toBeInTheDocument();
  });

  it("should render the edit popup when edit button is pressed", async () => {
    const user = userEvent.setup();
    render(<EditDiscountButton discountDetails={mockDiscount} />);

    const moreButton = screen.getByTestId("more-button");
    await user.click(moreButton);

    const editButton = screen.getByText("Edit");
    await user.click(editButton);

    const editTitle = screen.getByText("EDIT DISCOUNT");
    expect(editTitle).toBeInTheDocument();
  });

  it("should render the confirmation when delete button is pressed", async () => {
    const user = userEvent.setup();
    render(<EditDiscountButton discountDetails={mockDiscount} />);

    const moreButton = screen.getByTestId("more-button");
    await user.click(moreButton);

    const editButton = screen.getByText("Delete");
    await user.click(editButton);

    const confirmation = screen.getByText("CONFIRMATION");
    expect(confirmation).toBeInTheDocument();
  });

  it("should call the delete endpoint when delete confirm button is pressed", async () => {
    const user = userEvent.setup();
    render(<EditDiscountButton discountDetails={mockDiscount} />);

    const moreButton = screen.getByTestId("more-button");
    await user.click(moreButton);

    const editButton = screen.getByText("Delete");
    await user.click(editButton);

    const confirmation = screen.getByText("Confirm");
    await user.click(confirmation);

    expect(fetch).toBeCalledWith("/api/discountDirectory/12345", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  });
});
