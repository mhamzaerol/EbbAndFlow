import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { 
  diaryRecordsReducer,
  moodRecordsReducer,
  seagullChatsReducer,
  fontSizeReducer,
  requireAuthenticationReducer,
  pageHistoryReducer,
  isAuthenticatedReducer,
  curDateReducer,
} from 'src/redux/reducers';

export const store = configureStore({
  reducer: {

    // persistent data reducers
    diaryRecordsReducer: diaryRecordsReducer,
    moodRecordsReducer: moodRecordsReducer,
    seagullChatsReducer: seagullChatsReducer,
    fontSizeReducer: fontSizeReducer,
    requireAuthenticationReducer: requireAuthenticationReducer,
    
    // temporary data reducers
    pageHistoryReducer: pageHistoryReducer,
    isAuthenticatedReducer: isAuthenticatedReducer,
    curDateReducer: curDateReducer,
  
  },
  middleware: [thunk],
});
