import express from 'express';

const app = express();

app.use(express.json());

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from Express on Vercel!' });
});

export default app;