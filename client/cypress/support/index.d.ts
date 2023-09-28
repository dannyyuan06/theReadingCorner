declare namespace Cypress {
  interface Chainable {
    stubUsePathname(pathname: string): void;
  }
}