// Persistent Data Actions
export const SET_MOOD = 'SET_MOOD';
export const DEL_MOOD = 'DEL_MOOD';
export const RESET_APP = 'RESET_APP';
export const SET_AUTH = 'SET_AUTH';
export const SET_FONT_SIZE = 'SET_FONT_SIZE';
export const ADD_DIARY_RECORD = 'ADD_DIARY_RECORD';
export const DEL_DIARY_RECORD = 'DEL_DIARY_RECORD';

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

export const addDiaryRecord = (record) => ({
    type: 'ADD_DIARY_RECORD',
    payload: record
});

export const delDiaryRecord = (record) => ({
    type: 'DEL_DIARY_RECORD',
    payload: record
});
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
export const AUTH_SUCCESSFUL = 'AUTH_SUCCESSFUL';
export const SET_CUR_DATE = 'SET_CUR_DATE';

// export const goNextPage = (pageName) => dispatch => {
//     dispatch({
//         type: GO_NEXT_PAGE,
//         payload: { pageName },
//     });
// }
export function goNextPage(pageName, params = null) {
    return {
      type: GO_NEXT_PAGE,
      payload: {
        pageName,
        params,
      }
    };
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

export const setCurDate = (curDate) => dispatch => {
    dispatch({
        type: SET_CUR_DATE,
        payload: { curDate },
    });
}
