import React from 'react';
import { REQUEST_STATUS } from '../ApiCalls/enums';
import { useGetEndPoint } from '../ApiCalls/useGetEndPoint';
import { Spinner } from '../shared/Placeholders';
import {ManagementDashboardContext} from "../components/Context/ManagementDashboardContext";
import {AdminBookingsProvider} from "../components/Context/AdminBookingsContext";

const WrapperAdminBookings = () => {
    let dataFetched                           =   false;
    const   {globalVariabes}                  =   React.useContext(ManagementDashboardContext);
    const fetchListOfLocations                =   useGetEndPoint(globalVariabes.apiRootURL, 'getAllLocations');
    const fetchBlockingSegments               =   useGetEndPoint(globalVariabes.apiRootURL, 'getAllBlockingSegments');
    dataFetched                               =   fetchListOfLocations.requestStatus  === REQUEST_STATUS.SUCCESS &&
        fetchBlockingSegments.requestStatus === REQUEST_STATUS.SUCCESS
    return(
        <>
            {dataFetched ?
                <AdminBookingsProvider gVariables={globalVariabes} blockedSegmentList={fetchBlockingSegments.payload} locationsList={fetchListOfLocations.payload}>
                    <div>PLACEHOLDER</div>
                </AdminBookingsProvider>
                :
                <div style={{width:'100%', height:'800px'}}>
                    <Spinner/>
                </div>
            }
            </>
    )
}
export default WrapperAdminBookings;