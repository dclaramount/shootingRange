import React from 'react';
import * as Components from './EditBookingSpace';
import { dropdownShootingRangeCtx, editBookingsCtx, editBookingsCtxType } from '../../Common/Types/types';

export function EditBookingsFormWrapper( ctx : editBookingsCtx ) {

  const _ctx =  React.useContext<editBookingsCtxType>(ctx );

  const submitHandler = (e:any) => {
    e.preventDefault();
    _ctx.setShowBookingsSummaryOverlay(true);
  }
  return(
    <div className="reservation-order" style={{ display:'flex', flexDirection:'column', width:'100%', height:'auto', marginLeft:'auto', marginRight:'auto', backgroundColor:'#B2BEB540' }}>
      <form  onSubmit={(e)=>submitHandler(e)} style={{marginLeft:'auto', marginRight:'auto'}}>
          <Components.DropDownShootingRange {...ctx}/>
          <div className="reservation-order-row" style={{width:'auto', marginLeft:'10px'}}>
            {_ctx.selectedSegment.length===0 && <input type="submit" name="_submit" className="btn btn-primary" value="Zobraz" style={{ pointerEvents:'none', opacity:'0.5', backgroundColor:'gray', border:'1px solid gray'}}/> }
            {_ctx.selectedSegment.length>0 && <input type="submit" name="_submit" className="btn btn-primary" value="Zobraz" /> }
          </div>
      </form>
    </div>
)}