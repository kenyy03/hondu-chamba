const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    message: { type: String, required: true },
    files: { type: Array, default: [] },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

module.exports = mongoose.model('chats', chatSchema);
