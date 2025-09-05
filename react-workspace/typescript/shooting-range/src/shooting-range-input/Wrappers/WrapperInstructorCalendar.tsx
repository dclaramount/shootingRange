import React from 'react';
import { REQUEST_STATUS } from '../ApiCalls/enums';
import { useGetEndPoint } from '../ApiCalls/useGetEndPoint';
import { ManagementDashboardContext } from '../Context/ManagementDashboardContext';
import { InstructorsCalendarProvider } from '../Context/InstructorCalendarContext';
import { InstructorCalendarManagement } from '../Spaces/InstructorCalendarSpace/InstructorCalendarManagement';
import {Spinner, TextPlaceholder} from '../shared/Placeholders';
import {Translations} from "../types/translations";

const WrapperInstructorCalendar = () => {
  let dataFetched                           =   false;
  const   {globalVariabes}                  =   React.useContext(ManagementDashboardContext);
  const fetchListOfInstructors              =   useGetEndPoint(globalVariabes.apiRootURL, 'getAllInstructors');
  const fetchInstructorSegments             =   useGetEndPoint(globalVariabes.apiRootURL, 'getAllInstructorSegments');
  dataFetched                               =   fetchListOfInstructors.requestStatus  === REQUEST_STATUS.SUCCESS &&
                                                fetchInstructorSegments.requestStatus === REQUEST_STATUS.SUCCESS
  return(
  <>
    {dataFetched ? 
      <InstructorsCalendarProvider gVariables={globalVariabes} iList={fetchListOfInstructors.payload} iSegmentList={fetchInstructorSegments.payload}>
        <InstructorCalendarManagement />
      </InstructorsCalendarProvider>
      :
      <div style={{width:'100%', height:'800px'}}>
        <TextPlaceholder text={Translations.Loading}/>
      </div>
    }
  </>
 )
}
export default WrapperInstructorCalendar;