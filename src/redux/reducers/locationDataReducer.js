import { SET_LOCATION_DATA } from "../actions/locationDataActions";

const initialState = {
  lat: 0, 
  lon: 0, 
  city: "", 
  units: "metric",
  currentMainData: {

  },
  hourlyData: [

  ],
  dailyData: [
    
  ], 
}

export default function(state = initialState, action) {
    switch (action.type) {
      case SET_LOCATION_DATA: {
        return {...state, ...action.payload}
      }
      default:
        return state
    }
}

