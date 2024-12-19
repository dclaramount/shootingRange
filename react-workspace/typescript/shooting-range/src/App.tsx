import React from 'react';
import './App.css';
import { WrapperManagementDashboard } from './shooting-range-input/WrapperManagementDashboard';
import { TextPlaceholder } from './shooting-range-title/PlaceHolderBookingSection';
import { Translations } from './shooting-range-title/types/translations';
import * as trs from "./Shared/Translations";
import { CustomResponse, ManagementPluginPayload } from './Shared/types';
import { apiCallsManagementPlugIn, initializeCustomerResponseObject } from './Shared/GeneralAPIHelpers';
import { API_REQUEST_STATUS } from './Shared/enums';

function App () {
  const [renderTime, SetRenderTime] = React.useState( new Date() );
  const apiCalls: React.MutableRefObject<CustomResponse> = React.useRef<CustomResponse>( initializeCustomerResponseObject() );
  React.useEffect( () => {
    async function FetchData (): Promise<void> {
      apiCalls.current = await apiCallsManagementPlugIn();
      if ( apiCalls.current.status === API_REQUEST_STATUS.SUCCESS ) { SetRenderTime( new Date() ) }
    }
    FetchData();
  }, [] )
  return (
    <div className="App" style={{ overflowY: 'scroll', maxHeight: '100vh' }}>
      <style>
        <link rel="stylesheet" href="https://strelniceprerov.cz/wp-admin/css/bw-bootstrap-strelnice.css" />
        <link rel="stylesheet" href="https://strelniceprerov.cz/wp-admin/css/bw-calendar.css" />
        <link rel="stylesheet" href="https://strelniceprerov.cz/wp-admin/css/bw-front-strelnice.css" />
        <link rel="stylesheet" href="https://strelniceprerov.cz/wp-admin/css/bw-print-strelnice.css" />
        <link rel="stylesheet" href="https://strelniceprerov.cz/wp-admin/css/bw-reboot-strelnice.css" />
        <link rel="stylesheet" href="https://strelniceprerov.cz/wp-admin/css/bw-reservation-strelnice.css" />
        <link rel="stylesheet" href="https://strelniceprerov.cz/wp-admin/css/bw-honest-week-picker.css" />
        <link rel="stylesheet" href="https://strelniceprerov.cz/wp-admin/css/bw-allmin.css" />
        <link rel="stylesheet" href="https://strelniceprerov.cz/wp-admin/css/bw-dx-material-blue-light.css" />
        <link rel="stylesheet" href="https://strelniceprerov.cz/wp-admin/css/bw-dx-demo-template.css" />
      </style>
      <header className="App-header" style={{ minHeight: '5vh' }}>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Creating Shooting Range Plugins
        </a>
      </header>
      {/*<WrapperReservationManagement/>*/}
      <hr></hr>
      {/* {(Object.keys(globalVariables).length > 0 && waitDone) ? <WrapperBooking gVariables={globalVariables}/> : <div style={{width:'100%', height:'882px'}}><TextPlaceholder text={Translations.LoadingPlaceholder}/></div>} */}
      <hr />
      {apiCalls.current.status === API_REQUEST_STATUS.LOADING ? <div style={{ width: '100%', height: '800px' }}><TextPlaceholder text={trs.Translations.Tex_Loading_Management_Dashboard} /></div> : ( apiCalls.current.status < API_REQUEST_STATUS.BAD_REQUEST ? <WrapperManagementDashboard {...apiCalls.current.payload as ManagementPluginPayload} /> : <>FAILURE</> )}
    </div>
  );
}

export default App;