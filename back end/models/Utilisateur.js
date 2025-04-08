// models/Utilisateur.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaUtilisateur = new Schema({
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  adresse: {
    type: String,
    required: true
  }
});

const Utilisateur = mongoose.model("Utilisateur", schemaUtilisateur);
module.exports = Utilisateur;
