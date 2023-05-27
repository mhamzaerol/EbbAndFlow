// import { SET_USER_NAME, SET_USER_AGE, INCREASE_AGE } from './actions';
import { SET_SLIDER_VALUE } from "src/redux/actions";

const initialState = {
    MoodTrackerHorizontalSlider: 0,
    MoodTrackerVerticalSlider: 0,
}

function sliderValueReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SLIDER_VALUE:
            return { ...state, [action.payload.sliderId]: action.payload.value };
        default:
            return state;
    }
}

export default sliderValueReducer;