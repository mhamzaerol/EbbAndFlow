import { SET_SLIDER_VALUE, GO_NEXT_PAGE, GO_PREV_PAGE, SET_MOOD, DEL_MOOD } from "src/redux/actions";
import { initialState } from 'src/redux/initialState';

// Persistent Data Reducers
export const diaryRecordsReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export const moodRecordsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MOOD:
            return {
                ...state,
                persistentData: {
                    ...state.persistentData,
                    moodRecords: state.persistentData.moodRecords.filter((moodRecord) => !moodRecord.check('date', action.payload.newMood.get('date'))).concat(action.payload.newMood)
                }
            };
        case DEL_MOOD:
            return {
                ...state,
                persistentData: {
                    ...state.persistentData,
                    moodRecords: state.persistentData.moodRecords.filter((moodRecord) => !moodRecord.check('date', action.payload.date))
                }
            };
        default:
            return state;
    }
}

export const seagullChatsReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export const fontSizeReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export const requireAuthenticationReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

// Temporary Data Reducers

export const pageHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GO_NEXT_PAGE:
            return {
                ...state,
                temporaryData: {
                    ...state.temporaryData,
                    pageHistory: [
                        ...state.temporaryData.pageHistory,
                        action.payload.pageName
                    ]
                }
            };
        case GO_PREV_PAGE:
            return {
                ...state,
                temporaryData: {
                    ...state.temporaryData,
                    pageHistory: state.temporaryData.pageHistory.slice(0, -1)
                }
            };
        default:
            return state;
    }
}

export const isAuthenticatedReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export const curDateReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}
