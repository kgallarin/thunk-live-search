export const FETCH_IMAGES = "FETCH_IMAGES";
export const QUERY_IMAGES = "QUERY_IMAGES";
export const REFRESH_ACTION = "REFRESH_ACTION";
export const RECEIVE_IMAGES = "RECEIVE_IMAGES";
export const REQUEST_IMAGES = "REQUEST_IMAGES";
export const RECEIVE_IMAGES_DEFAULT = "RECEIVE_IMAGES_DEFAULT";

// being dispatched inside componentWillReceiveProps
export const inputSearchQueryAction = inputSearchQueryPload => ({
  type: QUERY_IMAGES,
  inputSearchQueryPload
});

export const refreshAction = refreshPload => ({
  type: REFRESH_ACTION,
  refreshPload
});

export const receiveImages = (receiveImagesPload, jsonData) => ({
  type: RECEIVE_IMAGES,
  receiveImagesPload,
  images: jsonData.results.map(response => response),
  receivedAt: Date.now()
});

//connected to processedDataImages in Reducers
export const requestImages = requestedImagePload => ({
  type: REQUEST_IMAGES,
  requestedImagePload
});

// connected from requestImages and fetchImagesIfNeeded action functions
export const fetchImages = imageQueryFilter => dispatch => {
  dispatch(requestImages(imageQueryFilter));
  return fetch(
    `https://api.unsplash.com/search/photos?per_page=20&query=${imageQueryFilter}&client_id=${
      process.env.REACT_APP_UP_KEY
    }`
  )
    .then(response => response.json())
    .then(jsonFetched =>
      dispatch(receiveImages(imageQueryFilter, jsonFetched))
    );
};

// default images async action
export const receiveImagesDefault = jsonData => ({
  type: RECEIVE_IMAGES_DEFAULT,
  jsonData
});

const shouldAppFetchImagesData = (state, fetchImagesData) => {
  const imagesFromState = state.processedDataImages[fetchImagesData];

  if (!imagesFromState) {
    return true;
  }
  if (imagesFromState.isFetching) {
    return false;
  }
  return imagesFromState.refreshAction;
};

export const fetchImagesIfNeeded = fetchNeededImages => (
  dispatch,
  getState
) => {
  if (shouldAppFetchImagesData(getState(), fetchNeededImages)) {
    return dispatch(fetchImages(fetchNeededImages));
  }
};
