// En tu backend (Node.js con Express)

const express = require('express');
const axios = require('axios');
const app = express();

// Middleware de CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Ruta para hacer el proxy a la API de football
app.get('/api/football', async (req, res) => {
  const apiKey = 'fde73b4b026a7d594232c3eb41f1c3f019a36a77b20adfe14842fb1bfc5b7f2f';
  const playerName = req.query.player_name; // Obtén el parámetro del nombre del jugador desde la URL

  try {
    // https://apiv3.apifootball.com/?action=get_players&player_name=Benzema&APIkey=xxxxxxxxxxxxxx
    const response = await axios.get(`https://apiv3.apifootball.com`, {
      params: {
        action: 'get_players',
        player_name: playerName,
        APIkey: apiKey,
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener datos de la API de football' });
  }
});

// Inicia el servidor en el puerto deseado (por ejemplo, 3001)
app.listen(3001, () => {
  console.log('Servidor proxy iniciado en http://localhost:3001');
});
