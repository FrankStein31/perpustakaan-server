const db = require('../config/db');

class GeofanceModels {
    constructor(id, name, latitude, longitude, radius, is_deleted) {
        this.id = id;
        this.latitude = latitude;
        this.longitude = longitude;
        this.radius = radius;
        this.is_deleted = is_deleted;
    }

    static async findById(id) {
        try {
            const query = 'SELECT * FROM geofance WHERE id = ? AND is_deleted = 0';
            const result = await db.query(query, [id]);
            return result[0][0];
        } catch (error) {
            throw error
        }
    }
}

module.exports = GeofanceModels;