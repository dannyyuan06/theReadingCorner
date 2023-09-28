import { profileUserAdminTypeTest, profileUserTypeTest } from "@/lib/testingdata/profileUserType";
import { ProfileMini } from "./ProfileMini";
import styles from './ProfileMini.module.css'
import { getClass, getId } from "@/lib/testingdata/getElements";


describe("ProfileMini", () => {

  it("should render the user's profile picture", () => {
    cy.mount(<ProfileMini user={profileUserTypeTest} dateSent="2023-09-28" />);
    const image = cy.get("img");
    image.should("be.visible");
  });

  it("should render the user's username", () => {
      cy.mount(<ProfileMini user={profileUserTypeTest} dateSent="2023-09-28" />);

      const username = cy.get(`.${styles.userName}`);
      username.should("contain", profileUserTypeTest.username);
  });

  it("should render the user's access level if they are an admin", () => {
      cy.mount(<ProfileMini user={profileUserAdminTypeTest} dateSent="2023-09-28" />);

      const adminLabel = cy.get(`.${styles.admin}`);
      adminLabel.should("contain", "ADMIN");
  });

  it("should render the date the message was sent", () => {
      cy.mount(<ProfileMini user={profileUserTypeTest} dateSent="2023-09-28" />);
      const timestamp = getClass(styles.userTimestamp)

      timestamp.should("be.visible");
      timestamp.should("contain", "2023-09-28");
  });

  it("should render a ProfileDropDown", () => {
    cy.mount(<ProfileMini user={profileUserTypeTest} dateSent="2023-09-28" />);
    const tooltip = getClass(styles.tooltip)
    tooltip.should("exist")
  });

});