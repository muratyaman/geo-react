// aliases for Math lib function names
const [PI, asin, sin, cos, sqrt, pow, round] = [
  'PI', 'asin', 'sin', 'cos', 'sqrt', 'pow', 'round',
].map(k => Math[k]);

export const deg2rad = (deg) => {
  return PI * deg / 180.0;
};

/**
 * Haversine distance
 * @param GeoPos point1 { latitude, longitude }
 * @param GeoPos point2 { latitude, longitude }
 * @returns {number} in kilometres
 */

/**
 * Haversine distance
 * @param GeoPos pos1
 * @param GeoPos pos2
 * @returns {number}
 * @see https://rosettacode.org/wiki/Haversine_formula#ES6
 */
export const haversineDistanceInKM = (pos1, pos2) => {
  const { latitude: lat1, longitude: lon1 } = pos1;
  const { latitude: lat2, longitude: lon2 } = pos2;
  if ((lat1 === lat2) && (lon1 === lon2)) {
    return 0.0;
  }

  const [rlat1, rlat2, rlon1, rlon2] = [lat1, lat2, lon1, lon2]
    .map(x => deg2rad(x)),

    dLat = rlat2 - rlat1,
    dLon = rlon2 - rlon1,
    radius = 6372.8; // Earth's radius in km

  return round(
    radius * 2.0 * asin(
    sqrt(
      pow(sin(dLat / 2.0), 2.0) +
      pow(sin(dLon / 2.0), 2.0) * cos(rlat1) * cos(rlat2)
    )
    ) * 1000.0
  ) / 1000.0;
};

/**
 * Get distance in metres
 * @param pos1
 * @param pos2
 * @returns {number|*}
 */
export const haversineDistanceInMetres = (pos1, pos2) => {
  const { latitude: lat1, longitude: lon1 } = pos1;
  const { latitude: lat2, longitude: lon2 } = pos2;
  if ((lat1 === lat2) && (lon1 === lon2)) {
    return 0.0;
  }

  return round(haversineDistanceInKM(pos1, pos2) * 1000.0);
};

export default {
  haversineDistanceInKM, haversineDistanceInMetres,
};
