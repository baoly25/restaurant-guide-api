import { param, body, oneOf, query } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateId = [
  param('id')
    .trim()
    .escape()
    .isInt({ min: 1 })
    .withMessage('Id must be a positive integer'),

  handleValidationErrors,
];

export const validateCreateMenuItem = [
  body('name')
    .exists({ values: 'falsy' })
    .withMessage('Name is required')
    .bail()
    .trim()
    .escape()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters'),

  body('description')
    .exists({ values: 'falsy' })
    .withMessage('Description is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('Description must be a string')
    .bail()
    .isLength({ min: 5 })
    .withMessage('Description must be at least 5 characters'),

  body('price')
    .exists({ values: 'falsy' })
    .withMessage('Price is required')
    .bail()
    .isFloat({ min: 0 })
    .withMessage('Price must be a non-negative number'),

  body('category')
    .exists({ values: 'falsy' })
    .withMessage('Category is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('Category must be a string'),

  body('restaurantId')
    .exists({ values: 'falsy' })
    .withMessage('Restaurant ID is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Restaurant ID must be a positive integer'),

  handleValidationErrors,
];

export const validateUpdateMenuItem = [
  oneOf(
    [
      body('name').exists({ values: 'falsy' }),
      body('description').exists({ values: 'falsy' }),
      body('price').exists({ values: 'falsy' }),
      body('category').exists({ values: 'falsy' }),
    ],
    {
      message:
        'At least one field (name, description, price, category) must be provided',
    },
  ),

  body('name')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('Name must be a string')
    .bail()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters'),

  body('description')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('Description must be a string')
    .bail()
    .isLength({ min: 5 })
    .withMessage('Description must be at least 5 characters'),

  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a non-negative number'),

  body('category')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('Category must be a string'),

  handleValidationErrors,
];

export const validateMenuItemQuery = [
  query('sortBy')
    .optional()
    .isIn(['id', 'name', 'price', 'category'])
    .withMessage('sortBy must be one of id, name, price, category'),

  query('order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('order must be either asc or desc'),

  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('offset must be a non-negative integer'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('limit must be an integer between 1 and 50'),

  query('restaurantId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('restaurantId must be a positive integer'),

  handleValidationErrors,
];