import { BookingCalendarWrappper } from "./BookingCalendarWrapper";
import { RenderHeader } from "./RenderHeader";
import { BookingContext } from "./Context/BookingContext";
import React from 'react';

export function WrapperBooking() {

  const [timesToShow, setTimesToShow] = React.useState(["08", "09","10","11","12","13","14","15","16","17","18","19","20","21"]); 
  const [daysOfWeek, setDaysOfWeek] = React.useState([]); 
  const [selectedWeek, setSelectedWeek] = React.useState([]); 

  return(
  <BookingContext.Provider value={{timesToShow, setTimesToShow, daysOfWeek, setDaysOfWeek, selectedWeek, setSelectedWeek}}>
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <div className="reservation">
          <RenderHeader/>
          <BookingCalendarWrappper/>
        </div>
      </div>
    </div>
  </div>
  </BookingContext.Provider>
)}