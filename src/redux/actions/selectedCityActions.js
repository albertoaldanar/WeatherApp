export const SET_SELECTED_CITY = 'SET_SELECTED_CITY';

export default function setSelectedCity(object) {
    return {
      type: SET_SELECTED_CITY,
      payload: object
    }
}
