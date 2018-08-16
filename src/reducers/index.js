import { combineReducers } from "redux";
import {
  // RECEIVE_IMAGES_DEFAULT,
  QUERY_IMAGES,
  REFRESH_ACTION,
  REQUEST_IMAGES,
  RECEIVE_IMAGES
} from "../actions";

const inputSearchQueryValue = (state = "rainy", action) => {
  switch (action.type) {
    case QUERY_IMAGES:
      return action.inputSearchQueryPload;
    default:
      return state;
  }
};

// setting up images data states to be used in processedDataImages function
const imagesData = (
  state = { isFetching: false, didRefresh: false, dataItems: [] },
  action
) => {
  switch (action.type) {
    case REFRESH_ACTION: // see action refresh images
      return {
        ...state,
        didRefresh: true
      };
    case REQUEST_IMAGES: // see action request images
      return {
        ...state,
        isFetching: true,
        didRefresh: false
      };
    case RECEIVE_IMAGES: // see action receive images
      return {
        ...state,
        isFetching: false,
        didRefresh: false,
        dataItems: action.images,
        lastUpdated: action.receivedAt
      };
    default:
      return state;
  }
};

const processedDataImages = (state = {}, action) => {
  switch (action.type) {
    case REFRESH_ACTION:
    case REQUEST_IMAGES:
    case RECEIVE_IMAGES:
      return {
        ...state,
        [action.receiveImagesPload]: imagesData(
          state[action.receiveImagesPload],
          action
        )
      };
    // case RECEIVE_IMAGES_DEFAULT:
    //   return [...state, ...action.jsonData];
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  processedDataImages,
  inputSearchQueryValue
});

export default rootReducer;
