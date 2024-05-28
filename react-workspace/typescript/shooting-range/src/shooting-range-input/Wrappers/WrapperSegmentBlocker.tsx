import React from 'react';
import { REQUEST_STATUS } from '../ApiCalls/enums';
import { useGetEndPoint } from '../ApiCalls/useGetEndPoint';
import { ManagementDashboardContext } from '../Context/ManagementDashboardContext';
import { SegmentBlockerProvider } from '../Context/SegmentBlockerContext';
import { SegmentBlockerCalendar } from '../Spaces/SegmentBlockerSpace/SegmentBlockerCalendar';

const WrapperSegmentBlocker = () => {
  let dataFetched                           =   false;
  const   {globalVariabes}                  =   React.useContext(ManagementDashboardContext);
  const fetchListOfInstructors              =   useGetEndPoint(globalVariabes.apiRootURL, 'getAllInstructors');
  dataFetched                               =   fetchListOfInstructors.requestStatus  === REQUEST_STATUS.SUCCESS
  return(
  <>
    {dataFetched ? 
      <SegmentBlockerProvider gVariables={[]}>
        <SegmentBlockerCalendar/>
      </SegmentBlockerProvider>
      :
      <div>
        PLACEHOLDER
      </div>
    }
  </>
 )
}
export default WrapperSegmentBlocker;