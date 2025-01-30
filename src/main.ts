import express from 'express';
import cors from 'cors';
import nbaRoutes from '@routes/nba-routes';
import { PORT } from '@configs';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/nba', nbaRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});