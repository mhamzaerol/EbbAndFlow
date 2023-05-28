import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { sliderValueReducer } from 'src/redux/reducers';

export const store = configureStore({
  reducer: {
    sliderValueReducer: sliderValueReducer,
  },
  middleware: [thunk],
});
