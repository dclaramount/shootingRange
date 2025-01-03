import React from 'react';
import Popup from "reactjs-popup";
import { WeekSelector } from './Components/WeekSelector';
import { BookingsViewerWrapper } from './Components/BookingsViewer/BookingsViewerWrapper';
import { ManagementPopUp } from './Components/BookingsViewer/ManagementPopUp';
import { EditBookingsContext } from '../../Context/EditBookingsContext';
import { EditBookingsContextType, WeekSelectorUpdatedCallBackType } from '../../../Shared/types';

export function ManagementDashboard () {
  const EditBookingsCtx: EditBookingsContextType = React.useContext( EditBookingsContext )
  const [showCalendar, setShowCalendar] = React.useState( false );
  const { showUpPopUp, setShowUpPopUp } = EditBookingsCtx;
  const closeModal: ( e: any ) => void = ( e: any ) => {
    setShowUpPopUp( false );
  }
  const WeekSelectorUpdated: ( parameters: WeekSelectorUpdatedCallBackType ) => void = React.useCallback( ( parameters: WeekSelectorUpdatedCallBackType ) => {
    EditBookingsCtx.setWeekSelector( parameters );
    setShowCalendar( true );
  }, [] );
  console.log( `Re Render the ManagementDashboard ${new Date()}` );
  console.log( EditBookingsCtx.selectedSegment );
  return (
    <div className="wrapperPopUp" style={{ opacity: `${showUpPopUp ? '0.5' : '1'}`, pointerEvents: `${showUpPopUp ? 'none' : 'auto'}` }}>
      <WeekSelector CallBackFc={WeekSelectorUpdated} {...EditBookingsCtx} />
      {showCalendar && < BookingsViewerWrapper {...EditBookingsCtx} />}
      <Popup open={showUpPopUp} onClose={closeModal} closeOnDocumentClick={false} >
        <ManagementPopUp closeModalFunction={closeModal} globalVariabes={EditBookingsCtx.globalVariables} filteredBookings={EditBookingsCtx.weekSelector.filteredBookings} {...EditBookingsCtx} />
      </Popup>
    </div >
  )
}