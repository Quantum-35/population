import express from 'express';

import authRoute from './authRoute';
import locationRoute from './location';

const api = express();

api.use('/auth', authRoute);
api.use('/location', locationRoute);

export default api;