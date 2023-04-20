const { ErrorHandler, backendErrors } = require('../exceptions');

const locationService = require('../services/location-service');

class LocationController {
  async getLocation(req, res, next) {
    try {
      const location = await locationService.getLocationData();
      if (!location) {
        return next(ErrorHandler.InternalServerError(backendErrors.DATABASE_ERROR, res));
      }
      return res.json(location);
    } catch (err) {
      return next(ErrorHandler.InternalServerError(err, res));
    }
  }

  async addLocation(req, res, next) {
    const { addLocation } = req.body;
    const { name, managerId } = addLocation;
    try {
      const data = await locationService.addLocationData(name, managerId);
      if (!data) {
        return next(ErrorHandler.InternalServerError(backendErrors.DATABASE_ERROR, res));
      }
      return res.json({ message: 'Location added successfully' });
    } catch (err) {
      return next(ErrorHandler.InternalServerError(err, res));
    }
  }

  async deleteLocation(req, res, next) {
    try {
      const { name } = req.body;
      const data = await locationService.deleteLocationData(name);
      if (!data) {
        return next(ErrorHandler.InternalServerError(backendErrors.DATABASE_ERROR, res));
      }
      return res.json({ message: 'Location deleted successfully' });
    } catch (err) {
      return next(ErrorHandler.InternalServerError(err, res));
    }
  }
}

module.exports = new LocationController();
