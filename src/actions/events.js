import Swal from "sweetalert2";
import { fetchConToken } from "../components/helpers/fetch";
import { preparaEvent } from "../components/helpers/prepararEvent";
import { types } from "../types/types";

export const eventStartAddNew = (event) => {
    return async (dispatch, getState) => {

        const { uid, name } = getState().auth;

        try {
            const resp = await fetchConToken('events', event, 'POST');
            const body = await resp.json()
            if (body.ok) {
                event.id = body.evento.id;
                event.user = {
                    _id: uid,
                    name: name
                }
                dispatch(eventAddNew(event))
            }
        } catch (error) {
            console.log(error)
        }
    }
}

const eventAddNew = (payload) => ({
    type: types.eventAddNew,
    payload
});

export const eventSetActive = (payload) => ({
    type: types.eventSetActive,
    payload
})

export const clearActiveEvent = () => ({
    type: types.eventClearActiveEvent
})

export const eventStartUpdate = (event) => {
    return async(dispatch) => {
        try {
            const resp = await fetchConToken(`events/${event.id}`, event, 'PUT')
            const body = await resp.json();

            if(body.ok){
                dispatch(eventUpdated(event))
            }else{
                Swal.fire('Error', body.msg, 'error')
            }
        } catch (error) {
            console.log(error)
        }
    }
}

const eventUpdated = (payload) => ({
    type: types.eventUpdated,
    payload
})

export const eventStartDelete = () => {
    return async(dispatch, getState) => {
        const {id} = getState().calendar.activeEvent;
        try {
            const resp = await fetchConToken(`events/${id}`, {}, 'DELETE')
            const body = await resp.json();

            if(body.ok){
                dispatch(eventDeleted())
            }else{
                Swal.fire('Error', body.msg, 'error')
            }
        } catch (error) {
            console.log(error)
        }
    }
}

const eventDeleted = () => ({
    type: types.eventDeleted
})

export const eventStartLoading = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken('events');
            const body = await resp.json()
            const eventos = preparaEvent(body.eventos);
            dispatch(eventLoaded(eventos))
        } catch (error) {
            console.log(error)
        }
    }
}

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
})

export const eventLogout = () => ({
    type: types.eventLogout
})