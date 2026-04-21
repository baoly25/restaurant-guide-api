import {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from '../services/menuItemService.js';

export async function getAllMenuItemsHandler(req, res) {
  const {
    search = '',
    sortBy = 'id',
    order = 'asc',
    offset = 0,
    limit = 5,
    restaurantId,
  } = req.query;

  const options = {
    search,
    sortBy,
    order,
    offset: parseInt(offset),
    limit: parseInt(limit),
    restaurantId: restaurantId ? parseInt(restaurantId) : undefined,
  };
  let menuItems = await getAllMenuItems(options);
  res.status(200).json(menuItems);
}

export async function getMenuItemByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const menuItem = await getMenuItemById(id);
  res.status(200).json(menuItem);
}

export async function createMenuItemHandler(req, res) {
  const { name, description, price, category, restaurantId } = req.body;
  const newMenuItem = await createMenuItem({
    name,
    description,
    price,
    category,
    restaurantId: parseInt(restaurantId),
  });
  res.status(201).json(newMenuItem);
}

export async function updateMenuItemHandler(req, res) {
  const id = parseInt(req.params.id);
  const { name, description, price, category } = req.body;
  const updatedMenuItem = await updateMenuItem(id, {
    name,
    description,
    price,
    category,
  });
  res.status(200).json(updatedMenuItem);
}

export async function deleteMenuItemHandler(req, res) {
  const id = parseInt(req.params.id);
  await deleteMenuItem(id);
  res.status(204).send();
}