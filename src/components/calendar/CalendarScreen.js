import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navbar } from '../ui/Navbar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { messages } from '../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import 'moment/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarModal } from './CalendarModal';
import {uiOpenModal} from '../../actions/ui'
import { clearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es')
const localizer = momentLocalizer(moment)

// const events= [{
//     title: 'Cumple del jefe',
//     start: moment().toDate(),
//     end: moment().add(2, 'hours').toDate(),
//     bgColor: '#Fafafa',
//     notes: 'comprar el pastel',
//     user: {
//         _id: '123',
//         name: 'david'
//     }
// }]

export const CalendarScreen = () => {


    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar)
    const {uid} = useSelector(state => state.auth);

    const [lasView, setLastView] = useState(localStorage.getItem('lasview') || 'month');

    useEffect(() => {
        dispatch(eventStartLoading())
    }, [dispatch]);

    const onDoubleClick = (e) => {
        dispatch(uiOpenModal())
    }

    const onSelectEvent = (e) => {
        dispatch(eventSetActive(e))
    }

    const onViewChanges = (e) => {
        setLastView(e);
        localStorage.setItem('lasview', e)
    }

    const onSelectSlot = (e) => {
        dispatch(clearActiveEvent())
    }

    const eventStyleGetter = (event, start, end, isSelected) => {

        const style = {
            backgroundColor: (uid === event.user._id) ? '#367cf7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white' 
        }

        return {
            style
        }
    }

    return (
        <div className="calendar-screen">
            <Navbar />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChanges}
                onSelectSlot={onSelectSlot}
                selectable={true}
                messages={messages}
                view={lasView}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent
                }}
            />

            <AddNewFab />
            {
                activeEvent && <DeleteEventFab />
            }

            <CalendarModal />
        </div>
    )
}
