const Category = require('../models/category.model.js');

exports.getAllCategories = async (req, res) => {
  try{
    const categories = await Category.find();
    res.status(200).json({ message: 'Categories fetched successfully', data: categories ?? [] });
  }catch(error){
    res.status(400).json({ message: 'Error fetching categories', error: error.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name, helperText } = req.body;
    const newCategory = new Category({ name, helperText });
    await newCategory.save();
    res.status(201).json({ message: 'Category created successfully', data: newCategory});
  }catch(error){
    res.status(400).json({ message: 'Error creating category', error: error.message });
  }
}