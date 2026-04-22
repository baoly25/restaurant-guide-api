import {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
} from '../services/reviewService.js';

export async function getAllReviewsHandler(req, res) {
  const {
    search = '',
    sortBy = 'id',
    order = 'asc',
    offset = 0,
    limit = 5,
    restaurantId,
    userId,
  } = req.query;

  const options = {
    search,
    sortBy,
    order,
    offset: parseInt(offset),
    limit: parseInt(limit),
    restaurantId: restaurantId ? parseInt(restaurantId) : undefined,
    userId: userId ? parseInt(userId) : undefined,
  };
  let reviews = await getAllReviews(options);
  res.status(200).json(reviews);
}

export async function getReviewByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const review = await getReviewById(id);
  res.status(200).json(review);
}

export async function createReviewHandler(req, res) {
  const { rating, comment, restaurantId } = req.body;
  const newReview = await createReview({
    rating,
    comment,
    restaurantId: parseInt(restaurantId),
    userId: req.user.id,
  });
  res.status(201).json(newReview);
}

export async function updateReviewHandler(req, res) {
  const id = parseInt(req.params.id);
  const { rating, comment } = req.body;
  const updatedReview = await updateReview(id, { rating, comment });
  res.status(200).json(updatedReview);
}

export async function deleteReviewHandler(req, res) {
  const id = parseInt(req.params.id);
  await deleteReview(id);
  res.status(204).send();
}