const mongooose = require('mongoose');

const categorySchema = new mongooose.Schema(
  {
    name: { type: String, required: true, unique: true },
    helperText: { type: String, default: '' },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

module.exports = mongooose.model('categories', categorySchema);