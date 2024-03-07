import { BookingCalendarWrappper } from "./BookingCalendarWrapper";
import { RenderHeader } from "./RenderHeader";
import { BookingContext } from "./Context/BookingContext";
import React from 'react';
import { BookingFormWrapper } from "./BookingFormWrapper";
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export function WrapperBooking() {

  const [timesToShow, setTimesToShow]                           = React.useState(["08", "09","10","11","12","13","14","15","16","17","18","19","20","21"]); 
  const [daysOfWeek, setDaysOfWeek]                             = React.useState([]); 
  const [isoDaysOfWeek,setISODaysOfWeek]                        = React.useState([]);
  const [selectedWeek, setSelectedWeek]                         = React.useState([]); 
  const [bookings,setBookings]                                 = React.useState([]); 
  const [selectedLocation, setSelectedLocation]                 = React.useState(1);
  const [locationList, setLocationList]                         = React.useState([]);
  const [selectedSegment, setSelectedSegment]                   = React.useState("");
  const [selectedBookingDuration, setSelectedBookingDuration]   = React.useState(1);
  const [selectedOccupancy, setSelectedOccupancy]               = React.useState(1);
  const [shootingPermit, setShootingPermit]                     = React.useState(false);
  const [shootingPermitNumber, setShootingPermitNumber]         = React.useState("");
  const [shootingInstructor, setShootingInstructor]             = React.useState(false);
  const [name, setName]                                         = React.useState("");
  const [email, setEmail]                                       = React.useState("");
  const [phone, setPhone]                                       = React.useState("");
  const [showCalendar, setShowCalendar]                         = React.useState(false);


  React.useEffect(() =>{    
    axios({
      url: "https://strelniceprerov.cz/wp-content/plugins/elementor-addon/widgets/getListShootingRange.php",
      method: "GET",
  }).then((res) => {setLocationList(res.data)})
    .catch((err) => { console.log(err) });
  },[])

  const delayInMilliseconds = 5000; //1 second

  setTimeout(function() {
    setShowCalendar(true)
  }, delayInMilliseconds);

  return(
  <BookingContext.Provider value={{ timesToShow,              setTimesToShow, 
                                    daysOfWeek,               setDaysOfWeek, 
                                    isoDaysOfWeek,            setISODaysOfWeek,
                                    selectedWeek,             setSelectedWeek,
                                    bookings,                 setBookings,
                                    selectedLocation,         setSelectedLocation, 
                                    locationList,             setLocationList, 
                                    selectedSegment,          setSelectedSegment,
                                    selectedBookingDuration,  setSelectedBookingDuration,
                                    selectedOccupancy,        setSelectedOccupancy,
                                    shootingPermit,           setShootingPermit,
                                    shootingPermitNumber,     setShootingPermitNumber,
                                    shootingInstructor,       setShootingInstructor,
                                    name,                     setName,
                                    email,                    setEmail,
                                    phone,                    setPhone}}>
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