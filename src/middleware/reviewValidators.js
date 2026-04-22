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

export const validateCreateReview = [
  body('rating')
    .exists({ values: 'falsy' })
    .withMessage('Rating is required')
    .bail()
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be an integer between 1 and 5'),

  body('comment')
    .exists({ values: 'falsy' })
    .withMessage('Comment is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('Comment must be a string')
    .bail()
    .isLength({ min: 5 })
    .withMessage('Comment must be at least 5 characters'),

  body('restaurantId')
    .exists({ values: 'falsy' })
    .withMessage('Restaurant ID is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Restaurant ID must be a positive integer'),

  handleValidationErrors,
];

export const validateUpdateReview = [
  oneOf(
    [
      body('rating').exists({ values: 'falsy' }),
      body('comment').exists({ values: 'falsy' }),
    ],
    { message: 'At least one field (rating, comment) must be provided' },
  ),

  body('rating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be an integer between 1 and 5'),

  body('comment')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('Comment must be a string')
    .bail()
    .isLength({ min: 5 })
    .withMessage('Comment must be at least 5 characters'),

  handleValidationErrors,
];

export const validateReviewQuery = [
  query('sortBy')
    .optional()
    .isIn(['id', 'rating', 'createdAt'])
    .withMessage('sortBy must be one of id, rating, createdAt'),

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

  query('userId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('userId must be a positive integer'),

  handleValidationErrors,
];