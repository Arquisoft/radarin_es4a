// untitled.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe('Acceso a la web', () => {
    it('No se que poner aquí bro', () => {
        cy.visit("https://radarines4awebapp.herokuapp.com/login");
        cy.contains("Iniciar sesión");
    })
})

// Se pueden poner varios
describe('Acceso a Inrupt', () => {
    it('No se que poner aquí bro', () => {
        cy.visit('https://radarines4awebapp.herokuapp.com/login');
        cy.contains('Iniciar sesión');
        cy.get('button.sc-bZQynM.ceXsCu').click();
        cy.get('div.css-1hwfws3').click();
        
    })
})