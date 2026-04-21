import express from 'express';
import {
  getAllMenuItemsHandler,
  getMenuItemByIdHandler,
  createMenuItemHandler,
  updateMenuItemHandler,
  deleteMenuItemHandler,
} from '../controllers/menuItemController.js';

import {
  validateId,
  validateCreateMenuItem,
  validateUpdateMenuItem,
  validateMenuItemQuery,
} from '../middleware/menuItemValidators.js';

import { authenticate } from '../middleware/authenticate.js';
import {
  authorizeMenuItemOwnership,
  authorizeRestaurantOwnershipFromBody,
} from '../middleware/authorizeMenuItemOwnership.js';

const router = express.Router();
router.get('/', validateMenuItemQuery, getAllMenuItemsHandler);
router.get('/:id', validateId, getMenuItemByIdHandler);
router.post(
  '/',
  authenticate,
  validateCreateMenuItem,
  authorizeRestaurantOwnershipFromBody,
  createMenuItemHandler,
);
router.put(
  '/:id',
  authenticate,
  validateId,
  authorizeMenuItemOwnership,
  validateUpdateMenuItem,
  updateMenuItemHandler,
);
router.delete(
  '/:id',
  authenticate,
  validateId,
  authorizeMenuItemOwnership,
  deleteMenuItemHandler,
);

export default router;