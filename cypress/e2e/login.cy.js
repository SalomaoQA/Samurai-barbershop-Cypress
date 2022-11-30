import loginPage from  '../support/pages/login'
import dashPage from '../support/pages/dash'


describe('login', function(){

        context('Quando o usuario e muito bom', function(){

            const user = {
                name: 'Paulo Salomao',
                email: 'paulosalomao@adsoft.com.br',
                password: 'dia060719'
            }

            it('Deve logar com sucesso', function(){
                loginPage.go()
                loginPage.form(user)
                loginPage.submit()

                dashPage.header.userLoggedIn(user.name)

                
            })
        })
})