import React from 'react';
import { BookingContext } from "./Context/BookingContext";
import { WrapperBookingSection } from "./WrapperBookingSection";

export function WrapperBooking({gVariables, arrayOfHours} : any) {

  const buildArrayOfBusinessHours = (startHour : any, endHour : any) => {
    const Array = []
    let countStartHour = parseInt(startHour);
    console.log(endHour);
    while(countStartHour < parseInt(endHour)){
      if(countStartHour < 10){
        Array.push(`0${countStartHour}`);
      }
      else{
        Array.push(`${countStartHour}`);
      }
      countStartHour=countStartHour+1;
    }
    return Array;
  }
  const [timesToShow, setTimesToShow]                           = React.useState(buildArrayOfBusinessHours(gVariables.startBusinessHours, gVariables.endBusinessHours)); 
  const [daysOfWeek, setDaysOfWeek]                             = React.useState([]); 
  const [isoDaysOfWeek,setISODaysOfWeek]                        = React.useState([]);
  const [selectedWeek, setSelectedWeek]                         = React.useState([]); 
  const [bookings,setBookings]                                  = React.useState([]); 
  const [selectedLocation, setSelectedLocation]                 = React.useState(parseInt(gVariables.defaultLocation));
  const [locationList, setLocationList]                         = React.useState([]);
  const [selectedSegment, setSelectedSegment]                   = React.useState([]);
  const [selectedBookingDuration, setSelectedBookingDuration]   = React.useState(1);
  const [selectedOccupancy, setSelectedOccupancy]               = React.useState(1);
  const [shootingPermit, setShootingPermit]                     = React.useState(false);
  const [shootingPermitNumber, setShootingPermitNumber]         = React.useState("");
  const [shootingInstructor, setShootingInstructor]             = React.useState(false);
  const [name, setName]                                         = React.useState("");
  const [email, setEmail]                                       = React.useState("");
  const [phone, setPhone]                                       = React.useState("");
  const [showCalendar, setShowCalendar]                         = React.useState(false);
  const [availableSegments, setAvailableSegments]               = React.useState([]);
  const [notAvailableSegments, setNotAvailableSegments]         = React.useState([]);
  const [maxOccupancy, setMaxOccupancy]                         = React.useState(parseInt(gVariables.maxOccupancy));
  const [maxBookingLength, setMaxBookingLength]                 = React.useState(parseInt(gVariables.maxBookingLength));
  const [apiURL, setApiURL]                                     = React.useState(gVariables.apiRootURL);
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
                                    phone,                    setPhone,
                                    availableSegments,        setAvailableSegments,
                                    notAvailableSegments,     setNotAvailableSegments,
                                    maxOccupancy,             setMaxOccupancy,
                                    maxBookingLength,         setMaxBookingLength,
                                    apiURL,                   setApiURL
                                    }}>
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <div className="reservation">
          <WrapperBookingSection/>
        </div>
      </div>
    </div>
  </div>
  </BookingContext.Provider>
)}