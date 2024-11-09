import FullCalendar, { EventDropArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import BootstrapTheme from '@fullcalendar/bootstrap';
import { EventInput } from '@fullcalendar/core';
import { Col } from 'react-bootstrap';

const Calendar = ({ onDateClick, onEventClick, onDrop, onEventDrop, events, Title }) => {

    const disabledDates = events.map(event => new Date(event.start).toISOString().split('T')[0]);

    const handleDateClick = (arg) => {
        const eventDate = arg.dateStr;
        if (disabledDates.includes(eventDate)) {
            return;
        }
        onDateClick(arg);
    };

    const handleEventClick = (arg) => {
        onEventClick(arg);
    };

    return (
        <>
            {/* full calendar control */}
            <Col md={4}>
                <h4 style={{ lineHeight: '100%' }}>
                    {' '}
                    {Title}
                </h4>
            </Col>
            <div id="calendar">
                <FullCalendar
                    initialView="dayGridMonth"
                    plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin, BootstrapTheme]}
                    handleWindowResize={true}
                    themeSystem="bootstrap"
                    buttonText={{
                        today: 'Today',
                        // month: 'Month',
                        // week: 'Week',
                        // day: 'Day',
                        // list: 'List',
                        prev: 'Prev',
                        next: 'Next',
                    }}
                    headerToolbar={{
                        left: '',
                        center: 'title',
                        right: 'prev,next today',
                        // right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
                    }}
                    editable={false}
                    selectable={true}
                    droppable={false}
                    events={events}
                    dateClick={handleDateClick}
                    eventClick={handleEventClick}
                    displayEventTime={false}
                // drop={handleDrop}
                // eventDrop={handleEventDrop}
                />
            </div>
        </>
    );
};

export default Calendar;
