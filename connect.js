const mongoose = require('mongoose');

async function connectToMongo(url){
   try{
    mongoose.connect(url);
    console.log('Database Connected');
   }
   catch{
    console.log('Error in connecting to database');
   }
}

module.exports = connectToMongo;

