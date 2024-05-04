const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/JupiReads")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})

const logInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cin: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    numTel: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    adresse: {
        type: String
    },
    dateOfBirth: {
        type: Date,
        required: true
    }
})

const LogInCollection=new mongoose.model('utilisateur',logInSchema)

module.exports=LogInCollection;
