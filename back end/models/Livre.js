const mongoose = require("mongoose");

const livreSchema = new mongoose.Schema({
  title: String,
  auteur: String,
  categorie: String,
  evaluation: Number,
  prix: Number,
  description: String,
  count: Number, // يمكن تحيدها إلى stock فقط لتفادي التكرار
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  image: String,
  anneePublication: Number,
  nombrePages: Number,
  langue: String,
  etat: String,
  isbn: String
});

const Livre = mongoose.model("Livre", livreSchema);
module.exports = Livre;
