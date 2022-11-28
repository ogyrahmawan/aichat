import { MongoClient } from 'mongodb';
const url = 'mongodb://localhost:27017/'
const client = new MongoClient(url)

client.connect()
const db = client.db('deall')

export {
    client,
    db,
}