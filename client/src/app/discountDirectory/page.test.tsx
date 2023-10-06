import { DiscountDirectory } from "@prisma/client";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import discountDirectory from "./page";
import Discount from "@/models/Discount";

jest.mock("next/dist/client/components/headers", () => ({
  headers: () => ({
    get: () => "1",
  }),
}));

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

jest.mock("../../models/Discount", () => ({
  getDiscounts: jest.fn(() => Promise.resolve([[mockDiscount], ""])),
}));

describe("discountDirectory", () => {
  it("should render the correct components when discounts are found", async () => {

    render(await discountDirectory());

    const pageHeaderElement = screen.getByText("DISCOUNT DIRECTORY");
    expect(pageHeaderElement).toBeInTheDocument();

    const discountTileElements = screen.getByTestId("discount-tile")
    expect(discountTileElements).toBeInTheDocument()

    const addDiscountElement = screen.queryByTestId("add-discount");
    expect(addDiscountElement).toBeNull();
  });

  it("should render an error message if no discounts are found", async () => {
    (Discount.getDiscounts as any).mockReturnValueOnce(Promise.resolve([null, "Discounts not found."]))
    render(await discountDirectory());

    const pageHeaderElement = screen.getByText("DISCOUNTS NOT FOUND");
    expect(pageHeaderElement).toBeInTheDocument();

    const errorMessageElement = screen.getByText("Err: Discounts not found.");
    expect(errorMessageElement).toBeInTheDocument();
  });
});
