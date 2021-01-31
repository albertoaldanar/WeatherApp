import { combineReducers } from  'redux';
import locationDataReducer from './locationDataReducer';

export default combineReducers({
    locationData: locationDataReducer
});
