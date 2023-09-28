import { AStatistic } from "./AStatistic";
import styles from './AStatistic.module.css'

describe("AStatistic component", () => {
  it("should render the title and value", () => {
    const component = <AStatistic title="Title" value="Value" />;
    cy.mount(component);

    cy.get(`div.${styles.key}`).contains("TITLE");
    cy.get(`div.${styles.value}`).contains("Value");
  });

  it("should render a horizontal rule before the component", () => {
    const component = <AStatistic title="Title" value="Value" />;
    cy.mount(component);

    cy.get("hr").should("exist");
  });

  it("should apply the correct CSS classes to the component", () => {
    const component = <AStatistic title="Title" value="Value" />;
    cy.mount(component);

    cy.get(`div.${styles.container}`).should("exist");
    cy.get(`div.${styles.key}`).should("exist");
    cy.get(`div.${styles.value}`).should("exist");
  });
});
