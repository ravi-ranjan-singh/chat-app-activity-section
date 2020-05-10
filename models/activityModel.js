const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  time: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  location: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point'],
    },
    coordinates: [
      {
        type: Number,
        required: false,
      },
    ],
  },
  description: {
    required: true,
    type: String,
    trim: true,
  },
  file: {
    Ftype: String,
    name: String,
  },
  likes: {
    type: Number,
    default: 0,
  },
  tags: [String],
  eventType: {
    type: String,
    required: true,
    enum: [
      'LOST & FOUND',
      'BUY & SALE',
      'EVENTS',
      'ACTIVITY',
      'NEWS',
      'OPPORTUNITY',
      'MISCELLANEOUS',
    ],
  },
  votes: {
    up: { type: Number, default: 0 },
    down: { type: Number, default: 0 },
  },
});

activitySchema.index({ location: '2dsphere' });

const Activity = mongoose.model('activity', activitySchema);

module.exports = Activity;
