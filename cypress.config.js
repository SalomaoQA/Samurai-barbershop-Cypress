const { defineConfig } = require("cypress");
const { Pool } = require('pg')

module.exports = defineConfig({
  //   defaultCommandTimeout: 30000,
  // projectId: '3mtfuw',
  chromeWebSecurity: false,
  viewportWidth: 1440,
  viewportHeight: 900,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      const pool = new Pool({
        host:'kesavan.db.elephantsql.com',
        user:'ydftfmvv',
        password:`clU42RjJgvdCzb2XEXcuqliaGcsvjrDl`,
        database:'ydftfmvv',
        port:5432

      })
      
      on('task', {
        removeUser(email) {
          return new Promise(function(resolve){
          pool.query('DELETE FROM public.users WHERE email = $1', [email], function(error, result){
            if (error) {
              throw error
            }
            resolve({sucess: result})
          })

          })

        }
      })
    },
    baseUrl: 'http://localhost:3000',
  },
});


