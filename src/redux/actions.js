import {
    LOGIN,
    LOGOUT,
    MODAL,
    UPDATE_PROFILE,
    GROUP,
    CLASS,
    PROFS,
    LOADER,
    FILTEREDLESSON,
} from './types';

export const appLogin = (payload) => {
    return async (dispatch) => {
        try {
            await localStorage.setItem('authToken', payload);

            dispatch({
                type: LOGIN,
                payload,
            });
        } catch (e) {
            console.error('Auth on fire', e);
        }
    };
};

export const appLogout = () => {
    return async (dispatch) => {
        try {
            await localStorage.clear();
            dispatch({ type: LOGOUT });
        } catch (e) {
            console.error('Log out on trouble', e);
        }
    };
};

export const updateProfile = (userData) => {
    return async (dispatch) => {
        try {
            await localStorage.setItem('user', JSON.stringify(userData));
            dispatch({
                type: UPDATE_PROFILE,
                payload: userData,
            });
        } catch (e) {
            console.error('Auth on fire', e);
        }
    };
};

export const modalView = (payload) => {
    return async (dispatch) => {
        try {
            await localStorage.setItem('modal', payload);
            dispatch({
                type: MODAL,
                payload: payload,
            });
        } catch (e) {
            console.error(e);
        }
    };
};

export const loadingView = (payload) => {
    return async (dispatch) => {
        try {
            await localStorage.setItem('isLoading', payload);
            dispatch({
                type: LOADER,
                payload: payload,
            });
        } catch (e) {
            console.error(e);
        }
    };
};

export const classesSetter = (data) => {
    return async (dispatch) => {
        try {
            await localStorage.setItem('classList', JSON.stringify(data));
            dispatch({
                type: CLASS,
                payload: data,
            });
        } catch (e) {
            console.error(e);
        }
    };
};

export const profsSetter = (data) => {
    return async (dispatch) => {
        try {
            await localStorage.setItem('professors', JSON.stringify(data));
            dispatch({
                type: PROFS,
                payload: data,
            });
        } catch (e) {
            console.error(e);
        }
    };
};

export const filterLessonSetter = (data) => {
    return async (dispatch) => {
        try {
            await localStorage.setItem('lessonsName', JSON.stringify(data));
            dispatch({
                type: FILTEREDLESSON,
                payload: data,
            });
        } catch (e) {
            console.error(e);
        }
    };
};

export const groupSetter = (arr) => {
    return async (dispatch) => {
        try {
            await localStorage.setItem('groupList', arr);
            dispatch({
                type: GROUP,
                payload: arr,
            });
        } catch (e) {
            console.error(e);
        }
    };
};
