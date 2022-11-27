// The acquisition of the geolocation information failed because the page didn't have the permission to do it.
export const ERROR_PERMISSION_DENIED = 1;

// The acquisition of the geolocation failed because at least one internal source of position returned an internal error.
export const ERROR_POSITION_UNAVAILABLE = 2;

// The time allowed to acquire the geolocation, defined by PositionOptions.timeout information was reached before the information was obtained.
export const ERROR_TIMEOUT = 3;

export const ERRORS = {
  [ERROR_PERMISSION_DENIED]: 'permission denied',
  [ERROR_POSITION_UNAVAILABLE]: 'position unavailable',
  [ERROR_TIMEOUT]: 'timeout',
};
