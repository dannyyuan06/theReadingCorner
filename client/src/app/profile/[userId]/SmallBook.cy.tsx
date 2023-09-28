// cypress/components/SmallBook.spec.js

import { userBookWithBook } from "@/models/UserBook";
import { SmallBook } from "./SmallBook";
import styles from './SmallBook.module.css'

const userbookTest:userBookWithBook = {
  book: {
    bookid: "3H7ZDQAAQBAJ",
    author: "David A. Vise",
    averageRating: -1,
    description: "The Google Story is the definitive account of one of the most remarkable organizations of our time.",
    pageCount: 20,
    bookPicture: "/images/book-placeholder.png",
    title: "The Google Story"
  },
  dateFinished: new Date(1695883140660),
  dateStarted: new Date(818035920000),
  page: 1,
  score: 10,
  status: 2,
  username: "dannyyuan",
  bookid: "3H7ZDQAAQBAJ"
}

describe("SmallBook component", () => {
  it("should render the book cover image", () => {
    const component = <SmallBook userbook={userbookTest} />;
    cy.mount(component);

    cy.get("img").should("have.attr", "alt", "book placeholder");
  });

  it("should render the book title", () => {
    const component = <SmallBook userbook={userbookTest} />;
    cy.mount(component);

    cy.get(`h3.${styles.title}`).should("exist");
    cy.get(`h3.${styles.title}`).contains("The Google Story");

  });

  it("should render the book author", () => {
    const component = <SmallBook userbook={userbookTest} />;
    cy.mount(component);

    cy.get("h3:contains('AUTHOR:')").should("exist");
    cy.get("h3:contains('AUTHOR:')").contains("AUTHOR: David A. Vise");
  });

  it("should render the start date", () => {
    const component = <SmallBook userbook={userbookTest} />;
    cy.mount(component);

    cy.get("h3:contains('START DATE:')").should("exist");
    cy.get("h3:contains('START DATE:')").contains("START DATE: Dec 04 1995");
  });

  it("should render the finish date", () => {
    const component = <SmallBook userbook={userbookTest} />;
    cy.mount(component);

    cy.get("h3:contains('FINISH DATE:')").should("exist");
    cy.get("h3:contains('FINISH DATE:')").contains("FINISH DATE: Sep 28 2023");
  });

  it("should render the progress bar", () => {
    const component = <SmallBook userbook={userbookTest} />;
    cy.mount(component);

    cy.get(`div.${styles.progressOutline}`).should("exist");
    cy.get(`div.${styles.progressLine}`).should("exist");
    cy.get(`div.${styles.progressLine}`).should("have.attr", "style", "width: 5%;");
  });

  it("should render the progress text", () => {
    const component = <SmallBook userbook={userbookTest} />;
    cy.mount(component);

    cy.get(`div.${styles.progressText}`).should("exist");
  });

  it("should render the score container", () => {
    const component = <SmallBook userbook={userbookTest} />;
    cy.mount(component);

    cy.get(`div.${styles.scoreContainer}`).should("exist");
  });

  it("should render the score", () => {
    const component = <SmallBook userbook={userbookTest} />;
    cy.mount(component);

    cy.get(`div.${styles.scoreWrapper}`).should("exist");
    cy.get(`div.${styles.scoreWrapper}`).contains("10");
  });
});
