const {MongoClient} = require("mongodb");
const client = new MongoClient(process.env.MONGO_URI);

const connectToDatabase = async () => {
    try{
        await client.connect()
        console.log(`database connected to ${process.env.DB_NAME}`);
    } catch(err){
        console.log(err)
    }
}

module.exports = {client, connectToDatabase}