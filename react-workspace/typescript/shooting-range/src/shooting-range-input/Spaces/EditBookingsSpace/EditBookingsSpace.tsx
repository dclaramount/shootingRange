import React from "react";
import {EditBookingsContext} from "../../../Common/Contexts/EditBookingsContext.";
import {useFetchEndPoint} from "../../../Common/useFetchEndPoint";
import {AllEndPointsSuccessFullyFetched, getStringGlobalVariable} from "../../../Common/Helpers";
import {EditBookingsContextType} from "../../../Common/Types/interfaces";
import {EditBookings} from "../../components/EditBookings";

export function EditBookingsSpace() {
    const   cEditBookingsContext : EditBookingsContextType      =       React.useContext(EditBookingsContext);

    const   listGlobalVariables                                 =       cEditBookingsContext.globalVariables;
    const   getBookingsFiltered                                 =       useFetchEndPoint(getStringGlobalVariable(listGlobalVariables,'apiURL').toString(), 'getBookingsFiltered', cEditBookingsContext.setBookingsFiltered, cEditBookingsContext.selectedWeek, `firstDayOfWeek=${new Date(cEditBookingsContext.selectedWeek.firstDay).toISOString()}&lastDayOfWeek=${new Date(cEditBookingsContext.selectedWeek.lastDay).toISOString()}&location=${cEditBookingsContext.selectedLocation}`);
    const   getBookingsSummary                                  =       useFetchEndPoint(getStringGlobalVariable(listGlobalVariables,'apiURL').toString(), 'getAllInvoices', cEditBookingsContext.setBookingsSummaryView);
    const   getInstructors                                      =       useFetchEndPoint(getStringGlobalVariable(listGlobalVariables,'apiURL').toString(), 'getAllInstructors', cEditBookingsContext.setInstructorsList, cEditBookingsContext.showBookingsSummaryOverlay);
    const   getAllInstructorsSegments                           =       useFetchEndPoint(getStringGlobalVariable(listGlobalVariables,'apiURL').toString(), 'getAllInstructorSegments', cEditBookingsContext.setFullInstructorSegments);
    const   getListFullServices                                 =       useFetchEndPoint(getStringGlobalVariable(listGlobalVariables,'apiURL').toString(), 'getListShootingRange', cEditBookingsContext.setServiceList);
    const   getSummaryBookings                                  =       useFetchEndPoint(getStringGlobalVariable(listGlobalVariables,'apiURL').toString(), 'getSummaryBookings', cEditBookingsContext.setSummaryBookingSegments);
    return (
    <div className={`Edit_Bookings_Space`}>
        {AllEndPointsSuccessFullyFetched([getBookingsFiltered, getBookingsSummary, getInstructors, getAllInstructorsSegments, getListFullServices, getSummaryBookings]) && <EditBookings/>}
    </div>
  );
}