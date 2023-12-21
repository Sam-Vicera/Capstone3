const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const query = require('../db/database')


class AuthController {

    async login(request, response) {

        const { username, password } = request.body;

        try {
          const results = await query('SELECT * FROM users WHERE username = ?', [username])

          if(results.length === 0) {
            response.status(400).json({
              statusCode: response.statusCode,
              message: "Invalid username or password"
            });
          }
          console.log(results)

          const user = results[0]
          if(await bcrypt.compare(password, user.password))
          {
            const payload = { username: user.username }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
              expiresIn: "24h"
            })

            response.json({
              token,
              username: user.username,
              statusCode: response.statusCode
            })
          }
        } catch (error) {
          response.status(500).json({
            statusCode: response.statusCode,
            message: "Oops... something went wrong"
          })
        }
        
    }

    async logout(request, response){
      await request.logout();
      response.status(204).send()
    }
    

}

const authController = new AuthController()

module.exports = authController
