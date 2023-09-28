export function getClass(classname: string) {
  return cy.get(`.${classname}`)
}

export function getId(id: string) {
  return cy.get(`#${id}`)
}