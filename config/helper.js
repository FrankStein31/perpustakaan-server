class Helper {
    CreateCompositeKey(email, password) {
        return `${email}-${password}`;
    }

    CheckGeoInOut(centerCoordinate, currentCoordinate) {
        const { lat, long } = currentCoordinate;
        const { latitude, longitude, radius} = centerCoordinate;
        const haversineDistance = (lat1, lon1, lat2, lon2) => {
          const toRadians = (degree) => (degree * Math.PI) / 180;
          const earthRadius = 6371000;
    
          const lat1Rad = toRadians(lat1);
          const lat2Rad = toRadians(lat2);
          const deltaLat = toRadians(lat2 - lat1);
          const deltaLon = toRadians(lon2 - lon1);
    
          const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
          const distance = earthRadius * c;
          return distance;
        };
    
        const distanceToOrigin = haversineDistance(lat, long, latitude, longitude);
        if (distanceToOrigin <= radius) {
          return true;
        }
        return false;
    }
}

module.exports = new Helper();