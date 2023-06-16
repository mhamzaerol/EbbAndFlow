// Persistent Data Actions
export const SET_MOOD = 'SET_MOOD';
export const DEL_MOOD = 'DEL_MOOD';

export const setMood = (newMood) => dispatch => {
    dispatch({
        type: SET_MOOD,
        payload: { newMood },
    });
};

export const delMood = (date) => dispatch => {
    dispatch({
        type: DEL_MOOD,
        payload: { date },
    });
};

// Temporary Data Actions
export const SET_SLIDER_VALUE = 'SET_SLIDER_VALUE';
export const GO_NEXT_PAGE = 'GO_NEXT_PAGE';
export const GO_PREV_PAGE = 'GO_PREV_PAGE';
export const AUTH_SUCCESSFUL = 'AUTH_SUCCESSFUL';

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

export const authSuccessful = () => dispatch => {
    dispatch({
        type: AUTH_SUCCESSFUL,
    });
}
