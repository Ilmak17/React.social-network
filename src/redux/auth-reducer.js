import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'network/auth/SET_USER_DATA';
const TOGGLE_IS_FETCHING = 'network/auth/TOGGLE_IS_FETCHING';
const SET_CAPTCHA_URL_SUCCESS = 'network/auth/SET_CAPTCHA_URL_SUCCESS';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false,
    captchaUrl: null, // if null, then captcha is not required
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }

        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }

        case SET_CAPTCHA_URL_SUCCESS: {
            return {...state, captchaUrl: action.captchaUrl}
        }

        default:
            return state;
    }
}

export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
})
export const setToggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const setCaptcha = (captchaUrl) => ({type: SET_CAPTCHA_URL_SUCCESS, captchaUrl})

export const getAuthUserData = () => {
    return async (dispatch) => {
        dispatch(setToggleIsFetching(true));
        const response = await authAPI.me()
        if (response.data.resultCode === 0) {
            let {id, login, email} = response.data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }
    }
}

export const login = (email, password, rememberMe, captcha) => {
    return async (dispatch) => {
        dispatch(setToggleIsFetching(true));
        const response = await authAPI.login(email, password, rememberMe, captcha)
        if (response.data.resultCode === 0) {
            // success, get auth data
            dispatch(getAuthUserData());
        } else {
            if (response.data.resultCode === 10) {
                dispatch(getCaptchaUrl());
            }
            let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
            dispatch(stopSubmit("login", {_error: message}));
        }
    }
}

export const logout = () => {
    return async (dispatch) => {
        dispatch(setToggleIsFetching(true));
        const response = await authAPI.logout()
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
    }
}

export const getCaptchaUrl = () => {
    return async (dispatch) => {
        const response = await securityAPI.getCaptchaUrl();
        dispatch(setCaptcha(response.data.url));
    }
}

export default authReducer;