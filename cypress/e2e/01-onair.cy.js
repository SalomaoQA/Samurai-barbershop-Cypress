

it('webapp deve estar online', function() {
    cy.visit('/')

    cy.title('eq', 'Samurrai Barbershop by QAnimja')

    
})