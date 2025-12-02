const { ObjectId } = require("mongodb");
const {client} = require("../db");
const { default: z } = require("zod");

const postSchema = z.object({
    title: z.string().min(4, "Title is required").max(100, "Title too long").trim(),
    content: z.string().min(10, "Content is required").max(400, "Content is too long").trim(),
    author: z.string().min(5, "Author is required")
})
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

    createPost = async (req, res) => {
        try{
            const {title, content, author} = req.body;
            const result = postSchema.safeDecode({title, content, author});
            if(result.error){
                res.status(400).send({message: "invalid data sent"});
                return;
            }
            await this.postCollection.insertOne({title, content,author});
            res.status(201).send();
        } catch(err){
            res.status(400).send(err)
        }
    }

    updatePost = async (req, res) => {
        try{
            const {id} = req.params;
            const foundPost = await this.postCollection.findOne({_id: new ObjectId(id)});
            if(!foundPost){
                res.status(404).send({message: "post not found"});
                return;
            }
            const {title, content, author} = req.body;
            const result = postSchema.safeDecode({title, content, author});
            if(result.error){
                res.status(400).send({message: "invalid data sent"});
                return;
            }
            await this.postCollection
            .updateOne({_id: new ObjectId(id)}, {$set: {title, content, author}});
            res.status(200).send();
        } catch(err){
            res.status(500).send(err);
        }
    }
    deletePost = async (req, res) => {
        try{
            const {id} = req.params;
            await this.postCollection.deleteOne({_id: new ObjectId(id)});
        } catch(err){
            res.status(500).send(err);
        }
    }
}