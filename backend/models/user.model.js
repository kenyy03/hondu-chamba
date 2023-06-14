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
    imageProfile: { 
      publicId: { type: String, default: '' },
      url: { type: String, default: '' }
     },
    payPerHour: { type: Number, default: 0 },
    payPerService: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    hoursWorked: { type: Number, default: 0 },
    servicesDone: { type: Number, default: 0 },
    servicesCanceled: { type: Number, default: 0 },
    servicesCanceledByClient: { type: Number, default: 0 },
    habilities: { type: Array, default: [], ref: 'habilities' },
    isPublicProfile: { type: Boolean, default: false },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  }
);

module.exports = mongoose.model('User', userSchema);