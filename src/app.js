import express from 'express';
import cors from 'cors';
import config from './config/config.js';
import healthRoutes from './routes/health.routes.js'
import userRoutes from './routes/users.routes.js'

const app = express();
const PORT = config.server.port;
const BE_URL = config.server.url;

app.use(cors({
    origin: `${config.uiUrl}`,
    credentials: true,
    exposedHeaders: ['x-session-id']
}));
app.set("trust proxy", 1);
app.use(express.json());
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ status: 'Something went wrong', stackTrace: err.stack });
});
app.use('/api/health', healthRoutes);
app.use('/api/users', userRoutes);
app.listen(PORT, () => {
    console.log(`Health check: ${BE_URL}/api/health`);
});