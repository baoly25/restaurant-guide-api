import prisma from '../config/db.js';

export async function getAll({ search, sortBy, order, offset, limit }) {
  const conditions = {};
  if (search) {
    conditions.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { cuisine: { contains: search, mode: 'insensitive' } },
      { location: { contains: search, mode: 'insensitive' } },
    ];
  }
  const restaurants = await prisma.restaurant.findMany({
    where: conditions,
    orderBy: { [sortBy]: order },
    take: limit,
    skip: offset,
  });
  return restaurants;
}

export async function getById(id) {
  const restaurant = await prisma.restaurant.findUnique({ where: { id } });
  return restaurant;
}

export function create(restaurantData) {
  const newRestaurant = prisma.restaurant.create({ data: restaurantData });
  return newRestaurant;
}

export async function update(id, updatedData) {
  try {
    const updatedRestaurant = await prisma.restaurant.update({
      where: { id },
      data: updatedData,
    });
    return updatedRestaurant;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function remove(id) {
  try {
    const deletedRestaurant = await prisma.restaurant.delete({
      where: { id },
    });
    return deletedRestaurant;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}