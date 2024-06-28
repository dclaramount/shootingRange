import React from 'react';
import { REQUEST_STATUS } from '../ApiCalls/enums';
import { useGetEndPoint } from '../ApiCalls/useGetEndPoint';
import { ManagementDashboardContext } from '../components/Context/ManagementDashboardContext';
import { InstructorsCalendarProvider } from '../components/Context/InstructorCalendarContext';
import { InstructorCalendarManagement } from '../Spaces/InstructorCalendarSpace/InstructorCalendarManagement';

const WrapperInstructorCalendar = () => {
  let dataFetched                           =   false;
  const   {globalVariabes}                  =   React.useContext(ManagementDashboardContext);
  const fetchListOfInstructors              =   useGetEndPoint(globalVariabes.apiRootURL, 'getAllInstructors');
  const fetchInstructorSegments             =   useGetEndPoint(globalVariabes.apiRootURL, 'getAllInstructorSegments');
  dataFetched                               =   fetchListOfInstructors.requestStatus  === REQUEST_STATUS.SUCCESS &&
                                                fetchInstructorSegments.requestStatus === REQUEST_STATUS.SUCCESS
  return(
  <div>
    {dataFetched ? 
      <InstructorsCalendarProvider gVariables={globalVariabes} iList={fetchListOfInstructors.payload} iSegmentList={fetchInstructorSegments.payload}>
        <InstructorCalendarManagement/>
      </InstructorsCalendarProvider>
      :
      <div>
        PLACEHOLDER
      </div>
    }
  </div>
 )
}
export default WrapperInstructorCalendar;