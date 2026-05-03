const express = require('express');
const cors = require('cors');
const pinoHttp = require('pino-http');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(pinoHttp());

app.get('/notes', (_req, res) => {
  res.status(200).json({
    message: 'Retrieved all notes',
  });
});

app.get('/notes/:noteId', (req, res) => {
  const { noteId } = req.params;

  res.status(200).json({
    message: `Retrieved note with ID: ${noteId}`,
  });
});

app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

app.use((_req, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

app.use((err, _req, res, _next) => {
  res.status(500).json({
    message: err.message,
  });
});

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }

  console.log(`Server is running on port ${PORT}`);
});
