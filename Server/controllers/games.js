const mongoose = require('mongoose');
const Game = require('../models/games');

/**
 * GET /games
 */
const getGames = async (_req, res) => {
  try {
    const games = await Game.find().sort({ date_ajout: -1 });
    res.status(200).json(games);
  } catch (error) {
    console.error('❌ getGames:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

/**
 * GET /games/:id
 */
const getGame = async (req, res) => {
  try {
    const id = req.params.id.trim();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID invalide' });
    }

    const game = await Game.findById(id);
    if (!game) {
      return res.status(404).json({ message: 'Jeu non trouvé' });
    }
    res.status(200).json(game);
  } catch (error) {
    console.error('❌ getGame:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

/**
 * POST /games
 */
const createGame = async (req, res) => {
  try {
    const { titre } = req.body;

    if (!titre) {
      return res.status(400).json({ message: 'Le titre est obligatoire' });
    }

    const game = await Game.create(req.body);
    res.status(201).json(game);
  } catch (error) {
    console.error('❌ createGame:', error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * PATCH /games/:id
 */
const updateGame = async (req, res) => {
  try {
    const id = req.params.id.trim();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID invalide' });
    }

    const game = await Game.findByIdAndUpdate(
      id,
      { ...req.body, date_modification: new Date() },
      { new: true }
    );

    if (!game) {
      return res.status(404).json({ message: 'Jeu non trouvé' });
    }

    res.status(200).json(game);
  } catch (error) {
    console.error('❌ updateGame:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

/**
 * DELETE /games/:id
 */
const deleteGame = async (req, res) => {
  try {
    const id = req.params.id.trim(); // enlève \n

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID invalide' });
    }

    const game = await Game.findByIdAndDelete(id);

    if (!game) {
      return res.status(404).json({ message: 'Jeu non trouvé' });
    }

    res.status(200).json({ message: 'Jeu supprimé' });
  } catch (error) {
    console.error('❌ deleteGame:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = {
  getGames,
  getGame,
  createGame,
  updateGame,
  deleteGame
};
