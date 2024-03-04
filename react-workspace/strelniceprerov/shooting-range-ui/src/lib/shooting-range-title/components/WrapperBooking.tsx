import { BookingCalendarWrappper } from "./BookingCalendarWrapper";
import { RenderHeader } from "./RenderHeader";
import { BookingContext } from "./Context/BookingContext";
import React from 'react';
import { BookingFormWrapper } from "./BookingFormWrapper";
import axios from 'axios';

export function WrapperBooking() {

  const [timesToShow, setTimesToShow] = React.useState(["08", "09","10","11","12","13","14","15","16","17","18","19","20","21"]); 
  const [daysOfWeek, setDaysOfWeek] = React.useState([]); 
  const [selectedWeek, setSelectedWeek] = React.useState([]); 
  const [locationList, setLocationList] = React.useState([]);



  React.useEffect(() =>{    
    axios({
      url: "https://strelniceprerov.cz/wp-content/plugins/elementor-addon/widgets/getListShootingRange.php",
      method: "GET",
  }).then((res) => {setLocationList(res.data)})
    .catch((err) => { console.log(err) });
  },[])

  return(
  <BookingContext.Provider value={{timesToShow, setTimesToShow, daysOfWeek, setDaysOfWeek, selectedWeek, setSelectedWeek, locationList, setLocationList}}>
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <div className="reservation">
          <RenderHeader/>
          <BookingCalendarWrappper/>
          <BookingFormWrapper />
        </div>
      </div>
    </div>
  </div>
  </BookingContext.Provider>
)}