const likeService = require('../db/like.service')


class LikeController {

    async createLike(req, res){

        try {
            const likeData = req.body;
            likeData.username = req.user.username

            let newLike = await likeService.addLike(likeData)

            res.status(201).json(newLike)
            
        } catch (error) {
            console.log("failed to create like: " + error)
            res.status(400).json({
                message: error.message,
                statusCode: res.statusCode
            })
        }

    }
    
    async deleteLike(req, res){

        try {
            const id = req.params.likeId;
            
            let like = await likeService.getById(id)

            if(like){
                await likeService.delete(id)

                res.status(204).send({ message: "Like deleted", statusCode: res.statusCode });
            }else{
                res.status(404).send({
                    status: res.statusCode,
                    message: "Like Not Found!"
                })
            }
            
        } catch (error) {
            console.log("failed to delete like: " + error)
            
            res.status(400).json({
                message: error.message,
                statusCode: res.statusCode
            })

        }
    }
}

const likeController = new LikeController()

module.exports = likeController;
