import AboutOurClub from "./page";

describe("AboutOurClub component", () => {
  it("should render the page header", () => {
    const component = <AboutOurClub />;
    cy.mount(component);

    cy.get("h1").contains("ABOUT OUR CLUB");
  });

  it("should render the first section of content", () => {
    const component = <AboutOurClub />;
    cy.mount(component);

    cy.get("section").contains(
      "The Reading Corner is a dedicated organisation committed to creating diverse and meaningful literary opportunities and experiences within our community."
    );
  });

  it("should render the second section of content", () => {
    const component = <AboutOurClub />;
    cy.mount(component);

    cy.get("section:nth-of-type(2)").contains(
      "We envision a world where literacy is the catalyst for change. We're here to make a difference."
    )

    cy.get("section:nth-of-type(2) p").contains(
      "The Reading Corner is a dedicated organisation that strives to bridge the literacy gap among marginalized youth in schools, hospitals,"
    )
  });

  it("should render the third section of content", () => {
    const component = <AboutOurClub />;
    cy.mount(component);

    cy.get("section:last-child p").contains(
      "The Reading Corner is an ambitious non-profit organization founded on the belief that literature has the power to change the world."
    );
  });

  it("should render the image in the third section", () => {
    const component = <AboutOurClub />;
    cy.mount(component);

    cy.get("img").should("have.attr", "alt", "our goals photo");
  });

  it("should render the sign up for news button", () => {
    const component = <AboutOurClub />;
    cy.mount(component);

    cy.get(`a`).contains("SIGN UP FOR NEWS AND OPPORTUNITIES");
  });

  it("should render the learn more button", () => {
    const component = <AboutOurClub />;
    cy.mount(component);

    cy.get("a").contains("Learn more about our strategy");
  });
});
