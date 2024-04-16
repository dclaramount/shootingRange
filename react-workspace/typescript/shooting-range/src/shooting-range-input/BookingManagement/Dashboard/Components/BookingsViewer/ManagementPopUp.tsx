import React from 'react';
import { ManagementDashboardContext } from '../../../../Context/ManagementDashboardContext';
import {format } from 'date-fns';

//This Renders the PopUp that will navigate the user throughout the booking confirmation process.
export function ManagementPopUp({closeModalFunction} : any) {
  interface UserEntry {
    ID: number;
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    shootingPermit?: string;
    updatedOn: Date;
    userId: string;
  }

  const {selectedSegment, selectedLocation, allInvoices} = React.useContext(ManagementDashboardContext);
  const filtered = allInvoices.filter((sb : any) => (format(new Date(sb.startTime * 1000), 'yyyy-MM-d HH:mm:ss')===selectedSegment));

  console.log(filtered);
  return(
    <div>
      <div style={{backgroundColor:'white', maxWidth:'500px', padding:'50px', border:'1px solid #e7e7e9', borderRadius:'15px', outline:'20px solid #fafafa'}}>
        <a className="close" onClick={closeModalFunction} style={{marginRight:'10px', marginTop:'10px', width:'24px', height:'24px', cursor:'pointer'}}>
            <i className="fa fa-times"></i>
        </a>
        {filtered.map((inv : any)=>{return (<div>Diego</div>)})}
      </div>
    </div>
)}