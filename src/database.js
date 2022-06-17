require('dotenv').config();
const mongoose = require("mongoose");

/* async anonymous IIFE connection to the database */
const connection = async () => {
    try {
        await mongoose.connect(`mongodb+srv://aranogajec:${process.env.DBPASS}@cluster0.shbxeue.mongodb.net/?retryWrites=true&w=majority`)
        console.log('Connected to the database successfully');
    }catch(error){
        console.log(error)
    }
}

module.exports = connection;