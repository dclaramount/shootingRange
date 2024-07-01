import React from 'react';
import { REQUEST_STATUS } from '../ApiCalls/enums';
import { useGetEndPoint } from '../ApiCalls/useGetEndPoint';
import { ManagementDashboardContext } from '../Context/ManagementDashboardContext';
import { SegmentBlockerProvider } from '../Context/SegmentBlockerContext';
import { SegmentBlockerCalendar } from '../Spaces/SegmentBlockerSpace/SegmentBlockerCalendar';
import { Spinner } from '../shared/Placeholders';

const WrapperSegmentBlocker = () => {
  let dataFetched                           =   false;
  const   {globalVariabes}                  =   React.useContext(ManagementDashboardContext);
  const fetchListOfLocations                =   useGetEndPoint(globalVariabes.apiRootURL, 'getAllLocations');
  const fetchBlockingSegments               =   useGetEndPoint(globalVariabes.apiRootURL, 'getAllBlockingSegments');
  dataFetched                               =   fetchListOfLocations.requestStatus  === REQUEST_STATUS.SUCCESS &&
                                                fetchBlockingSegments.requestStatus === REQUEST_STATUS.SUCCESS
  return(
  <>
    {dataFetched ? 
      <SegmentBlockerProvider gVariables={globalVariabes} blockedSegmentList={fetchBlockingSegments.payload} locationsList={fetchListOfLocations.payload}>
        <SegmentBlockerCalendar/>
      </SegmentBlockerProvider>
      :
      <div style={{width:'100%', height:'800px'}}>
        <Spinner/>
      </div>
    }
  </>
 )
}
export default WrapperSegmentBlocker;