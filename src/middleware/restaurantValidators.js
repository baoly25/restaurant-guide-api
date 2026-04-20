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

export const validateCreateRestaurant = [
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
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters'),

  body('cuisine')
    .exists({ values: 'falsy' })
    .withMessage('Cuisine is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('Cuisine must be a string'),

  body('location')
    .exists({ values: 'falsy' })
    .withMessage('Location is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('Location must be a string'),

  handleValidationErrors,
];

export const validateUpdateRestaurant = [
  oneOf(
    [
      body('name').exists({ values: 'falsy' }),
      body('description').exists({ values: 'falsy' }),
      body('cuisine').exists({ values: 'falsy' }),
      body('location').exists({ values: 'falsy' }),
    ],
    {
      message:
        'At least one field (name, description, cuisine, location) must be provided',
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
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters'),

  body('cuisine')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('Cuisine must be a string'),

  body('location')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('Location must be a string'),

  handleValidationErrors,
];

export const validateRestaurantQuery = [
  query('sortBy')
    .optional()
    .isIn(['id', 'name', 'cuisine', 'location', 'createdAt'])
    .withMessage('sortBy must be one of id, name, cuisine, location, createdAt'),

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

  handleValidationErrors,
];