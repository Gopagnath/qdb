import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import usersRoutes from './routes/usersRoutes';
import postsRoutes from './routes/postsRoutes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', usersRoutes);
app.use('/posts', postsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});