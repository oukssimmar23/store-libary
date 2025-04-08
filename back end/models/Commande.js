const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaCommande = new Schema({
  utilisateur: {
    type: Schema.Types.ObjectId,
    ref: "Utilisateur",
    required: true
  },
  livres: [
    {
      livre: {
        type: Schema.Types.ObjectId,
        ref: "Livre",
        required: true
      },
      quantite: {
        type: Number,
        required: true
      }
    }
  ],
  total: {
    type: Number,
    required: true
  },
  adresse: {
    type: String,
    required: true
  },
  dateCommande: {
    type: Date,
    default: Date.now
  }
});

const Commande = mongoose.model("Commande", schemaCommande);
module.exports = Commande;
