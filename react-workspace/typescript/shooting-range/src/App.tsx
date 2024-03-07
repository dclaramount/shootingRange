import React from 'react';
import logo from './logo.svg';
import './App.css';
import { WrapperBooking } from './shooting-range-title/components/WrapperBooking';
import { WrapperReservationManagement } from './shooting-range-input/WrapperReservationManagement';

function App() {
  return (
    <div className="App">
      <style>
        {/*<link rel="stylesheet" href="https://strelniceprerov.cz/wp-admin/css/bw-bootstrap-strelnice.css"/>
        <link rel="stylesheet" href="https://strelniceprerov.cz/wp-admin/css/bw-calendar.css"/>
        <link rel="stylesheet" href="https://strelniceprerov.cz/wp-admin/css/bw-front-strelnice.css"/>
        <link rel="stylesheet" href="https://strelniceprerov.cz/wp-admin/css/bw-print-strelnice.css"/>
        <link rel="stylesheet" href="https://strelniceprerov.cz/wp-admin/css/bw-reboot-strelnice.css"/>
        <link rel="stylesheet" href="https://strelniceprerov.cz/wp-admin/css/bw-reservation-strelnice.css"/>
        <link rel="stylesheet" href="https://strelniceprerov.cz/wp-admin/css/bw-honest-week-picker.css"/>
  <link rel="stylesheet" href="https://strelniceprerov.cz/wp-admin/css/bw-allmin.css"/>
        <link rel="stylesheet" href="https://strelniceprerov.cz/wp-admin/css/bw-dx-material-blue-light.css"/>
        <link rel="stylesheet" href="https://strelniceprerov.cz/wp-admin/css/bw-dx-demo-template.css"/>*/}
      </style>
      <header className="App-header" style={{minHeight: '25vh'}}>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Creating Shooting Range Plugins        
        </a>
      </header>
      <h1>Management System</h1>
      <WrapperReservationManagement/>
      <hr></hr>
      {/*<WrapperBooking/>*/}
    </div>
  );
}

export default App;