const bcrypt = require("bcrypt")

const userService = require('../db/user.service')


class UserController {

    async getUsers(request, response){

        let limit = parseInt(request.query.limit) || 100
        let skip =  parseInt(request.query.offset) || 0

        //using a try/catch since we are using asyn/await and want to catch any errors if the code in the try block fails
        try {
            
            let allUsers = await userService.getUsers(limit, skip)
            response.json(allUsers)
            
        } catch (error) {
            console.log("error getting all users: " + error)
            //if any code in the try block fails, send the user a HTTP status of 400 and a message stating we could not find any users
            response.status(400).json({
                message: error.message,
                statusCode: response.statusCode
            })
        }
    }

    //method to create a new user
    async createUser(request, response){

        //store user data sent through the request
        const user = request.body;

        // generate a salt
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(user.password, salt)
        user.password = hash

        try {
            const newUser = await userService.addUser(user)
            response.status(201).json(newUser)
        } catch (error) {
            response.status(400).json({
                message: 'There was a problem creating a user.',
                statusCode: response.statusCode
            })
        }

    }

    //method to update a user
    async updateUser(request, response){


        //get the user email from the request params
        const username = request.params.username;
        const currentUser = await userService.getUserByUsername(username)
        if(!currentUser){
            response.status(400).json({
                message: 'There was an error updating the user.',
                statusCode: response.statusCode
            })
        }

        //store user data sent through the request
        const user = request.body;
        await userService.updateUser(username, user)

        if(user.password) {
            // generate a salt
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(user.password, salt)
            const newPassword = hash
            await userService.changePassword(username, newPassword)
        }
        
        const newUser = userService.getUserByUsername(username)
        response.json(newUser)

    }

    async getUser(request, response){

        try {

            const username = request.params.username;
            const user = await userService.getUserByUsername(username)
            if(user){
                response.json(user)
            }else{
                response.status(404).send({
                    status: response.statusCode,
                    message: "User Not Found!"
                })
            }
            
        } catch (error) {
            console.log("error getting user: " + error)
            //if any code in the try block fails, send the user a HTTP status of 400 and a message stating we could not find the user
            response.status(400).json({
                message: error.message,
                statusCode: response.statusCode
            })

        }
    }
    

}

const userController = new UserController()

module.exports = userController;
