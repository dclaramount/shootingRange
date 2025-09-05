import React from 'react';
import { BookingManagementSpace } from '../Spaces/BookingManagementSpace/BookingManagementSpace';
import { Translations } from '../types/translations';
import { ManagementDashboardContext } from '../components/Context/ManagementDashboardContext';
import { API_REQUEST_STATUS } from '../../shared/enums';
import { PlaceHolderTabComponent } from '../../shared/Components';
import { apiCallsEditBookingsTab } from '../../shared/MultiAPICalls';
import { initializeCustomerResponseObject } from '../../shared/GeneralAPIHelpers';
import { CustomResponse, EditBookingsTabType } from '../../shared/types';
import { EditBookingsProvider } from '../components/Context/EditBookingsContext';

const WrapperBookingManagement = () => {
  const apiCalls: React.MutableRefObject<CustomResponse> = React.useRef<CustomResponse>( initializeCustomerResponseObject() );
  const [editBookingRenderTime, SetEditBookingRenderTime] = React.useState( new Date() );
  const { globalVariabes } = React.useContext( ManagementDashboardContext );
  /*-----------------------------------------------------------------------------------------------------------*/
  /*                          CALL OF APIS UPON RENDENRING THE TAB FOR EDITING RESERVATIONS                    */
  /*-----------------------------------------------------------------------------------------------------------*/
  React.useEffect( () => {
    async function FetchData (): Promise<void> {
      apiCalls.current = await apiCallsEditBookingsTab();
      if ( apiCalls.current.status === API_REQUEST_STATUS.SUCCESS ) { SetEditBookingRenderTime( new Date() ) }
    }
    FetchData();
  }, [] )
  return (
    <div className={`editBookingContainerTab`}>
      {
        apiCalls.current.status === API_REQUEST_STATUS.SUCCESS ?
          <EditBookingsProvider {...{ InputProps: apiCalls.current.payload as EditBookingsTabType, GlobalVariables: globalVariabes }} >
            <BookingManagementSpace />
          </EditBookingsProvider>
          :
          <div style={{ width: '100%', height: '800px' }}>
            <PlaceHolderTabComponent {...{ status: apiCalls.current.status, errorMessage: Translations.ErrorPlaceHolderTab, loadingMessage: Translations.Loading }} />
          </div>
      }
    </div >
  )
}
export default WrapperBookingManagement;