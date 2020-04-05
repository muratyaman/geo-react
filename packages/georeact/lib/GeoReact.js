function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ERRORS } from './constants';
import { haversineDistanceInMetres } from './math';
import { GeoPos } from './GeoPos';

class GeoReact extends Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "onLocationSuccess", newPosition => {
      try {
        console.info('GeoReact.onLocationSuccess', newPosition);
        if (this.unmounting) return;
        const {
          lastPosition
        } = this.state;
        this.setState({
          lastPosition: newPosition
        });
        const {
          onChange,
          distanceThresholdInMetres
        } = this.props;
        let callback = false;

        if (lastPosition) {
          const distanceInMetres = haversineDistanceInMetres(new GeoPos(lastPosition), new GeoPos(newPosition));

          if (distanceThresholdInMetres < distanceInMetres) {
            callback = true;
          }
        } else {
          // there was no distance before
          callback = true;
        }

        if (callback) {
          onChange(newPosition);
        }
      } catch (err) {
        console.error('GeoReact.onLocationSuccess ERROR', err);
      }
    });

    _defineProperty(this, "onLocationError", err => {
      try {
        console.error('GeoReact.onLocationError', err);
        if (this.unmounting) return;
        const error = err.code && ERRORS.hasOwnProperty(err.code) ? ERRORS[err.code] : err.message;
        this.setState({
          error
        });
      } catch (err0) {
        console.error('GeoReact.onLocationError ERROR', err0);
      }
    });

    _defineProperty(this, "initWatching", () => {
      try {
        const {
          enableHighAccuracy,
          timeout,
          maximumAge
        } = this.props;
        const options = {
          enableHighAccuracy,
          timeout,
          maximumAge
        };
        this.setState({
          watching: true
        });
        this.watcherId = this.geo.watchPosition(this.onLocationSuccess, this.onLocationError, options);
      } catch (err) {
        console.error('GeoReact.initWatching ERROR', err);
      }
    });

    this.unmounting = false;
    this.watcherId = null;
    this.geo = null;
    this.state = {
      watching: false,
      error: null,
      lastPosition: null
    };
  } // see https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPosition


  componentDidMount() {
    try {
      if (window && window.navigator && window.navigator.geolocation) {
        this.geo = window.navigator.geolocation;
        this.initWatching();
      }
    } catch (err) {
      console.error('GeoReact.componentDidMount ERROR', err);
    }
  }

  componentWillUnmount() {
    try {
      this.unmounting = true;

      if (this.watcherId) {
        this.geo.clearWatch(this.watcherId);
      }
    } catch (err) {
      console.error('GeoReact.componentWillUnmount ERROR', err);
    }
  }

  render() {
    return null;
  }

}

GeoReact.propTypes = {
  onChange: PropTypes.func,
  enableHighAccuracy: PropTypes.bool,
  timeout: PropTypes.number,
  maximumAge: PropTypes.number,
  distanceThresholdInMetres: PropTypes.number
};
GeoReact.defaultProps = {
  onChange: position => {},
  enableHighAccuracy: false,
  timeout: Infinity,
  maximumAge: 0,
  distanceThresholdInMetres: 10
};
export default GeoReact;