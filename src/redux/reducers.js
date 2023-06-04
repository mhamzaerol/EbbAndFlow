import { SET_SLIDER_VALUE, GO_NEXT_PAGE, GO_PREV_PAGE } from "src/redux/actions";


import { initialState } from 'src/redux/initialState';

export const sliderValueReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SLIDER_VALUE:
            return {
                ...state,
                temporaryData: {
                    ...state.temporaryData,
                    MoodTrackerViewData: {
                        ...state.temporaryData.MoodTrackerViewData,
                        [action.payload.sliderId]: action.payload.value
                    }
                }
            };
        default:
            return state;
    }
}

export const appPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case GO_NEXT_PAGE:
            return {
                ...state,
                temporaryData: {
                    ...state.temporaryData,
                    AppViewData: {
                        ...state.temporaryData.AppViewData,
                        pageHistory: [
                            ...state.temporaryData.AppViewData.pageHistory,
                            action.payload.pageName
                        ]
                    }
                }
            };
        case GO_PREV_PAGE:
            return {
                ...state,
                temporaryData: {
                    ...state.temporaryData,
                    AppViewData: {
                        ...state.temporaryData.AppViewData,
                        pageHistory: state.temporaryData.AppViewData.pageHistory.slice(0, -1)
                    }
                }
            };
        default:
            return state;
    }
}
