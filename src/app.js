import express from 'express';
import morgan from 'morgan';
import pwdRoutes from './routes/pwd.routes';
import cors from 'cors';

const app = express();
app.use(cors({origin: '*'}));
app.set('port', 5000);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // para recibir formularios html
app.use('/api/pwd', pwdRoutes);

export default app;