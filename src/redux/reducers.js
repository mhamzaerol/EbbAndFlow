import { GO_NEXT_PAGE, GO_PREV_PAGE, SET_MOOD, DEL_MOOD, AUTH_SUCCESSFUL, SET_CUR_DATE, RESET_APP, SET_AUTH, SET_FONT_SIZE, ADD_DIARY_RECORD, DEL_DIARY_RECORD } from "src/redux/actions";
import { persistentInitialState, temporaryInitialState } from 'src/redux/initialState';

// Persistent Data Reducers
export const diaryRecordsReducer = (state = persistentInitialState.diaryRecords, action) => {
    switch (action.type) {
        case ADD_DIARY_RECORD:
            // Return a new array that includes the new diary record
            return [...state, action.payload];
        case DEL_DIARY_RECORD:
            // Return a new array that does not include the deleted diary record
            return state.filter(record => record !== action.payload);
        case RESET_APP:
            return persistentInitialState.diaryRecords;
        default:
            return state;
    }
}

export const moodRecordsReducer = (state = persistentInitialState.moodRecords, action) => {
    switch (action.type) {
        case RESET_APP:
            return persistentInitialState.moodRecords;
        case SET_MOOD:
            return state.filter((moodRecord) => !moodRecord.check('date', action.payload.newMood.get('date'))).concat(action.payload.newMood);
        case DEL_MOOD:
            return state.filter((moodRecord) => !moodRecord.check('date', action.payload.date));
        default:
            return state;
    }
}

export const seagullChatsReducer = (state = persistentInitialState.seagullChats, action) => {
    switch (action.type) {
        case RESET_APP:
            return persistentInitialState.seagullChats;
        default:
            return state;
    }
}

export const fontSizeReducer = (state = persistentInitialState.fontSize, action) => {
    switch (action.type) {
        case RESET_APP:
            return persistentInitialState.fontSize
        case SET_FONT_SIZE:
            return action.payload.fontSize;
        default:
            return state;
    }
}

export const requireAuthenticationReducer = (state = persistentInitialState.requireAuthentication, action) => {
    switch (action.type) {
        case SET_AUTH:
            return action.payload.isAuthenticated;
        case RESET_APP:
            return persistentInitialState.requireAuthentication;
        default:
            return state;
    }
}

// Temporary Data Reducers
export const pageHistoryReducer = (state = temporaryInitialState.pageHistory, action) => {
    switch (action.type) {
        case RESET_APP:
            return temporaryInitialState.pageHistory;
        case GO_NEXT_PAGE:
            return [
                ...state,
                action.payload.pageName
            ];
        case GO_PREV_PAGE:
            return state.slice(0, -1);
        default:
            return state;
    }
}

export const isAuthenticatedReducer = (state = temporaryInitialState.isAuthenticated, action) => {
    switch (action.type) {
        case AUTH_SUCCESSFUL:
            return true
        case RESET_APP:
            return temporaryInitialState.isAuthenticated;
        default:
            return state;
    }
}

export const curDateReducer = (state = temporaryInitialState.curDate, action) => {
    switch (action.type) {
        case SET_CUR_DATE:
            return action.payload.curDate;
        case RESET_APP:
            return temporaryInitialState.curDate;
        default:
            return state;
    }
};

// export const pageHistoryReducer = (state = temporaryInitialState.pageHistory, action) => {
//     switch (action.type) {
//       case GO_NEXT_PAGE:
//         return [
//           ...state,
//           {
//             pageName: action.payload.pageName,
//             params: action.payload.params,
//           }
//         ];
//       case GO_PREV_PAGE:
//         return state.slice(0, -1);
//       default:
//         return state;
//     }
// }
  