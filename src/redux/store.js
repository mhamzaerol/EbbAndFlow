import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistStore, persistReducer } from 'redux-persist'
import { combineReducers } from 'redux'
import {
  diaryRecordsReducer,
  moodRecordsReducer,
  seagullChatsReducer,
  fontSizeReducer,
  requireAuthenticationReducer,
  pageHistoryReducer,
  isAuthenticatedReducer,
  curDateReducer
} from 'src/redux/reducers'
import { DiaryRecord, MoodRecord, SeagullChat } from 'src/redux/datatypes'

const myStateReconciler = (inboundState, originalState) => {
  inboundState.persistentData.diaryRecords = inboundState.persistentData.diaryRecords.map(record => {
    if (record.class === 'DiaryRecord') {
      return new DiaryRecord(
        new Date(
          Date.parse(record.attr.date)
        ),
        record.attr.diaryTitle,
        record.attr.diaryStr
      )
    } else {
      return record
    }
  })

  inboundState.persistentData.moodRecords = inboundState.persistentData.moodRecords.map(record => {
    if (record.class === 'MoodRecord') {
      return new MoodRecord(
        new Date(
          Date.parse(record.attr.date)
        ),
        record.attr.intensity,
        record.attr.valence
      )
    } else {
      return record
    }
  })

  inboundState.persistentData.seagullChats = inboundState.persistentData.seagullChats.map(record => {
    if (record.class === 'SeagullChat') {
      return new SeagullChat(
        new Date(
          Date.parse(record.attr.date)
        ),
        record.attr.index,
        record.attr.isMrSeagull,
        record.attr.text
      );
    } else {
      return record;
    }
  });

  inboundState.temporaryData = originalState.temporaryData;

  return inboundState;
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'persistentData',
  ],
  blacklist: [
    'temporaryData',
  ],
  stateReconciler: myStateReconciler,
};

const persistentDataReducer = combineReducers({
  // persistent data reducers
  diaryRecords: diaryRecordsReducer,
  moodRecords: moodRecordsReducer,
  seagullChats: seagullChatsReducer,
  fontSize: fontSizeReducer,
  requireAuthentication: requireAuthenticationReducer,
});

const temporaryDataReducer = combineReducers({
  // temporary data reducers
  pageHistory: pageHistoryReducer,
  isAuthenticated: isAuthenticatedReducer,
  curDate: curDateReducer,
});

const rootReducer = combineReducers({
  persistentData: persistentDataReducer,
  temporaryData: temporaryDataReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
