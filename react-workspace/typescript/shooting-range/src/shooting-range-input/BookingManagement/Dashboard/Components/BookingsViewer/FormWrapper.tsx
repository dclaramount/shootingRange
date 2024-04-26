import { ManagementDashboardContext } from '../../../../Context/ManagementDashboardContext';
import React from 'react';
import { SelectedShootingRange } from './SelectedShootingRange';

export function FormWrapper() {

  const { setShowUpPopUp, selectedSegment } = React.useContext(ManagementDashboardContext);

  const submitHandler = (e:any) => {
    e.preventDefault();
    setShowUpPopUp(true);
  }
  return(
    <div className="reservation-order" style={{ display:'flex', flexDirection:'column', width:'100%', height:'auto', marginLeft:'auto', marginRight:'auto', backgroundColor:'#B2BEB540' }}>
      <form  onSubmit={(e)=>submitHandler(e)} style={{marginLeft:'auto', marginRight:'auto'}}>
          <SelectedShootingRange/>
          <div className="reservation-order-row" style={{width:'auto', marginLeft:'10px'}}>
            {selectedSegment.length===0 && <input type="submit" name="_submit" className="btn btn-primary" value="Zobraz" style={{ pointerEvents:'none', opacity:'0.5', backgroundColor:'gray', border:'1px solid gray'}}/> }
            {selectedSegment.length>0 && <input type="submit" name="_submit" className="btn btn-primary" value="Zobraz" /> }
          </div>
      </form>
    </div>
)}