# Ebb And Flow

``Write the introduction and the purpose of the app here...``


# Development Guide
## Getting Started
### Prerequisites
Install the [Node.js](https://nodejs.org/en/), v18.16.0 (latest stable version for now).
Then, navigate to the project directory, and install the rest of the app-specific dependencies through the terminal:
```
npm install
```
### Running the App
#### Running on iOS
You should have X-code to be installed in your macbook. Then, run the following command in the terminal:
```
npm run ios
```
#### Running on Android
TODO
#### Running on Web
```
npm run web
```
#### Runing on production mode
TODO

### Updating the Packages
```
npm update
```
## Project Structure
### Directory Structure
```
ebb-and-flow/
├── assets/
│   ├── svg/
├── src/
│   ├── components/
│   ├── redux/
│   ├── screens/
```
## Data Model
### App Data Management Guidelines

This documentation outlines the three main methods used for data storage in our application and provides guidelines for deciding which method to use for a particular piece of data.

#### 1. Persistent Storage with Redux

Persistent storage is meant for data that needs to be stored for longer periods of time. This is typically used for user-related data, such as diaries and mood records.

- Ideal for storing user-related data that persists over time.
- Example use cases: Diaries, mood records.

#### 2. Temporary Storage with useState

Temporary storage with `useState` is ideal for app or component related data that can be deleted when it is no longer necessary. This method should only be used when the data doesn't need to be passed down to child components and only affects the component in which it's used.

- Suitable for app or component specific data.
- Data should not impact other components or be passed down to child components.
- Example use case: Face coordinates.

#### 3. Temporary Storage with Redux

Temporary storage with Redux is used for app or component related data that can be deleted when it is no longer necessary, but differs from `useState` in that it is used when data needs to be shared between different components or passed as a prop.

- Ideal for app or component related data that needs to be accessible globally.
- Data can be passed as a prop or shared across components.
- Example use cases: Slider values, previous page.

#### Guidelines for Implementing Data

When implementing data, please carefully consider which category it belongs to based on these guidelines. Doing so will ensure consistency and comprehensibility across our codebase. However, please don't let these decisions slow down your workflow excessively. If you're unsure, go with the method that feels most suitable in the moment, and we can always revisit the decision later if necessary.

### Redux Data Structure

The redux folder is structured as follows:    
```
redux/
├── actions.js
├── reducers.js
├── store.js
├── datatypes.js
├── initialState.js
```

#### actions.js

This file stores all the actions that can be dispatched to the redux store. Actions are used to initiate updating the specific piece of the redux store. Each action is a function that returns an object with a `type` and `payload` property. The `type` property is a string that describes the action, and the `payload` property is the data that is passed to the reducer. 

#### reducers.js

This file stores all the reducers that are used to update the redux store. Each reducer is a function that takes in the current state and an action as parameters and returns the updated state. The reducer function should be a pure function, meaning that it should not modify the state directly. Instead, it should return a new state object. Reducers are dedicated to updating a specific piece of the state, and the state should be broken down into smaller pieces to make it easier to manage.

#### store.js

This file creates the redux store and combines all the reducers into one. (TODO, later) It also creates a persistor object that is used to persist the redux store.

#### datatypes.js

This file stores the customized data types that are going to describe the persistent data in the redux store: `DiaryRecord`, `MoodRecord`, `MrSeagullChat`.

#### initialState.js

This file stores the initial state of the redux store. It has the following basic structure:
```
export const persistentInitialState = {
    diaryRecords: [],
    moodRecords: [],
    seagullChats: [
        new SeagullChat(new Date(1900, 1, 1), 0, false, "From now on, you are the personal assistant of me. Your task is to help me with my situation. Here is my diary of today:\n\n${userDiary}\n\n\
        Also, I provide you with my mood record:\n\n${userMood}\n\nPlease adjust your response accordingly. Namely, \
        please take the mood record into account when you respond to me and help me with what I mention you in my diary. \
        It is possible that I may not have provided a diary record or a mood record. In that case, adjust your response accordingly.\n\
        Do not forget that your role is to help me and improve my mood and feelings. Also, you should guide me as well!!"),
        new SeagullChat(new Date(1900, 1, 1), 1, true, "Hello, I am Mr. Seagull, your personal assistant.\n\nI checked your mood record and diary, and I am ready to assist you.\n\nIn case you want to discuss something specific, please let me know.\n\nOtherwise, I can share my help and advice on how to help you with your situation."),
    ],
    fontSize: 'Normal',
    requireAuthentication: true,
}

export const temporaryInitialState = {
    pageHistory: [
        'Home'
    ],
    isAuthenticated: false,
    curDate: new Date(2023, 5, 5),
}
```

### How to Use Redux

#### How to Add an Action

1. Open the `actions.js` file.
2. Add a new action function that returns an object with a `type` and `payload` property. The `type` property is a string that describes the action, and the `payload` property is the data that is passed to the reducer.

#### How to Add a Reducer

1. Open the `reducers.js` file. 
2. Add a new reducer function that takes in the current state and an action as parameters and returns the updated state. Do not forget to import the relevant action types from `actions.js`.
3. Open the `store.js` file.
4. Add the new reducer to the `configureStore` function's `reducer` parameter.

#### How to Subscribe to the Redux Store

In a react-native component, you can subscribe to the redux store by using the `useSelector` hook. The `useSelector` hook takes in a function that returns the piece of the state that you want to subscribe to. For example, if you want to subscribe to the `fontSize` property in the `persistentData` object, you can do the following:
```
const fontSize = useSelector(store => store.persistentData.fontSize);
```
Whenever the `fontSize` property in the `persistentData` object is updated, the `fontSize` variable will be updated as well, which will cause the component to re-render. 

#### How to Dispatch an Action

In order to update the redux store, you need to dispatch an action. In a react-native component, you can dispatch an action by using the `useDispatch` hook. The `useDispatch` hook returns a function that you can call to dispatch an action. For example, in the `actions.js` file, we have the following action:
```
export const setFontSize = (fontSize) => {
    return {
        type: SET_FONT_SIZE,
        payload: fontSize,
    };
};
```
In order to dispatch this action, you can do the following:
```
const dispatch = useDispatch();
dispatch(setFontSize('Large'));
```
This will update the `fontSize` property in the `persistentData` object to be `'Large'`.

#### How to Persist the Redux Store

In order to persist a part of the stored data in Redux, we make `persistConfig` and declare what part of the state to be persisted. In order to functionally apply this (namely, loading and saving), we implement a `stateReconciler` which loads the persisted data into the app, and we use `persistReducer` and `persistStore` to save the data. More details on how the reducers are configured and delegated as if to be persisted or not can be found in the `store.js` file. 
