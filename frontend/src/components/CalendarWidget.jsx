import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarWidget = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white">
      <h2 className="text-xl font-bold mb-4">Upcoming Schedules</h2>
      <Calendar
        onChange={setDate}
        value={date}
        className="bg-white rounded-lg"
      />
      <p className="mt-4 text-gray-300">
        Selected Date: <span className="font-semibold">{date.toDateString()}</span>
      </p>
    </div>
  );
};

export default CalendarWidget;
