export const SET_LOCATION_DATA = 'SET_LOCATION_DATA';

export default function changeLocationState(object) {
    return {
      type: SET_LOCATION_DATA,
      payload: object
    }
}
