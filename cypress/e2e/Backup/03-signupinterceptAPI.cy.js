
it('Deve cadastrar um novo usuário', function(){

    const name = 'Paulo Salomão'
    const email = 'salomao.pauloferreira.paulo19@gmail.com'
    const senha = '060719'

    cy.visit('/signup')

    cy.get('input[placeholder="Nome"]').type(name)
    cy.get('input[placeholder="E-mail"]').type(email)
    cy.get('input[placeholder="Senha"]').type(senha)

    cy.intercept('POST', '/users', {
        statusCode: 200
    }).as('postUser')


    cy.contains('button', 'Cadastrar').click()

    cy.wait('@postUser')

    cy.get('.toast')
        .should('be.visible')
        .find('p')
        .should('have.text', 'Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

          


})