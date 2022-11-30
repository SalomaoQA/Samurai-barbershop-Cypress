
import signupPage from '../support/pages/signup'

describe('cadastro', function () {
    context('quando o usuário e novato', function () {
        const user = {
            name: 'Paulo Salomão',
            email: 'salomao.pauloferreira.paulo19@gmail.com',
            password: '060719'
        }

        before(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })

        })

        it('Deve cadastrar com sucesso', function () {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

        })

    })

    context('quando o email ja existe', function () {
        const user = {
            name: 'Salomao',
            email: 'salomao@gmail.com',
            password: '060719',
            is_provider: true
        }

        before(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })

            cy.request(
                'POST',
                'http://localhost:3333/users',
                user
            ).then(function (response) {
                expect(response.status).to.eq(200)
            })

        })

        it('nao deve cadastrar o usuario', function () {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')


        })

    })

    context('quando o email é incorreto', function () {
        const user = {
            name: 'Paulo QA',
            email: 'pauloqa.gmail.com',
            password: '060719'
        }

        it('deve exibir mensagem de alerta', function () {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.alertHaveText('Informe um email válido')


        })

    })

    context('quando a senha e muito curta', function () {

        const passwords = ['1', '2a', 'ab3', 'abc4', 'ab#c5']

        beforeEach(function () {
            signupPage.go()
        })

        passwords.forEach(function (p) {
            it('nao deve cadastrar a senha: ' + p, function () {
                const user = { name: 'Paulo', email: 'pauloqa@gmail.com', password: p }

                signupPage.form(user)
                signupPage.submit()
            })

        })
        afterEach(function () {
            signupPage.alertHaveText('Pelo menos 6 caracteres')


        })


    })

    context('quando nao preencho nenhum dos campos', function () {

        const alertMessagens = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(function () {
            signupPage.go()
            signupPage.submit()
        })

        alertMessagens.forEach(function (alert) {
            it('deve exibir ' + alert.toLocaleLowerCase(), function () {
                signupPage.alertHaveText(alert)

            })
        })


    })

})
