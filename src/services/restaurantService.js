import {
  getAll,
  getById,
  create,
  update,
  remove,
} from '../repositories/restaurantRepo.js';

export async function getAllRestaurants(options) {
  return getAll(options);
}

export async function getRestaurantById(id) {
  const restaurant = await getById(id);
  if (restaurant) return restaurant;
  else {
    const error = new Error(`Restaurant ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export async function createRestaurant(restaurantData) {
  return create(restaurantData);
}

export async function updateRestaurant(id, updatedData) {
  const updatedRestaurant = await update(id, updatedData);
  if (updatedRestaurant) return updatedRestaurant;
  else {
    const error = new Error(`Restaurant ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export async function deleteRestaurant(id) {
  const result = await remove(id);
  if (result) return;
  else {
    const error = new Error(`Restaurant ${id} not found`);
    error.status = 404;
    throw error;
  }
}