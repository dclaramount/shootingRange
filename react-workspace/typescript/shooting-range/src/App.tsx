import React from 'react';
import logo from './logo.svg';
import './App.css';
import { WrapperBooking } from './shooting-range-title/components/WrapperBooking';
import { WrapperManagementDashboard} from './shooting-range-input/WrapperManagementDashboard';
import axios from 'axios';
import DataGridSummaryTable from './shooting-range-input/DataGridSummaryTable';
import TabManagement from './shooting-range-input/TabMangement';

function App() {
  const [allBookings, setAllBookings] = React.useState([]);
  const [globalVariables, setGlobalVariables] = React.useState({});

  React.useEffect(() =>{    
    axios({
      url: "https://strelniceprerov.cz/wp-content/plugins/elementor-addon/widgets/getAllBookings.php",
      method: "GET",
  }).then((res) => {setAllBookings(res.data)})
    .catch((err) => { console.log(err) });
  },[])
  React.useEffect(() =>{    
    axios({
      url: "https://strelniceprerov.cz/wp-content/plugins/elementor-addon/widgets/getGlobalVariables.php",
      method: "GET",
  }).then((res) => {
    setGlobalVariables(({
      startBusinessHours: res.data.find((variable : any) => variable.name==="Start_Business_Hours").value,
      endBusinessHours:   res.data.find((variable : any) => variable.name==="End_Business_Hours").value,
      startDayHours:      res.data.find((variable : any) => variable.name==="Start_Day_Hours").value,
      endDayHours:        res.data.find((variable : any) => variable.name==="End_Day_Hours").value,
      apiRootURL:         res.data.find((variable : any) => variable.name==="API_URL").value
    }))
  })
    .catch((err) => { console.log(err) });
  },[])
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
        <link rel="stylesheet" href="https://strelniceprerov.cz/wp-admin/css/bw-dx-material-blue-light.css"/>
        <link rel="stylesheet" href="https://strelniceprerov.cz/wp-admin/css/bw-dx-demo-template.css"/>
      </style>
      <header className="App-header" style={{minHeight: '5vh'}}>
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
      {<WrapperBooking/>}
      {/*Object.keys(globalVariables).length > 0 ? <WrapperManagementDashboard gVariables={globalVariables}/> : "LOADING..."*/}
    </div>
  );
}

export default App;