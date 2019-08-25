import { Router } from 'express';

import locationController from '../controllers/location';
import { validateRequest }  from '../../middleware/validateRequest';

const locationRoute = new Router();
const { getAllLocations, getLocationById, createNewLocation, updateLocation, deleteLocation } = locationController;

locationRoute.get('/', getAllLocations);
locationRoute.get('/:location', getLocationById);
locationRoute.post('/', validateRequest('location'), createNewLocation);
locationRoute.put('/:location', updateLocation);
locationRoute.delete('/:location', deleteLocation);

export default locationRoute;