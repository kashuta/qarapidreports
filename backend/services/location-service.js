const { Location } = require('../db/models');

class LocationService {
  async getLocationData() {
    const location = await Location.findAll();
    return location;
  }

  async addLocationData(name, managerId) {
    const location = await Location.create({ name, managerId });
    return location;
  }

  async deleteLocationData(name) {
    const data = await Location.destroy({ where: { name } });
    return data;
  }
}

module.exports = new LocationService();
