const mongoose = require('mongoose');

const ACTIVITY_TYPES = [
  "car_travel",
  "flight",
  "electricity_usage",
  "natural_gas_usage",
  "public_transport",
  "meat_consumption",
  "waste_generated",
  "water_usage",
  "bus_travel",
  "train_travel",
  "motorcycle_travel",
  "lpg_usage",
  "coal_usage",
  "paper_usage",
  "recycling",
];

const activitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ACTIVITY_TYPES,
    required: true,
  },
  inputData: {
    type: mongoose.Schema.Types.Mixed,  // flexible input based on activity type
    required: true,
  },
  emission: {
    type: Number,  // in kg CO2e
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Activity', activitySchema);
