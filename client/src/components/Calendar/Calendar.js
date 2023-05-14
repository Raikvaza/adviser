import { useState } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css'
import "react-calendar/dist/Calendar.css";
const MyCalendar= () => {
    const [date, setDate] = useState(new Date());
  
    return (
          <>
          <Calendar onChange={setDate} value={date} />
          <span className='bold'>Selected Date:</span>{' '}
          {date.toDateString()}
          </>
      );
  }
  
  export default MyCalendar;