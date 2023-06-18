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

export const ADD_DIARY_RECORD = 'ADD_DIARY_RECORD';
export const DEL_DIARY_RECORD = 'DEL_DIARY_RECORD';

export const addDiaryRecord = (record) => ({
    type: 'ADD_DIARY_RECORD',
    payload: record
});

export const delDiaryRecord = (record) => ({
    type: 'DEL_DIARY_RECORD',
    payload: record
});

// Temporary Data Actions
export const SET_SLIDER_VALUE = 'SET_SLIDER_VALUE';
export const GO_NEXT_PAGE = 'GO_NEXT_PAGE';
export const GO_PREV_PAGE = 'GO_PREV_PAGE';

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


export const SET_CUR_DATE = 'SET_CUR_DATE';

export const setCurDate = (date) => ({
  type: SET_CUR_DATE,
  payload: date,
});