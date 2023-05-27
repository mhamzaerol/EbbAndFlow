// first, define the types
export const SET_SLIDER_VALUE = 'SET_SLIDER_VALUE';

// then, define the actions
export const setSliderValue = (sliderId, value) => dispatch => {
    dispatch({
        type: SET_SLIDER_VALUE,
        payload: { sliderId, value },
    });
};
