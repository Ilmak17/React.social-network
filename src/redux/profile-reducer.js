import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'network/profile/ADD-POST';
const SET_USER_PROFILE = 'network/profile/SET_USER_PROFILE';
const SET_STATUS = 'network/profile/SET_STATUS';
const DELETE_POST = 'network/profile/DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'network/profile/SAVE_PHOTO_SUCCESS';
const SET_PROFILE_UPDATE_STATUS = 'network/profile/SET_PROFILE_UPDATE_STATUS';

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}
    ],
    profile: null,
    status: "",
    profileUpdateStatus: false,
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {id: 5, message: action.newPostElement, likesCount: 0};
            return {
                ...state,
                posts: [...state.posts, newPost]
            };

        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }

        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }

        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }

        case SET_PROFILE_UPDATE_STATUS:
            return {
                ...state,
                profileUpdateStatus: action.kind
            }
        default:
            return state;
    }
}

export const addPostActionCreator = (newPostElement) => ({type: ADD_POST, newPostElement})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status})
export const deletePost = (postId) => ({type: DELETE_POST, postId})
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos})
export const setProfileUpdateStatus = (kind) => ({type: SET_PROFILE_UPDATE_STATUS, kind})

export const getUserProfile = (userId) => {
    return async (dispatch) => {
        let response = await profileAPI.getProfile(userId);
        dispatch(setUserProfile(response.data));
    }
}

export const getStatus = (userId) => {
    return async (dispatch) => {
        let response = await profileAPI.getStatus(userId);
        dispatch(setStatus(response.data));
    }
}

export const updateStatus = (status) => {
    return async (dispatch) => {
        let response = await profileAPI.updateStatus(status);
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    }
}

export const savePhoto = (file) => {
    return async (dispatch) => {
        let response = await profileAPI.savePhoto(file);
        if (response.data.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.data.photos));
        }
    }
}

export const saveProfile = (profile) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        const response = await profileAPI.saveProfile(profile);
        if (response.data.resultCode === 0) {
            dispatch(setProfileUpdateStatus(true));
            dispatch(getUserProfile(userId));
        } else {
            dispatch(stopSubmit("editProfile", {_error: response.data.messages[0]}));
            dispatch(setProfileUpdateStatus(false));
        }
    }
}

export default profileReducer;