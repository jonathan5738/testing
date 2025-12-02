const {client} = require("../db")

class CommentController {
    constructor(){
        this.commentCollection = client.db(process.env.DB_NAME)
           .collection("comments");
    }
}