const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const categoryMiddleware = require('../middlewares/verifyCategoryAlreadyExist.middleware');

router.get('/get-all-categories', categoryController.getAllCategories);
router.post(
  '/create-category',
  [categoryMiddleware.verifyCategoryAlreadyExist],
  categoryController.createCategory
);

module.exports = router;

