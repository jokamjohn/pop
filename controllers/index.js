const express = require('express');
const router = express.Router({});
const Location = require('../models/location');
const response = require('../helpers/utils').response;

router.post('/location', async (req, res, next) => {
  try {
    const location = new Location({
      name: req.body['name'],
      male: req.body['male'],
      female: req.body['female']
    });
    await location.save();
    await res.status(201).send(response('success', {
      name: location.name,
      female: location.female,
      male: location.male,
      subLocations: location.subLocations
    }));
  } catch (error) {
    next(error)
  }
});

module.exports = router;

