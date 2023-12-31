import "@testing-library/jest-dom";
import { EditDiscount } from "./EditDiscount";
import { fireEvent, render, screen } from "@testing-library/react";
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
}))

global.fetch = jest.fn();

describe("EditDiscount", () => {
  it("should render the correct components", () => {

    render(<EditDiscount discountDetails={mockDiscount} setClicked={jest.fn()}/>);

    const popupElement = screen.getByTestId("popup");
    expect(popupElement).toBeInTheDocument();

    const fieldElements = screen.getAllByRole("textbox");
    expect(fieldElements.length).toEqual(4);

    const uploadImageElement = screen.getByTestId("upload-image");
    expect(uploadImageElement).toBeInTheDocument();
  });

  it("should submit the form when the confirm button is clicked", async () => {
    const user = userEvent.setup();
    render(<EditDiscount discountDetails={mockDiscount} setClicked={jest.fn()} />);

    const confirmButtonElement = screen.getByText("Confirm")
    expect(confirmButtonElement).toBeInTheDocument();

    const fieldElements = screen.getAllByRole("textbox");
    fireEvent.input(fieldElements[0], {target: {value: "Tests"}});
    fireEvent.input(fieldElements[1], {target: {value: "Tests"}});
    fireEvent.input(fieldElements[2], {target: {value: "Tests"}});
    fireEvent.input(fieldElements[3], {target: {value: "Tests"}});

    await user.click(confirmButtonElement)

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `/api/discountDirectory/${mockDiscount.discountdirectoryid}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: "{\"title\":\"Tests\",\"description\":\"Tests\",\"code\":\"Tests\",\"expireDate\":\"2023-12-31T23:59:59.000Z\",\"imageLink\":\"/images/profile-picture.png\",\"startDate\":\"2023-08-28T23:59:59.000Z\",\"link\":\"Tests\"}"
      }
    );
  });
});