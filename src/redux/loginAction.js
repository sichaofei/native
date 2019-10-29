import * as types from './action-type.js';

export default function login(user) {
    return {
        type: types.LOGIN,
        user
    }
}

export function saveLocation(locate) {
    return {
        type: types.SAVE_LOCATION,
        locate
    }
}

export function logout() {
    return {
        type: types.LOGOUT
    }
}

export function changeFirst(first) {
    return {
        type: types.CHANGE_FIRST,
        first
    }
}