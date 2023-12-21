const query = require('./database')
const likeService = require('./like.service')
const {v4: uuidv4} = require('uuid')

class PostService {

    async getPosts(limit, skip) {

        const sql = `
                SELECT _id
                    , text
                    , username
                    , createdAt
                FROM posts
                LIMIT ? OFFSET ?;
            `
        let posts = await query(sql, [limit, skip])

        posts = [...posts]

        posts.forEach(async (post) => {

            post.likes = await likeService.getByPostId(post._id)
            
        });

        return posts
    }

    async getPostsByUser(username, limit, skip) {

        const sql = `
                SELECT _id
                    , text
                    , username
                    , createdAt
                FROM posts
                LIMIT ? OFFSET ?;
            `
        let posts = await query(sql, [username, limit, skip])

        posts = [...posts]

        posts.forEach(async (post) => {

            post.likes = await likeService.getByPostId(post._id)
            
        });

        return posts
    }

    async getById(id){

        const sql = `
                SELECT _id
                    , text
                    , username
                    , createdAt
                FROM posts
                WHERE _id = ?;
            `

        const rows = await query(sql, [id])
        const post = rows.length > 0 ? rows[0] : undefined

        if(post) {
            post.likes = await likeService.getByPostId(post._id)
        }

        return post
    }

    async addPost(post) {
        const id = uuidv4()
        const sql = `
            INSERT INTO posts (_id, text, username)
            VALUE (?,?,?);
        `
        await query(sql, [id, post.text, post.username])
        return await this.getById(id)
    }

    async delete(id){
        await likeService.deleteByPostId(id)

        const sql = `
            DELETE FROM posts
            WHERE _id = ?;
        `
        await query(sql, [id])
    }

}

const postService = new PostService()

module.exports = postService