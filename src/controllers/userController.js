const { ObjectId } = require("mongodb");
const {client} = require("../db")

class UserController {
    constructor(){
        this.userCollection = client.db(process.env.DB_NAME).collection("users");
    }
    getAllUsers = async (req, res) => {
        try{
            const users = await this.userCollection.find({});
            res.status(200).send(users);
        } catch(err){
            res.status(500).send(err);
        }
    }
    getOneUser = async (req, res) => {
        try{
            const {id} = req.params;
            const foundUser = await this.userCollection.findOne({_id: new ObjectId(id)});
            if(!foundUser){
                res.status(404).send({error: "user not found"});
                return;
            }
            res.send(foundUser);
        } catch(err){
            res.status(500).send(err);
        }
    }
    createUser = async (req, res) => {
        try{
            const {username, firstName, lastName, email} = req.body;
            await this.userCollection.insertOne({username, firstName, lastName, email});
            res.status(201).send();
        } catch(err){
            res.status(400).send(err);
        }
    }
    updateUser = async (req, res) => {
        try{
            const {id} = req.params;
            const foundUser = await this.userCollection.findOne({_id: new ObjectId(id)});
            if(!foundUser){
                res.status(404).send({error: "not found"});
                return;
            }
            const {username, firstName, lastName, email} = req.body;
            const result = await this.userCollection
                .updateOne({_id: foundUser._id}, {$set: {username, firstName, lastName, email}});
            
            if(result.acknowledged){
                res.send({message: "user added"});
            }
        } catch(err){
            res.status(400).send(err);
        }
    }

    deleteUser = async (req, res) => {
        try{
            const {id} = req.params;
            const result = await this.userCollection.deleteOne({_id: new ObjectId(id)});
            if(result.deletedCount > 0 && result.acknowledged){
                res.status(200).send();
                return;
            }
            res.status(400).send();
        } catch(err){
            res.status(500).send(err);
        }
    }
}
const userInstance = new UserController();

module.exports = userInstance