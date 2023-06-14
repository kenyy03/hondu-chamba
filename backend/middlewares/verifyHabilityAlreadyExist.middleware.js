const Hability = require('../models/hability.model');
let habilityMiddleware = {};

habilityMiddleware.verifyHabilityAlreadyExist = async (req, res, next) => {
  const { title } = req.body;
  try {
    const isExist = await Hability.exists({ title: title });
    if (isExist) {
      res.status(400).json({ message: 'Hability already exist' });
      return;
    }
    next();
  }catch(error){
    res.status(500).json({ message: 'Error verifying hability', error: error.message });
    return;
  }
}

module.exports = habilityMiddleware;