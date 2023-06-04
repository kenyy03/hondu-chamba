const Helper = require('../helpers/index');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const auth = require('../middlewares/verify.jwt.middleware');

exports.signUp = async (req, res) => {
  try {
    const { names, lastNames, email, phone, password, role, ocupation } =
      req.body;

    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      names,
      lastNames,
      email,
      phone,
      password: encryptedPassword,
      role,
      ocupation,
    });
    const savedUser = await user.save();
    const token = auth.createToken(savedUser?._id, savedUser?.email);
    const userResponse = {...savedUser._doc, token, password: undefined}
    res.status(201).json({ message: 'User created', data: userResponse });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Something goes wrong creating the user',
    });
  }
};

exports.logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const username = await User.findOne({ email });
    const credentialsValid =
      username && (await bcrypt.compare(password, username?.password));
    if (!credentialsValid) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }
    const token = auth.createToken(username?._id, username?.email);
    const userResponse = {...username._doc, token, password: undefined}
    res.status(200).json({ message: 'User logged', data: userResponse });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Something goes wrong login the user',
    });
  }
};

exports.getUserById = async (req, res) => {
  const { _id } = req.query;
  try{
    const user = await User.findById({_id}).populate('role');
    if(!user){
      res.status(404).json({ message: 'User not found' });
      return;
    }
    const token = auth.createToken(user?._id, user?.email);
    const userResponse = {...user._doc, token, password: undefined}
    res.status(200).json({ message: 'User found', data: userResponse });
    return;
  }
  catch(error){
    res.status(500).json({
      message: error.message || 'Something goes wrong getting the user',
    });
  }
};

exports.updateUser = async (req, res) => {
  const { names, lastNames, imageProfileURL, payPerHour, payPerService, city, ocupation, role, phone, _id } = req.body;
  try{
    let userToUpdate = {
      ...( !Helper.isNullOrWhiteSpace(names) && { names } ),
      ...( !Helper.isNullOrWhiteSpace(lastNames) && { lastNames } ),
      ...( !Helper.isNullOrWhiteSpace(imageProfileURL) && { imageProfileURL } ),
      ...( !Helper.isNullOrWhiteSpace(payPerHour) && { payPerHour } ),
      ...( !Helper.isNullOrWhiteSpace(payPerService) && { payPerService } ),
      ...( !Helper.isNullOrWhiteSpace(city) && { city } ),
      ...( !Helper.isNullOrWhiteSpace(ocupation) && { ocupation } ),
      ...( !Helper.isNullOrWhiteSpace(phone) && { phone } ),
    }
    const response = await User.findByIdAndUpdate(_id, userToUpdate, {new: true}).populate('role');
    if(!response){
      res.status(404).json({ message: 'User not found' });
      return;
    }
    const token = auth.createToken(response?._id, response?.email);
    const userResponse = {...response._doc, token, password: undefined} 
    res.status(200).json({ message: 'User updated', data: userResponse });
  }
  catch(error){
    res.status(500).json({
      message: error.message || 'Something goes wrong updating the user',
    });
  }
};