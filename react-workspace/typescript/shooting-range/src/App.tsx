import React from 'react';
import logo from './logo.svg';
import './App.css';
import { WrapperBooking } from './shooting-range-title/components/WrapperBooking';

function App() {
  return (
    <div className="App">
      <style>
        <link rel="stylesheet" href="https://strelniceprerov.cz/wp-admin/css/bw-bootstrap-strelnice.css"/>
        <link rel="stylesheet" href="https://strelniceprerov.cz/wp-admin/css/bw-calendar.css"/>
        <link rel="stylesheet" href="https://strelniceprerov.cz/wp-admin/css/bw-front-strelnice.css"/>
        <link rel="stylesheet" href="https://strelniceprerov.cz/wp-admin/css/bw-print-strelnice.css"/>
        <link rel="stylesheet" href="https://strelniceprerov.cz/wp-admin/css/bw-reboot-strelnice.css"/>
        <link rel="stylesheet" href="https://strelniceprerov.cz/wp-admin/css/bw-reservation-strelnice.css"/>
        <link rel="stylesheet" href="https://strelniceprerov.cz/wp-admin/css/bw-honest-week-picker.css"/>
        <link rel="stylesheet" href="https://strelniceprerov.cz/wp-admin/css/bw-allmin.css"/>

      </style>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <WrapperBooking/>
    </div>
  );
}

export default App;