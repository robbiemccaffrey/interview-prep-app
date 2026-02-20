import express from 'express';
import cors from 'cors';
import topicsRouter from './routes/topics';
import problemsRouter from './routes/problems';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/topics', topicsRouter);
app.use('/api/problems', problemsRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
