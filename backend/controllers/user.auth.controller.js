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
    savedUser.token = token;
    res.status(201).json({ message: 'User created', data: savedUser });
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
