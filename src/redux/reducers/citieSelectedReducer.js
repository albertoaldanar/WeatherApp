import { SET_SELECTED_CITY } from "../actions/locationDataActions";

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
      case SET_SELECTED_CITY: {
        return {...state, ...action.payload}
      }
      default:
        return state
    }
}

