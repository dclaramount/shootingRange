import React from 'react';
import axios from 'axios';
import DataGridWrapper from './DataGridWrapper';
import 'devextreme/dist/css/dx.light.css';

export function WrapperReservationManagement() {

  const [allBookings, setAllBookings] = React.useState([]);


  React.useEffect(() =>{    
    axios({
      url: "https://strelniceprerov.cz/wp-content/plugins/elementor-addon/widgets/getAllBookings.php",
      method: "GET",
  }).then((res) => {setAllBookings(res.data)})
    .catch((err) => { console.log(err) });
  },[])

  return(
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <div className="reservation" style={{padding:'100px'}}>
          <DataGridWrapper Data={allBookings}/>
        </div>
      </div>
    </div>
  </div>
)}