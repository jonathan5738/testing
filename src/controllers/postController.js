const {client} = require("../db");

class PostController {
    constructor(){
        this.postCollection = client.db(process.env.DB_NAME).collection("posts");
    }
    getAllPosts = async (req, res) => {
        try{
            const posts = await this.postCollection.find({});
            res.send(posts);
        }catch(err){
            res.status(500).send(err);
        }
    }
}