const express=require("express")
const app=express()
const mongoose=require("mongoose")
const multer = require("multer");
const cors=require("cors")
const Administrateur=require("./models/administrateur")
app.use(express.json())
app.use(cors())
app.listen(4001,()=>{
    console.log("i am listening 4?000")
})
const schemaLivre = new mongoose.Schema({
    id:Number,
    title: String,
    auteur: String,
    categorie: String,
    evaluation: Number,
    prix: Number,
    count:Number,
    description: String,
    image: String
});
const Livre = mongoose.model("Livre", schemaLivre);


mongoose.connect("mongodb://localhost:27017/store").then(()=>{
    console.log("connected successfully")
})
.catch(error=>{
    console.log("error with connecting the db",error)
})

app.post("/api/livres", async (req, res) => {
    try {
        // إنشاء كتاب جديد باستخدام البيانات المرسلة
        const newlivres = new Livre({
            id:req.body.idlivre,
            title: req.body.titlelivre,
            auteur: req.body.auteurlivre,
            categorie: req.body.categorielivre,
            evaluation: req.body.evaluationlivre,
            prix: req.body.prixlivre,
            description: req.body.descriptionlivre,
            count:req.body.countlivre,
            image: req.body.imagelivre

        });

        // حفظ الكتاب في قاعدة البيانات
        await newlivres.save();

        // إرسال رد بعد الحفظ
        res.send("The new livre has been stored.");
    } catch (err) {
        console.error("Error saving livre:", err);
        res.status(500).send("Error saving the new livre.");
    }
});

app.get("/livres",async (req,res) => {
    try {
        const livres= await Livre.find()
        console.log("les livres:",livres)
        res.json(livres)
}catch(error){
 console.log("error d'affichage les livres:",livres)
    res.status(500).json({error:"internal server Error"})
 
}
});
app.delete("/api/livre/:livreid",async (req,res)=>{
    try { 
        const id=req.params.livreid
        const livre=await Livre.findByIdAndDelete(id)
        if(!livre){
            return res.status(404).json({error:"livre no found"})
        }
        res.json(livre)
    }catch(error){
           console.error("error fetching livres:",error)
           res.status(500).json({error:"internal server error"})
    }
})
app.put("/api/livre/:livreid",async (req,res)=>{
    try { 
        const id=req.params.livreid
        const livre=await Livre.findByIdAndUpdate(id,req.body,{new:true})
        if(!livre){
            return res.status(404).json({error:"livre no found"})
        }
        res.json(livre)
    }catch(error){
           console.error("error fetching livres:",error)
           res.status(500).json({error:"internal server error"})
    }
})



app.get("/showlivres",async(req,res)=>{
    try{
             const livres=await Livre.find()
             res.render("livre.ejs",{
                alllivres:livres
             })
    }
    catch(error){
        console.error(err);
        res.status(500).send("  خطأ في جلب الكتب");
    }
})

//
//

// تشغيل السيرفر
//
app.get("/showadmin", async (req, res) => {
    try {
        const administrators = await Administrateur.find();
        res.render("Administrateur.ejs", {
            admins: administrators // تغيير الاسم ليتطابق مع القالب
        });
    } catch (error) {
        res.status(500).json({ message: "Erreur", error });
    }
});


