import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { google } from 'googleapis';

dotenv.config();

const apiKey = process.env.VITE_YOUTUBE_API_KEY;
const youtube = google.youtube({
  version: 'v3',
  auth: apiKey,
});

const app = express();
const PORT = 3001;

app.use(cors()); // Habilitar CORS para que el frontend pueda acceder

app.get('/', (req, res) => {
  res.send('Bienvenido a mi servidor!');
});

// Ruta para obtener estadísticas del canal
app.get('/api/youtube-data/:username', async (req, res) => {
    try {
      const username = req.params.username;
      console.log(username)
  
      // Buscar el canal por nombre de usuario
      const searchResponse = await youtube.search.list({
        part: 'id,snippet',
        q: username,
        type: 'channel'
      });

      console.log(searchResponse)
  
      if (searchResponse.data.items && searchResponse.data.items.length > 0) {
        const channelId = searchResponse.data.items[0].id.channelId;
  
        // Obtener las estadísticas del canal
        const channelResponse = await youtube.channels.list({
            part: 'statistics',
            id: channelId, // Utilizar el ID de canal obtenido en la búsqueda
            cache: false // Evitar la caché
          });
          
          if (!channelResponse.data.items || channelResponse.data.items.length === 0) {
            throw new Error('No se encontraron estadísticas para el canal.');
          }
          
          const statistics = channelResponse.data.items[0].statistics;
          
          res.status(200).json({ statistics });
      } else {
        res.status(404).json({ error: `No se encontró el canal con el nombre de usuario ${username}.` });
      }
    } catch (error) {
      console.error('Error al obtener datos de YouTube:', error.message);
    }
  });

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });