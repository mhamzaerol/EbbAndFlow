import { SET_SLIDER_VALUE } from "src/redux/actions";
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
