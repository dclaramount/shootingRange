import React from 'react';
import Popup from "reactjs-popup";
import { WeekSelector } from './Components/WeekSelector';
import { ManagementPopUp } from './Components/BookingsViewer/ManagementPopUp';
import { EditBookingsContext } from '../../components/Context/EditBookingsContext';
import { EditBookingsContextType, WeekSelectorUpdatedCallBackType } from 'shooting-range-ui/src/lib/shared/types';
import { BookingsViewerWrapper } from './Components/BookingsViewer/BookingsViewerWrapper';

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