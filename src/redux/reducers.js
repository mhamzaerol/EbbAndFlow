import { SET_SLIDER_VALUE, SET_APP_PAGE } from "src/redux/actions";


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
        case SET_APP_PAGE:
            return {
                ...state,
                temporaryData: {
                    ...state.temporaryData,
                    AppViewData: {
                        ...state.temporaryData.AppViewData,
                        CurrentPage: action.payload.pageName,
                        PrevPage: state.temporaryData.AppViewData.CurrentPage,
                    }
                }
            };
        default:
            return state;
    }
}
