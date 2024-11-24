import serverless from 'serverless-http';
import app from './index.js';

app.use((req, res) => {
    res.status(200).json({ message: 'Hello from Vercel!' });
});

export const handler = serverless(app);
