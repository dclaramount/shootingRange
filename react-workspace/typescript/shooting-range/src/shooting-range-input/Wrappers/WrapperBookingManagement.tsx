import React from 'react';
import { REQUEST_STATUS } from '../ApiCalls/enums';
import { useGetEndPoint } from '../ApiCalls/useGetEndPoint';
import { ManagementDashboardContext } from '../Context/ManagementDashboardContext';
import {Spinner } from '../shared/Placeholders';
import { BookingManagementProvider } from '../Context/BookingManagementContext';
import { BookingManagementSpace } from '../Spaces/BookingManagementSpace/BookingManagementSpace';

const WrapperBookingManagement = () => {
  
  let dataFetched                           =   false;
  const   {globalVariabes}                  =   React.useContext(ManagementDashboardContext);
  const fetchAllInstructorsFromDB           =   useGetEndPoint(globalVariabes.apiRootURL, 'getAllInstructors');
  const fetchInstructorSegmentsFromDB       =   useGetEndPoint(globalVariabes.apiRootURL, 'getAllInstructorSegments');
  const fetchInfoInstructorsFromDB          =   useGetEndPoint(globalVariabes.apiRootURL, 'getInfoInstructors');
  const fetchSummaryBookingsFromDB          =   useGetEndPoint(globalVariabes.apiRootURL, 'getSummaryBookings');
  const fetchAllInvoicesFromDB              =   useGetEndPoint(globalVariabes.apiRootURL, 'getAllInvoices');
  const fetchAllShootingRangesFromDB        =   useGetEndPoint(globalVariabes.apiRootURL, 'getListShootingRange');


  dataFetched                               =   fetchAllInstructorsFromDB.requestStatus       === REQUEST_STATUS.SUCCESS &&
                                                fetchInstructorSegmentsFromDB.requestStatus   === REQUEST_STATUS.SUCCESS  &&
                                                fetchInfoInstructorsFromDB.requestStatus      === REQUEST_STATUS.SUCCESS  &&
                                                fetchSummaryBookingsFromDB.requestStatus      === REQUEST_STATUS.SUCCESS  &&
                                                fetchAllInvoicesFromDB.requestStatus          === REQUEST_STATUS.SUCCESS  &&
                                                fetchAllShootingRangesFromDB.requestStatus    === REQUEST_STATUS.SUCCESS
  return(
  <>
    {dataFetched ? 
      <BookingManagementProvider  gVariables={globalVariabes}                                 iList={fetchAllInstructorsFromDB.payload}                   iSegmentList={fetchInstructorSegmentsFromDB.payload}
                                  infoInstructorsFromDB={fetchInfoInstructorsFromDB.payload}  summaryBookingsFromDB={fetchSummaryBookingsFromDB.payload}  allInvoicesFromDB={fetchAllInvoicesFromDB.payload}
                                  serviceListFromDB={fetchAllShootingRangesFromDB.payload}>
        <BookingManagementSpace/>
      </BookingManagementProvider>
      :
      <div style={{width:'100%', height:'800px'}}>
        <Spinner/>
      </div>
    }
  </>
 )
}
export default WrapperBookingManagement;