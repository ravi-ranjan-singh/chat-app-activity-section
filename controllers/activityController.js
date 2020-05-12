const Activity = require('./../models/activityModel');

exports.getAllActivities = async (req, res, next) => {
  const activities = await Activity.find({}).sort({ 'votes.diff': -1 });
  res.status(200).json({
    status: 'success',
    data: {
      activities,
    },
  });
};

exports.getActivity = async (req, res, next) => {
  const activity = await Activity.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      activity,
    },
  });
};

exports.addActivity = async (req, res, next) => {
  if (req.file) {
    let file = {
      Ftype: req.file.mimetype.split('/')[0],
      name: req.file.filename,
    };
    req.body.file = file;
  }
  if (!req.body.location) {
    req.body.location = {
      coordinates: ['77.206612', '28.524578'],
    };
  }
  if (req.body.votes) {
    req.body.votes.diff = req.body.votes.up - req.body.votes.down;
  }
  const activity = await Activity.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      activity,
    },
  });
};

exports.updateActivity = async (req, res, next) => {
  if (req.body.votes) {
    req.body.votes.diff = req.body.votes.up - req.body.votes.down;
  }
  const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      activity,
    },
  });
};

exports.deleteActivity = async (req, res, next) => {
  const activity = await Activity.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
  });
};

exports.getActivityWithin = async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lng, lat] = latlng.split(',');
  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;
  if (!lat || !lng) {
    console.log(error);
  }
  console.log(lat, lng, unit, radius);
  const activities = await Activity.find({
    'location.coordinates': {
      $geoWithin: { $centerSphere: [[lng, lat], radius] },
    },
  });
  res.status(200).json({
    status: 'success',
    data: {
      activities,
    },
  });
};
