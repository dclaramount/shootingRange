import React from 'react';
import { REQUEST_STATUS } from '../ApiCalls/enums';
import { useGetEndPoint } from '../ApiCalls/useGetEndPoint';
import { TextPlaceholder } from '../shared/Placeholders';
import {ManagementDashboardContext} from "../components/Context/ManagementDashboardContext";
import {AdminBookingsProvider} from "../components/Context/AdminBookingsContext";
import {endOfWeek, startOfWeek} from "date-fns";
import {Translations} from "../types/translations";
import {AdminBookingSpace} from "../Spaces/AdminBookingSpace/AdminBookingSpace";

const WrapperAdminBookings = () => {
    const   thisWeek                            =   { firstDay: startOfWeek(new Date(), { weekStartsOn: 1 }), lastDay: endOfWeek(new Date(), { weekStartsOn: 1 })}       //The start week is THIS week.
    let     dataFetched                         =   false;

    //Fetching required information from the DB prior to loading the dashboard
    const   {globalVariabes: globalVariables}   =   React.useContext(ManagementDashboardContext);
    const   fetchListOfLocations                =   useGetEndPoint(globalVariables.apiRootURL, 'getListShootingRange');
    const   fetchFilteredBookingsByWeek         =   useGetEndPoint(globalVariables.apiRootURL, 'getBookingsFiltered',`firstDayOfWeek=${(new Date(thisWeek.firstDay)).toISOString()}&lastDayOfWeek=${(new Date(thisWeek.lastDay)).toISOString()}&location=${parseInt(globalVariables.defaultLocation)}`);
    const   fetchInstructorSegments             =   useGetEndPoint(globalVariables.apiRootURL, 'getAllInstructorSegments');
    const   fetchSummaryBookings                =   useGetEndPoint(globalVariables.apiRootURL, 'getSummaryBookings');
    const   fetchSummaryInstructorBookings      =   useGetEndPoint(globalVariables.apiRootURL, 'getSummaryInstBookings');
    const   fetchBlockingSegments               =   useGetEndPoint(globalVariables.apiRootURL, 'getAllBlockingSegments');

    dataFetched                                 =
        fetchListOfLocations.requestStatus              === REQUEST_STATUS.SUCCESS &&
        fetchFilteredBookingsByWeek.requestStatus       === REQUEST_STATUS.SUCCESS &&
        fetchInstructorSegments.requestStatus           === REQUEST_STATUS.SUCCESS &&
        fetchSummaryBookings.requestStatus              === REQUEST_STATUS.SUCCESS &&
        fetchSummaryInstructorBookings.requestStatus    === REQUEST_STATUS.SUCCESS &&
        fetchBlockingSegments.requestStatus             === REQUEST_STATUS.SUCCESS


    return(
        <>
            {dataFetched ?
                <AdminBookingsProvider gVariables={globalVariables}
                                       startLocationList={fetchListOfLocations.payload}
                                       startBookingsList={fetchFilteredBookingsByWeek.payload}
                                       startInstructorsSegmentList={fetchInstructorSegments.payload}
                                       startSummaryBookingsList={fetchSummaryBookings.payload}
                                       startSumInstBookingSegments={fetchSummaryInstructorBookings.payload}
                                       blockedSegmentList={fetchBlockingSegments.payload}
                                       startBlockingSegmentList={fetchBlockingSegments.payload}
                                       locationsList={fetchListOfLocations.payload}
                                       thisWeek={thisWeek}>
                    <div><AdminBookingSpace/></div>
                </AdminBookingsProvider>
                :
                <div style={{width:'100%', height:'800px'}}>
                    <TextPlaceholder text={Translations.Loading}/>
                </div>
            }
        </>
    )
}
export default WrapperAdminBookings;