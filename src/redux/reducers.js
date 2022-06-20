import {
    LOGOUT,
    LOGIN,
    UPDATE_PROFILE,
    MODAL,
    GROUP,
    CLASS,
    PROFS,
    LOADER,
    FILTEREDLESSON,
} from './types';

const initialState = {
    authToken: null,
};

const initialUserState = {
    name: '',
    role: '',
    profile: {},
};

const initialClass = {
    subjectsInf: [],
};

const initialGroup = {
    groupList: [],
};

const initialProfs = {
    professorList: [],
};

export const appReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case LOGIN:
            return { ...state, authToken: payload };
        case LOGOUT:
            return { ...initialState, ...payload };
        default:
            return state;
    }
};

export const userReducer = (state = initialUserState, action) => {
    const { type, payload } = action;

    switch (type) {
        case UPDATE_PROFILE:
            return { ...state, profile: { ...state, ...payload } };
        default:
            return state;
    }
};

export const modalReducer = (state = false, action) => {
    const { type, payload } = action;

    switch (type) {
        case MODAL:
            return { modal: payload };
        default:
            return state;
    }
};

export const loaderReducer = (state = false, action) => {
    const { type, payload } = action;

    switch (type) {
        case LOADER:
            return payload;
        default:
            return state;
    }
};

export const classReducer = (state = initialClass, action) => {
    const { type, payload } = action;

    switch (type) {
        case CLASS:
            return { subjectsInf: payload };
        default:
            return state;
    }
};

export const professorReducer = (state = initialProfs, action) => {
    const { type, payload } = action;

    switch (type) {
        case PROFS:
            return { professorList: { ...payload } };
        default:
            return state;
    }
};

export const filterLessonReducer = (state = [], action) => {
    const { type, payload } = action;

    switch (type) {
        case FILTEREDLESSON:
            return { lessonFilterName: { ...payload } };
        default:
            return state;
    }
};

export const groupReducer = (state = initialGroup, action) => {
    const { type, payload } = action;

    switch (type) {
        case GROUP:
            return { groupList: [...payload] };
        default:
            return state;
    }
};
