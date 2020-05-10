const express = require('express');
const Upload = require('./../utils/multerSetup');
const activityController = require('./../controllers/activityController');

const router = express.Router();

router
  .route('/')
  .get(activityController.getAllActivities)
  .post(Upload.single('activityFile'), activityController.addActivity);

router
  .route('/:id')
  .get(activityController.getActivity)
  .patch(activityController.updateActivity)
  .delete(activityController.deleteActivity);

router.get(
  '/activities-within/:distance/center/:latlng/unit/:unit',
  activityController.getActivityWithin
);


module.exports = router;
