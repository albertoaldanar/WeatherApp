import { SET_BOOKMARKS_LIST } from "../actions/bookmarksActions";

const initialState = {data:  []}

export default function(state = initialState, action) {
    switch (action.type) {
      case SET_BOOKMARKS_LIST: {
        return {...state, ...action.payload}
      }
      default:
        return state
    }
}
