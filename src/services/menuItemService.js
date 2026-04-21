import {
  getAll,
  getById,
  create,
  update,
  remove,
} from '../repositories/menuItemRepo.js';

export async function getAllMenuItems(options) {
  return getAll(options);
}

export async function getMenuItemById(id) {
  const menuItem = await getById(id);
  if (menuItem) return menuItem;
  else {
    const error = new Error(`Menu item ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export async function createMenuItem(menuItemData) {
  return create(menuItemData);
}

export async function updateMenuItem(id, updatedData) {
  const updatedMenuItem = await update(id, updatedData);
  if (updatedMenuItem) return updatedMenuItem;
  else {
    const error = new Error(`Menu item ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export async function deleteMenuItem(id) {
  const result = await remove(id);
  if (result) return;
  else {
    const error = new Error(`Menu item ${id} not found`);
    error.status = 404;
    throw error;
  }
}