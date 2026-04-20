import { getRestaurantById } from '../services/restaurantService.js';

export async function authorizeRestaurantOwnership(req, res, next) {
  const id = parseInt(req.params.id);
  const restaurant = await getRestaurantById(id);
  if (restaurant.ownerId !== req.user.id) {
    const error = new Error('Forbidden: insufficient permission.');
    error.status = 403;
    return next(error);
  }
  next();
}