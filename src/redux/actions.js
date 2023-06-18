// Persistent Data Actions
export const SET_MOOD = 'SET_MOOD';
export const DEL_MOOD = 'DEL_MOOD';
export const RESET_APP = 'RESET_APP';
export const SET_AUTH = 'SET_AUTH';
export const SET_FONT_SIZE = 'SET_FONT_SIZE';

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

export const resetApp = () => dispatch => {
    dispatch({
        type: RESET_APP,
    });
}

export const setAuth = (isAuthenticated) => dispatch => {
    dispatch({
        type: SET_AUTH,
        payload: { isAuthenticated },
    });
}

export const setFontSize = (fontSize) => dispatch => {
    dispatch({
        type: SET_FONT_SIZE,
        payload: { fontSize },
    });
}

// Temporary Data Actions
export const GO_NEXT_PAGE = 'GO_NEXT_PAGE';
export const GO_PREV_PAGE = 'GO_PREV_PAGE';

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
