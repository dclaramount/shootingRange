import * as React from 'react';
import {EditBookingsContext} from "../../Common/Contexts/EditBookingsContext.";
import {EditBookingsContextType} from "../../Common/Types/interfaces";
import {WeekSelector} from "../../Common/Components/WeekSelector/WeekSelector";
import * as Components from "./EditBookingSpace"

//Main Component of the Tab for Edit Bookings and Reservation
export function EditBookings() {
    const cEditBookings : EditBookingsContextType = React.useContext(EditBookingsContext);
    const closeModal = (e : any) => {cEditBookings.setShowBookingsSummaryOverlay(false)}
    return(
        <div className="wrapperPopUp" style={{opacity:`${cEditBookings.showBookingsSummaryOverlay ? '0.5' : '1'}`, pointerEvents:`${cEditBookings.showBookingsSummaryOverlay ? 'none' : 'auto'}`}}>
            <WeekSelector context={cEditBookings}/>
            <Components.BookingsCalendarWrapper/>
        </div>
    )
}