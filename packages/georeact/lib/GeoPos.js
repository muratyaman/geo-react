export class GeoPos {
  constructor(pos = null) {
    this.latitude = 0.0;
    this.longitude = 0.0;

    try {
      if (pos) {
        const {
          coords
        } = pos;

        if (coords) {
          const {
            latitude,
            longitude
          } = coords;
          this.latitude = latitude;
          this.longitude = longitude;
        }
      }
    } catch (err) {// error
    }
  }

}