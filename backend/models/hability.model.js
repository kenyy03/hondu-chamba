const mongooose = require('mongoose');

const habilitiesSchema = new mongooose.Schema(
  {
    title: { type: String, required: true, unique: true },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

module.exports = mongooose.model('habilities', habilitiesSchema);