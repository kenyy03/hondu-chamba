const Category = require('../models/category.model');
let categoryMiddleware = {};

categoryMiddleware.verifyCategoryAlreadyExist = async (req, res, next) => {
  const { name } = req.body;
  try {
    const isExist = await Category.exists({ name: name });
    if (isExist) {
      res.status(400).json({ message: 'Category already exist' });
      return;
    }
    next();
  }catch(error){
    res.status(500).json({ message: 'Error verifying category', error: error.message });
    return;
  }
}

module.exports = categoryMiddleware;