import React from 'react';
import axios from 'axios';
import DataGridWrapper from './DataGridWrapper';

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
        <div style={{padding:'15px'}}>
          <h1>Management of Bookings</h1>
          {/*<DataGridWrapper Data={allBookings}/> TODO: Commenting to avoid misisng unique ID.*/}  
        </div>
      </div>
    </div>
  </div>
)}