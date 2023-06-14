const Hability = require('../models/hability.model');

exports.createHability = async (req, res) => {
  try {
    const { title } = req.body;
    const hability = new Hability({ title });
    const savedHability = await hability.save();
    res.status(201).json({ message: 'Hability created', data: savedHability });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Something goes wrong creating the hability',
    });
  }
};

exports.getHabilities = async (req, res) => {
  try {
    const habilities = await Hability.find();
    res.status(200).json({ message: 'Habilities found', data: habilities });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Something goes wrong getting the habilities',
    });
  }
}