import express, { Router } from 'express';
import serverless from 'serverless-http';
import { google } from 'googleapis';


const api = express();

const router = Router();

const apiKey = "AIzaSyD6XgGmJ9FBYVl-2q0w9YNQFrRKd4amYyw";
const youtube = google.youtube({
  version: 'v3',
  auth: apiKey,
});

router.get('/youtube/', async (req, res) => {
    try {
      const username = "DotDager";
  
      // Buscar el canal por nombre de usuario
      const searchResponse = await youtube.search.list({
        part: 'id,snippet',
        q: username,
        type: 'channel'
      });
  
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

api.use("/api/", router);

export const handler = serverless(api);