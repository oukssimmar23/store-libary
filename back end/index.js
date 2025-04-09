const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Administrateur = require("./models/administrateur");
const Commande = require("./models/Commande");
const Utilisateur = require("./models/Utilisateur");

const app = express();
app.use(express.json());
app.use(cors());

// Configurer EJS comme moteur de template
app.set('view engine', 'ejs');
app.set('views', './views');

// اتصال بقاعدة البيانات MongoDB
mongoose.connect("mongodb://localhost:27017/store")
  .then(() => {
    console.log("Connected successfully to the database.");
  })
  .catch((error) => {
    console.log("Error with connecting the db", error);
  });

// نموذج الكتاب (Livre)
const schemaLivre = new mongoose.Schema({
  id: Number,
  title: String,
  auteur: String,
  categorie: String,
  evaluation: Number,
  prix: Number,
  count: Number,
  description: String,
  image: String
});

const Livre = mongoose.model("Livre", schemaLivre);

// إضافة كتاب جديد
app.post("/livres", async (req, res) => {
  try {
    const newlivres = new Livre({
      id: req.body.idlivre,
      title: req.body.titlelivre,
      auteur: req.body.auteurlivre,
      categorie: req.body.categorielivre,
      evaluation: req.body.evaluationlivre,
      prix: req.body.prixlivre,
      description: req.body.descriptionlivre,
      count: req.body.countlivre,
      image: req.body.imagelivre
    });

    await newlivres.save();
    res.send("The new livre has been stored.");
  } catch (err) {
    console.error("Error saving livre:", err);
    res.status(500).send("Error saving the new livre.");
  }
});
app.post("/admin",async (req,res)=>{
  try{
    const newadmin = new Administrateur({
         nom:req.body.nomadmin,
         prenom:req.body.prenomadmin,
        email:req.body.emailadmin,
         password:req.body.passwordadmin
    });
    await newadmin.save();
    res.send("The new Admin has been stored.");

  }catch(error){
    console.error("Error saving livre:", err);
    res.status(500).send("Error saving the new livre.");
  }

  }
)


// عرض الكتب
app.get("/livres", async (req, res) => {
  try {
    const livres = await Livre.find();
    res.json(livres);
  } catch (error) {
    console.log("Error displaying livres:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// حذف كتاب
app.delete("/api/livre/:livreid", async (req, res) => {
  try {
    const id = req.params.livreid;
    const livre = await Livre.findByIdAndDelete(id);
    if (!livre) {
      return res.status(404).json({ error: "Livre not found" });
    }
    res.json(livre);
  } catch (error) {
    console.error("Error deleting livre:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.delete("/api/commande/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const commande = await Commande.findByIdAndDelete(id);
    if (!commande) {
      return res.status(404).json({ error: "Commande not found" });
    }
    res.json(commande);
  } catch (error) {
    console.error("Error deleting Commande:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// تعديل كتاب
app.put("/api/livre/:livreid", async (req, res) => {
  try {
    const id = req.params.livreid;
    const livre = await Livre.findByIdAndUpdate(id, req.body, { new: true });
    if (!livre) {
      return res.status(404).json({ error: "Livre not found" });
    }
    res.json(livre);
  } catch (error) {
    console.error("Error updating livre:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.post("/commande-complete", async (req, res) => {
  try {
    const {
      nom,
      prenom,
      email,
      password,
      adresseUtilisateur,
      livres,
      adresseCommande,
    } = req.body;

    if (
      !nom || !prenom || !email || !password ||
      !adresseUtilisateur || !livres || livres.length === 0 || !adresseCommande
    ) {
      return res.status(400).json({ message: "جميع الحقول مطلوبة." });
    }

    // تحقق أو إنشاء المستخدم
    let utilisateur = await Utilisateur.findOne({ email });
    if (!utilisateur) {
      utilisateur = new Utilisateur({
        nom,
        prenom,
        email,
        password,
        adresse: adresseUtilisateur,
      });
      await utilisateur.save();
    }

    // جلب الكتب من قاعدة البيانات
    const livresIds = livres.map((livre) => livre.id);
    const livresFromDb = await Livre.find({ id: { $in: livresIds } });

    if (livresFromDb.length !== livresIds.length) {
      return res.status(404).json({ message: "بعض الكتب غير موجودة." });
    }

    // حساب المجموع وتحضير الطلب
    let total = 0;
    const livresCommande = [];

    for (const livreData of livres) {
      const livreInDb = livresFromDb.find((livre) => livre.id === livreData.id);
      if (livreInDb) {
        const prixTotal = livreInDb.prix * livreData.quantite;
        total += prixTotal;

        livresCommande.push({
          livre: livreInDb._id,
          quantite: livreData.quantite
        });
      }
    }

    const commande = new Commande({
      utilisateur: utilisateur._id,
      livres: livresCommande,
      total,
      adresse: adresseCommande
    });

    await commande.save();

    res.status(201).json({
      message: "تم إنشاء المستخدم والطلب بنجاح.",
      utilisateur,
      commande
    });

  } catch (error) {
    console.error("حدث خطأ أثناء إنشاء الطلب:", error);
    res.status(500).json({ message: "حدث خطأ في الخادم." });
  }
});






app.listen(3003, () => {
  console.log("I am listening on port 3003");
});

app.get("/commandes", async (req, res) => {
  try {
    const commandes = await Commande.find()
      .populate("utilisateur")
      .populate("livres.livre"); // Pour récupérer les détails de chaque livre

    res.json(commandes);
  } catch (error) {
    console.log("Error displaying commandes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/showlivre", async (req, res) => {
  try {
      const livres = await Livre.find(); // تأكد من انتظار البيانات
      res.render("Livre.ejs", {
          alllivres: livres
      });
  } catch (err) {
      console.error(err);
      res.status(500).send("خطأ في جلب المقالات");
  }
});
app.get("/admin/users", async (req, res) => {
  try {
      const users = await Utilisateur.find(); // تأكد من انتظار البيانات
      res.render("utilisateur.ejs", {
          allusers: users
      });
  } catch (err) {
      console.error(err);
      res.status(500).send("خطأ في جلب المستخدمين");
  }
});



app.get("/showcommande", async (req, res) => {
  try {
      const commandes = await Commande.find()
        .populate("utilisateur")
        .populate("livres.livre"); // Pour récupérer les détails de chaque livre
      res.render("Commande.ejs", {
          allcommandes: commandes
      });
  } catch (err) {
      console.error(err);
      res.status(500).send("خطأ في جلب المقالات");
  }
});
app.get("/showadmin", async (req, res) => {
  try {
      const [admin, livres, commandes, users] = await Promise.all([
          Administrateur.find(),
          Livre.find(),
          Commande.find().populate("utilisateur").populate("livres.livre"),
          Utilisateur.find()
      ]);

      res.render("Administrateur.ejs", {
          alladmin: admin,
          alllivres: livres,
          allcommandes: commandes,
          allusers: users
      });
  } catch (err) {
      console.error(err);
      res.status(500).send("خطأ في جلب البيانات");
  }
});

// Routes pour la page de connexion


