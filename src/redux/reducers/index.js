import { combineReducers } from  'redux';
import locationDataReducer from './locationDataReducer';
import selectedCityReducer from './citySelectedReducer';
import bookmarksReducer from './bookmarksReducer';

export default combineReducers({
    locationData: locationDataReducer, 
    selectedCityData: selectedCityReducer,
    bookmarksData: bookmarksReducer
});
