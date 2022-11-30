import { faker } from '@faker-js/faker';

it('Deve cadastrar um novo usuário', function(){

    const name = 'Paulo Salomão'
    const email = faker.internet.email();
    const senha = '060719'

    cy.visit('/signup')

    cy.get('input[placeholder="Nome"]').type(name)
    cy.get('input[placeholder="E-mail"]').type(email)
    cy.get('input[placeholder="Senha"]').type(senha)

    
    cy.contains('button', 'Cadastrar').click()
    
    cy.get('.toast')
        .should('be.visible')
        .find('p')
        .should('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

       

    


})