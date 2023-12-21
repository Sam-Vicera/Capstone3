const query = require('./database')

class UserService {

    async getUsers(limit, skip){

        const selectSql = `
                SELECT username
                    , fullName
                    , bio
                FROM users
                LIMIT ? OFFSET ?;
            `
            
        const users = await query(selectSql, [limit, skip])
        return users
    }

    async getUserByUsername(username)
    {

        const selectSql = `
                SELECT username
                    , fullName
                    , bio
                FROM users
                WHERE username = ?;
            `

        const users = await query(selectSql, [username])
        return users.length > 0 ? users[0]: undefined

    }

    async addUser(user) {
        
        const sql = `INSERT INTO users (username, fullName, password) VALUES (?,?,?)`
        
        await query(sql, [user.username, user.fullName, user.password])
        const newUser = await this.getUserByUsername(user.username)

        if(newUser) delete newUser.bio

        return newUser
    }

    async updateUser(username, user){
        let sql = `
            UPDATE users
            SET fullName = ?
                , bio = ?
            WHERE username = ?;
        `
        await query(sql, [user.fullName, user.bio, username])
    }

    async changePassword(username, password){
        let sql = `
            UPDATE users
            SET password = ?
            WHERE username = ?;
        `
        await query(sql, [password, username])
    }

}

const userService = new UserService()

module.exports = userService