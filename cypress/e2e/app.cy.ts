describe("contain 'Hello'", () => {
  it('hello!', () => {
    cy.visit('/');
    cy.contains("Hello")
  })
})