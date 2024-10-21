import express from 'express';
import logger from './services/logger';
import userRoutes from './routes/userRoutes';
import adminRoutes from './routes/adminRoutes';

const app = express();

app.use(express.json());

app.use(logger);

app.use('/api', userRoutes);

app.use('/api/admin', adminRoutes);

export default app;
