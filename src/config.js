//config.js file

const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/Login-users",{useNewUrlParser: true, useUnifiedTopology: true});


// Check database connected or not
connect.then(() => {
    console.log("Database Connected Successfully");
})
.catch(() => {
    console.log("Database cannot be Connected");
})

// Create Schema


const voteSchema = new mongoose.Schema({
   name1:{
    type: String,
    required: true
   }
   
});




const votes = mongoose.model("votes", voteSchema);

module.exports = votes;




const Loginschema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dept: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    }
});

// collection part
const collection = new mongoose.model("user's", Loginschema);

module.exports = collection;