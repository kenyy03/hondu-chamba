const Role = require('../models/role.model');

exports.getAllRoles = async (req, res) => {
  try{
    const roles = await Role.find();
    res.status(200).json({ message: 'Roles fetched successfully', data: roles });
  }catch(error){
    res.status(400).json({ message: 'Error fetching roles', error: error.message });
  }
}

exports.createRole = async (req, res) => {
  const { name, description } = req.body;
  const newRole = new Role({ name, description });
  try {
    await newRole.save();
    res.status(201).json({ message: 'Role created successfully', data: newRole});
  }catch(error){
    res.status(400).json({ message: 'Error creating role', error: error.message });
  }
};