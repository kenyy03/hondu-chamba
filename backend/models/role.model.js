const mongooose = require('mongoose');

const roleSchema = new mongooose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, default: '' },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

module.exports = mongooose.model('roles', roleSchema);