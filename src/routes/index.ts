import { Router } from 'express';
import nbaRoutes from './nba-routes';

const routes = Router();

routes.use('/api', nbaRoutes);

export default routes;