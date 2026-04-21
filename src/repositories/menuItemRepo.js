import prisma from '../config/db.js';

export async function getAll({ search, sortBy, order, offset, limit, restaurantId }) {
  const conditions = {};
  if (search) {
    conditions.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { category: { contains: search, mode: 'insensitive' } },
    ];
  }
  if (restaurantId) {
    conditions.restaurantId = restaurantId;
  }
  const menuItems = await prisma.menuItem.findMany({
    where: conditions,
    orderBy: { [sortBy]: order },
    take: limit,
    skip: offset,
  });
  return menuItems;
}

export async function getById(id) {
  const menuItem = await prisma.menuItem.findUnique({ where: { id } });
  return menuItem;
}

export function create(menuItemData) {
  const newMenuItem = prisma.menuItem.create({ data: menuItemData });
  return newMenuItem;
}

export async function update(id, updatedData) {
  try {
    const updatedMenuItem = await prisma.menuItem.update({
      where: { id },
      data: updatedData,
    });
    return updatedMenuItem;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function remove(id) {
  try {
    const deletedMenuItem = await prisma.menuItem.delete({
      where: { id },
    });
    return deletedMenuItem;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}