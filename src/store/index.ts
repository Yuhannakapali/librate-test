// import { createStore, applyMiddleware, combineReducers } from "redux";
// import thunk from "redux-thunk";
// export interface RootState {}

// const rootReducer = combineReducers({});

// const middleWares = applyMiddleware(thunk);

// export default createStore(rootReducer, middleWares);



import { configureStore } from '@reduxjs/toolkit';

import countryReducer from './CountrySlice';
export const store = configureStore({
  reducer: {
    countryReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;