import React from 'react';
import Popup from "reactjs-popup";
import { WeekSelector } from './Components/WeekSelector';
import { BookingsViewerWrapper } from './Components/BookingsViewer/BookingsViewerWrapper';
import { ManagementDashboardContext } from '../../components/Context/ManagementDashboardContext';
import { ManagementPopUp } from './Components/BookingsViewer/ManagementPopUp';
/*-------------------------------------------------------------------------------------------------------------*/
/*                                            HELPER FUNCTIONS                                                 */
/*-------------------------------------------------------------------------------------------------------------*/
const reArrangeInstructorSegments = (instructorSegments: any) => {
  const respArray : any[] = [];
  instructorSegments.forEach((entry : any) => {
    const index = respArray.findIndex((item) => item.guid === entry.guid);
    if((instructorSegments.filter((entrySegment : any) => entrySegment.guid===entry.guid).length===1)&&index===-1){
      respArray.push(entry);
    }
    else if((instructorSegments.filter((entrySegment : any) => entrySegment.guid===entry.guid).length>1)&&index===-1){
      const filterItems = instructorSegments.filter((entrySegment : any) => entrySegment.guid===entry.guid);
      const firstItem = filterItems.shift(0);
      const id              = firstItem.id;
      let   startSegment    = firstItem.startTime;
      let   endSegment      = firstItem.endTime;
      const instructorId    = firstItem.instructorId; 
      const instructorName  = firstItem.instructorName;
      const guid            = firstItem.guid;

      filterItems.forEach((filterEntry : any) =>{
        if((filterEntry.startTime < startSegment)){startSegment=filterEntry.startTime}
        if((filterEntry.endTime > endSegment)){endSegment=filterEntry.endTime}
      })
      respArray.push({
        id: id,
        instructorId : instructorId,
        instructorName: instructorName, 
        guid: guid, 
        startTime: startSegment,
        endTime: endSegment
      })
    }
  });
  return(respArray);
}

export function ManagementDashboard() {
  const {showUpPopUp, setShowUpPopUp} = React.useContext(ManagementDashboardContext);
  const closeModal = (e : any) => {
    setShowUpPopUp(false);
  }
  return(
    <div className="wrapperPopUp" style={{opacity:`${showUpPopUp ? '0.5' : '1'}`, pointerEvents:`${showUpPopUp ? 'none' : 'auto'}`}}>
      <WeekSelector/>
      <BookingsViewerWrapper/>
       <Popup open={showUpPopUp} onClose={closeModal} closeOnDocumentClick={false} >
        <ManagementPopUp closeModalFunction={closeModal}/>
       </Popup>
    </div>
)}