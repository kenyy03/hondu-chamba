const asyncHandler = require('express-async-handler');
const Role = require('../models/role.model');
let roleMiddleware = {};

roleMiddleware.verifyRoleAlreadyExist = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  try {
    const isExist = await Role.exists({ name: name });
    if (isExist) {
      res.status(400).json({ message: 'Role already exist' });
      return;
    }
    next();
  }catch(error){
    res.status(500).json({ message: 'Error verifying role', error: error.message });
    return;
  }
});

module.exports = roleMiddleware;