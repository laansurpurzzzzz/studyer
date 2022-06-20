import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {
    appReducer,
    userReducer,
    modalReducer,
    classReducer,
    groupReducer,
    professorReducer,
    loaderReducer,
    filterLessonReducer,
} from './reducers';

export const store = createStore(
    combineReducers({
        app: appReducer,
        user: userReducer,
        modal: modalReducer,
        classList: classReducer,
        groups: groupReducer,
        professors: professorReducer,
        loader: loaderReducer,
        filterLesson: filterLessonReducer,
    }),
    applyMiddleware(thunk),
);
