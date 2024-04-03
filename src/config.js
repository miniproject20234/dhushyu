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
    name: {
        type:String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    votes: {
        type: Number,
         default: 0
    }
});

// Collection for votes
const Votes = mongoose.model("votes", voteSchema);
const votedata ={
    name: 'DR.C.Jayapratha',
    department: 'MCA',
    votes: '0',
    name: 'DR.A.B.Hajira Be',
    department: 'MCA',
     votes: '0',
    // name3: 'MR.R.Ramasamy',
    // department3: 'MCA',
    // votes: '0',
    // name4: 'MR.Syed Raffi Ahamed',
    // department4: 'MCA',
    // votes: '0',
    // name5: 'Mrs.J.Uma',
    // department5: 'MCA',
    // votes: '0',
    // name6: 'Mrs.Bhuvaneshwari',
    // department6: 'MCA',
    // votes: '0',
}

// Example: Create a new vote
const voteInstance = new Votes(votedata);


voteInstance.save()


.then(doc =>{
    console.log('Document saved successfully:', doc);
})
.catch(err => {
    console.error('Error saving document:', err);
});




module.exports = Votes;




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