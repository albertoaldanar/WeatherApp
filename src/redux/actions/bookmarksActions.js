export const SET_BOOKMARKS_LIST = 'SET_BOOKMARKS_LIST';

export default function setBookmarksList(object) {
    
    return {
      type: SET_BOOKMARKS_LIST,
      payload: object
    }
}
