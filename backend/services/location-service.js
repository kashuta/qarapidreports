const { Locations } = require('../db/models');

class LocationService {
  async getData() {
    const location = await Locations.findAll();
    return location;
  }

  async addData(name, id) {
    const location = await Locations.create({ name, id });
    return location;
  }

  async deleteData(name) {
    const data = await Locations.destroy({ where: { name } });
    return data;
  }
}

module.exports = new LocationService();
