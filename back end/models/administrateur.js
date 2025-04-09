const mongoose=require("mongoose")
const schema=mongoose.Schema
const schemaadmin=new schema({
    nom:String,
    prenom:String,
    email:String,
    password:String
}) 
const Administrateur=mongoose.model("administrateur",schemaadmin)
module.exports=Administrateur