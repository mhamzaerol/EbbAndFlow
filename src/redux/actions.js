// first, define the types
export const SET_SLIDER_VALUE = 'SET_SLIDER_VALUE';
export const GO_NEXT_PAGE = 'GO_NEXT_PAGE';
export const GO_PREV_PAGE = 'GO_PREV_PAGE';

// then, define the actions
export const setSliderValue = (sliderId, value) => dispatch => {
    dispatch({
        type: SET_SLIDER_VALUE,
        payload: { sliderId, value },
    });
};

export const goNextPage = (pageName) => dispatch => {
    dispatch({
        type: GO_NEXT_PAGE,
        payload: { pageName },
    });
}

export const goPrevPage = () => dispatch => {
    dispatch({
        type: GO_PREV_PAGE,
    });
}
