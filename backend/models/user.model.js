const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema(
  {
    names: { type: String, required: true },
    lastNames: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true, unique: true },
    password: { type: String, required: true, default: '' },
    role: { type: ObjectId, ref: 'roles', default: null },
    ocupation: { type: String, required: true },
    city: { type: String, default: '' },
    imageProfileURL: { type: String, default: '' },
    payPerHour: { type: Number, default: 0 },
    payPerService: { type: Number, default: 0 },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  }
);

module.exports = mongoose.model('User', userSchema);