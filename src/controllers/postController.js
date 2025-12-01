const { ObjectId } = require("mongodb");
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

    getOnePosts = async (req, res) => {
        try{
            const {id} = req.params;
            const foundPosts = await this.postCollection.findOne({_id: new ObjectId(id)});
            res.send(foundPosts);
        } catch(err){
            res.status(500).send(err);
        }
    }
}