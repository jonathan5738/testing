const express = require("express");
require("dotenv").config()
const { connectToDatabase } = require("./db");
const postController = require("./controllers/postController");
const userController = require("./controllers/userController");
const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.get("/api/posts", postController.getAllPosts);
app.get("/api/posts/:id", postController.getOnePosts);
app.post("/api/posts", postController.createPost);
app.put("/api/posts/:id", postController.updatePost);
app.delete("/api/posts/:id", postController.deletePost);

app.listen(PORT, async () => {
    await connectToDatabase();
    console.log(`server listenning on ${PORT}`);
})