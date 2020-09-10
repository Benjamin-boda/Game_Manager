import {createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import gamesReducer from "../reducers/games";
import authReducer from "../reducers/auth";
import filterReducer from "../reducers/filters";



// Store creation

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            games: gamesReducer,
            auth: authReducer,
            filters: filterReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    return store;
};