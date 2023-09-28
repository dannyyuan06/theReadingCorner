import { UploadImage } from "./UploadImage";
import styles from "./UploadImage.module.css"

describe("UploadImage", () => {
  it("should upload an image", () => {
    // Mount the UploadImage component in Cypress
    cy.mount(<UploadImage upload={cy.stub().as("upload")} size={500} aspectRatio={1.45}/>);

    // Simulate a file upload event on the input element
    const input = cy.get("input[type='file']");
    input.selectFile("./public/images/TRC_Logo_Primary_RGB_Lge.png", {force: true});

    // Assert that the image is displayed
    cy.get(`.${styles.dragDrop} > img`).should("be.visible");

    // Check if the upload function is called
    cy.get("@upload").should("have.been.called")
  });
});
