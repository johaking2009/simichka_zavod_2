require('dotenv').config();
const mongoose = require('mongoose');

async function main(){
  const uri = process.env.MONGO_URI;
  if(!uri){
    console.error('No MONGO_URI in .env');
    process.exit(2);
  }
  try{
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const conn = mongoose.connection;
    console.log('connected to', conn.host, 'dbName:', conn.name);
    const db = conn.db;
    const collections = ['clients','ombors','producttransactions','producttransactions'];
    for(const c of collections){
      try{
        const exists = await db.listCollections({ name: c }).hasNext();
        if(!exists){
          console.log(c, '-> collection not found');
          continue;
        }
        const count = await db.collection(c).countDocuments();
        console.log(c, '->', count);
      }catch(err){
        console.log(c, '-> error', err.message);
      }
    }
    await mongoose.disconnect();
    process.exit(0);
  }catch(err){
    console.error('Connection error:', err.message);
    process.exit(1);
  }
}

main();
