import { getMenuItemById } from '../services/menuItemService.js';
import { getRestaurantById } from '../services/restaurantService.js';

export async function authorizeMenuItemOwnership(req, res, next) {
  const id = parseInt(req.params.id);
  const menuItem = await getMenuItemById(id);
  const restaurant = await getRestaurantById(menuItem.restaurantId);
  if (restaurant.ownerId !== req.user.id) {
    const error = new Error('Forbidden: insufficient permission.');
    error.status = 403;
    return next(error);
  }
  next();
}

export async function authorizeRestaurantOwnershipFromBody(req, res, next) {
  const restaurantId = parseInt(req.body.restaurantId);
  const restaurant = await getRestaurantById(restaurantId);
  if (restaurant.ownerId !== req.user.id) {
    const error = new Error('Forbidden: insufficient permission.');
    error.status = 403;
    return next(error);
  }
  next();
}