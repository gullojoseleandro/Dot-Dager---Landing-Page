import axios from 'axios';

const url = './../api/index.ts'; // Vercel usa rutas relativas para funciones serverless

export async function getChannelData(username) {
  try {
    const response = await axios.get(`${url}?username=${username}`);

    if (response.status !== 200) {
      throw new Error('Error fetching channel data');
    }
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}
