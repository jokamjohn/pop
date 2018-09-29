const express = require('express');
const router = express.Router({});
const Location = require('../models/location');
const Utils = require('../helpers/utils');

/**
 * Load a location on every request that needs it.
 */
router.param('id', async (req, res, next, id) => {
  try {
    const location = await Utils.getLocation(id);
    if (!location) return next(Utils.Error('Location not found', 404));
    req.location = location;
    next();
  }
  catch (error) {
    next(error)
  }
});

/**
 * Get all locations
 * /api/v1/locations
 */
router.get('/locations', async (req, res, next) => {
  try {
    const locations = await Location.find({}).exec();
    return res.status(200).send(Utils.response('success', Utils.formatLocations(locations)));
  } catch (error) {
    next(error)
  }

});

/**
 * Add a location to the database
 */
router.post('/locations', async (req, res, next) => {
  try {
    const location = await Utils.saveLocation(req);
    await res.status(201).send(Utils.response('success', Utils.getLocationObject(location)));
  } catch (error) {
    next(error)
  }
});

/**
 * Return a location given the id
 * Also return the sublocations up to one level.
 * /api/v1/location/<id>
 */
router.get('/location/:id', async (req, res) => {
  const subLocations = req.location.subLocations;
  let subLocs = [];
  if (subLocations.length > 0){
    subLocs = await Utils.getSubLocations(subLocations);
  }
  const location = Object.assign({}, Utils.getLocationObject(req.location), { subLocations: subLocs });
  return res.status(200).send(Utils.getLocationObject(location));
});

/**
 * Add a sublocation to a location given its id.
 */
router.post('/add/sub/location/:id', async (req, res, next) => {
  try {
    const location = await Utils.saveLocation(req);
    req.location.update({ subLocation: location._id,
      updateSubLocation: true
    }, async function (err, updatedLocation) {
      if (err) return next(err);
      const subLocations = await Utils.getSubLocations(updatedLocation.subLocations);
      return res.status(201).send(Utils.response('success',
          Utils.getLocationObject(Object.assign(updatedLocation, { subLocations, id: updatedLocation._id }))));
    })
  }
  catch (error) {
    next(error)
  }
});

/**
 * Delete a location from the system/database
 * /api/v1/location/:id
 */
router.delete('/location/:id', (req, res, next) => {
  req.location.remove(function (err) {
    if (err) return next(Utils.Error('Failed to delete location', 500));
    return res.status(200).send({ message: 'Location deleted successfully' });
  })
});

/**
 * Update a location
 * /api/v1/location/:id
 */
router.put('/location/:id', (req, res, next) => {
  req.location.update(req.body, function (err, location) {
    if (err) return next(err);
    res.status(200).send(Utils.getLocationObject(location));
  })
});

module.exports = router;

