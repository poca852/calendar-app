import Swal from 'sweetalert2';
import { types } from '../types/types';
import { fetchConToken, fetchSinToken } from "../components/helpers/fetch";
import { eventLogout } from './events';

export const startLogin = (email, password) => {
    return async (dispatch) => {
        const resp = await fetchSinToken('auth/login', { email, password }, 'POST');
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime())

            dispatch(login({
                uid: body.id,
                name: body.name
            }))
        } else {
            Swal.fire('Error', body.msg, 'error')
        }

    }
}

export const startRegister = (name, email, password) => {
    return async (dispatch) => {
        const resp = await fetchSinToken('usuarios', { email, password, name }, 'POST');
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime())

            dispatch(login({
                uid: body.id,
                name: body.name
            }))
        } else {
            console.log(body)
            Swal.fire('Error', body.msg, 'error')
        }
    }
}

export const startChecking = () => {
    return async (dispatch) => {
        const resp = await fetchConToken('auth/renew');
        const body = await resp.json();
        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime())

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        } else {
            dispatch(checkingFinish())
        }
    }
}

const checkingFinish = () => ({
    type: types.authCheckingFinish
})

const login = (payload) => ({
    type: types.authLogin,
    payload
});

export const startLogout = () => {
    return async(dispatch) => {
        localStorage.clear();
        dispatch(eventLogout())
        dispatch(logout())
    }
}

const logout = () => ({
    type: types.authLogout
})