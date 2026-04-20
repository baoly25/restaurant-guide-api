import express from 'express';
import {
  getAllRestaurantsHandler,
  getRestaurantByIdHandler,
  createRestaurantHandler,
  updateRestaurantHandler,
  deleteRestaurantHandler,
} from '../controllers/restaurantController.js';

import {
  validateId,
  validateCreateRestaurant,
  validateUpdateRestaurant,
  validateRestaurantQuery,
} from '../middleware/restaurantValidators.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeRestaurantOwnership } from '../middleware/authorizeRestaurantOwnership.js';

const router = express.Router();
router.get('/', validateRestaurantQuery, getAllRestaurantsHandler);
router.get('/:id', validateId, getRestaurantByIdHandler);
router.post('/', authenticate, validateCreateRestaurant, createRestaurantHandler);
router.put(
  '/:id',
  authenticate,
  validateId,
  authorizeRestaurantOwnership,
  validateUpdateRestaurant,
  updateRestaurantHandler,
);
router.delete(
  '/:id',
  authenticate,
  validateId,
  authorizeRestaurantOwnership,
  deleteRestaurantHandler,
);

export default router;