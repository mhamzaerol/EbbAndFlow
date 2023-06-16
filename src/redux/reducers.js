import { GO_NEXT_PAGE, GO_PREV_PAGE, SET_MOOD, DEL_MOOD, AUTH_SUCCESSFUL } from "src/redux/actions";
import { persistentInitialState, temporaryInitialState } from 'src/redux/initialState';

// Persistent Data Reducers
export const diaryRecordsReducer = (state = persistentInitialState.diaryRecords, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export const moodRecordsReducer = (state = persistentInitialState.moodRecords, action) => {
    switch (action.type) {
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
        default:
            return state;
    }
}

export const fontSizeReducer = (state = persistentInitialState.fontSize, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export const requireAuthenticationReducer = (state = persistentInitialState.requireAuthentication, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

// Temporary Data Reducers
export const pageHistoryReducer = (state = temporaryInitialState.pageHistory, action) => {
    switch (action.type) {
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
        default:
            return state;
    }
}

export const curDateReducer = (state = temporaryInitialState.curDate, action) => {
    switch (action.type) {
        default:
            return state;
    }
}
