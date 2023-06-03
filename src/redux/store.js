import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { sliderValueReducer, appPageReducer } from 'src/redux/reducers';

export const store = configureStore({
  reducer: {
    sliderValueReducer: sliderValueReducer,
    appPageReducer: appPageReducer,
  },
  middleware: [thunk],
});
