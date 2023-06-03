// first, define the types
export const SET_SLIDER_VALUE = 'SET_SLIDER_VALUE';
export const SET_APP_PAGE = 'SET_APP_PAGE';

// then, define the actions
export const setSliderValue = (sliderId, value) => dispatch => {
    dispatch({
        type: SET_SLIDER_VALUE,
        payload: { sliderId, value },
    });
};

export const setAppPage = (pageName) => dispatch => {
    dispatch({
        type: SET_APP_PAGE,
        payload: { pageName }
    });
}
