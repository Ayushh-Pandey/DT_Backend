const {MongoClient} = require('mongodb')
require('dotenv').config();

const url = process.env.MONGODB_CONNECTION_URL
const client = new MongoClient(url);

const connectDb = async()=>{
    await client.connect();
    console.log('Database connected successfully');
    
}

const getClient = ()=>{
    return client;
}

module.exports = {connectDb,getClient}