import {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from '../services/restaurantService.js';

export async function getAllRestaurantsHandler(req, res) {
  const {
    search = '',
    sortBy = 'id',
    order = 'asc',
    offset = 0,
    limit = 5,
  } = req.query;

  const options = {
    search,
    sortBy,
    order,
    offset: parseInt(offset),
    limit: parseInt(limit),
  };
  let restaurants = await getAllRestaurants(options);
  res.status(200).json(restaurants);
}

export async function getRestaurantByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const restaurant = await getRestaurantById(id);
  res.status(200).json(restaurant);
}

export async function createRestaurantHandler(req, res) {
  const { name, description, cuisine, location } = req.body;
  const newRestaurant = await createRestaurant({
    name,
    description,
    cuisine,
    location,
    ownerId: req.user.id,
  });
  res.status(201).json(newRestaurant);
}

export async function updateRestaurantHandler(req, res) {
  const id = parseInt(req.params.id);
  const { name, description, cuisine, location } = req.body;
  const updatedRestaurant = await updateRestaurant(id, {
    name,
    description,
    cuisine,
    location,
  });
  res.status(200).json(updatedRestaurant);
}

export async function deleteRestaurantHandler(req, res) {
  const id = parseInt(req.params.id);
  await deleteRestaurant(id);
  res.status(204).send();
}