const express = require('express');
const cors = require('cors');

const gameRoutes = require('./routes/games');

const app = express();

app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'OPTIONS', 'DELETE', 'PUT', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());

app.get('/', (_req, res) => res.send('API OK ✅'));

app.use('/api', gameRoutes);

module.exports = app;
