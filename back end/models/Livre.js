const mongoose=require("mongoose")
const schema=mongoose.Schema
const schemalivre=new schema({
    title:String,
    auteur:String,
    categorie:String,
    agecible:String,
    evaluation:Number,
    prix:Number,
    description:String,
    image:String

})
const Livre=mongoose.model("livre",schemalivre)
module.exports=Livre