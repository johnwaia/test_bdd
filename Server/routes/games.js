const express = require('express');
const router = express.Router();

const {
  getGames,
  getGame,
  createGame,
  updateGame,
  deleteGame
} = require('../controllers/games');

router.get('/games', getGames);
router.post('/games', createGame);
router.get('/games/:id', getGame);
router.patch('/games/:id', updateGame);
router.delete('/games/:id', deleteGame);

module.exports = router;
