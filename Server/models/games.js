const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema(
  {
    titre: { type: String, required: true },
    genre: [String],
    plateforme: [String],
    editeur: String,
    developpeur: String,
    annee_sortie: Number,
    metacritic_score: Number,
    temps_jeu_heures: Number,
    termine: { type: Boolean, default: false },
    date_ajout: { type: Date, default: Date.now },
    date_modification: Date
  },
  { versionKey: false }
);

module.exports = mongoose.model('Game', gameSchema);
