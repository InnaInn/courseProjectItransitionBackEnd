import express from 'express';
import { session } from 'xsess/express';
import cors from 'cors';
import config from './config/config.js';
import healthRoutes from './routes/health.routes.js'
import userRoutes from './routes/users.routes.js'
import attributesRoutes from  './routes/attributes.routes.js'
import categoriesRoutes from './routes/categories.routes.js'
import positionRoutes from './routes/positions.routes.js'
import authRoutes from './routes/auth.routes.js'

const app = express();
const PORT = config.server.port;
const BE_URL = config.server.url;

app.use(session({
    secret: 'iuewgfowi8shcipoj',
    header: {
        name: 'x-session-id',
        policy: 'init'
    },
    ttl: 60 * 60,
    cookie: false
}));
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
app.use('/api/attributes', attributesRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/position', positionRoutes);
app.use('/api/auth', authRoutes);
app.listen(PORT, () => {
    console.log(`Health check: ${BE_URL}/api/health`);
});