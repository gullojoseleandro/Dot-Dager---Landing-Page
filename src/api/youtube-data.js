import axios from 'axios';

// const testing_url = 'http://localhost:8888/api/youtube';
const url = 'https://dotdagerbyjlg.netlify.app/api/youtube';

export async function getChannelData() {
  try {
    const response = await axios.get(`${url}`);

    if (response.status !== 200) {
      throw new Error('Error fetching channel data');
    }
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}
