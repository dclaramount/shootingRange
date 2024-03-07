import React, { useCallback, useState } from 'react';
import Button from 'devextreme-react/button';
import DataGrid, {
  Column, Editing, Paging, Pager,
} from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';


const DataGridWrapper = ({Data}: any) => {
  const emptyArray : string[] =[];
  const [events, setEvents] = useState(emptyArray);
  const logEvent = useCallback((eventName: string) => {
    setEvents((previousEvents) => [eventName, ...previousEvents]);
  }, []);
  const allowedPageSizes = [10, 15, 20];

  const clearEvents = useCallback(() => {
    setEvents([]);
  }, []);

  const handlerEditingStart =(e: any) =>{
    logEvent(`${(new Date()).toLocaleString()} - Editing Started for Booking with id ${e.key}`);
  }
  const handlerSaving = (e : any) => {
    logEvent(`${(new Date()).toLocaleString()} - Saving Started`);
  }
  const handlerUpdating = (e : any) => {
    logEvent(`${(new Date()).toLocaleString()} - Updating Started for Booking with id ${e.key}`);
  }
  const handlerUpdated = (e:any) => {
    //PLACEHOLDER FOR CALL TO API FOR UPDATE
    logEvent(`${(new Date()).toLocaleString()} - Updated Done Succesfully for Booking with id ${e.key}`);
  }
  const handlerSaved = (e:any) => {
    logEvent(`${(new Date()).toLocaleString()} - Saved Finished`);
  }
  const handlerRemovingEntry = (e:any) => {
    logEvent(`${(new Date()).toLocaleString()} - Removing Entry for Booking with id ${e.key}`);
  }
  const handlerRemovedEntry = (e:any) => {
    logEvent(`${(new Date()).toLocaleString()} - Entry Removed for Booking with id ${e.key}`);
  }
  const handlerEditCanceling = (e:any) => {
    logEvent(`${(new Date()).toLocaleString()} - Canceling Edit`);
  }
  const handlerEditCancelled = (e:any) => {
    logEvent(`${(new Date()).toLocaleString()} - Edit Event Canceled`);
  }

  return (
    <React.Fragment>
      <DataGrid
        id="gridContainer"
        dataSource={Data}
        keyExpr="ID"
        allowColumnReordering={true}
        showBorders={true}
        onEditingStart        =   {(e) => handlerEditingStart(e)}
        onInitNewRow          =   {() => logEvent('InitNewRow')}
        onRowInserting        =   {() => logEvent('RowInserting')}
        onRowInserted         =   {() => logEvent('RowInserted')}
        onRowUpdating         =   {(e) => handlerUpdating(e)}
        onRowUpdated          =   {(e) => handlerUpdated(e)}
        onRowRemoving         =   {(e) => handlerRemovingEntry(e)}
        onRowRemoved          =   {(e) => handlerRemovedEntry(e)}
        onSaving              =   {(e) => handlerSaving(e)}
        onSaved               =   {(e) => handlerSaved(e)}
        onEditCanceling       =   {(e) => handlerEditCanceling(e)}
        onEditCanceled        =   {(e) => handlerEditCancelled(e)}>

        <Paging enabled={true} pageSize={15}/>
        <Pager
                    showPageSizeSelector={true}
                    allowedPageSizes={allowedPageSizes}
                    showNavigationButtons={true}
                    showInfo={true}
                    infoText="Page #{0}. Total: {1} ({2} items)"
                />
        <Editing
          mode="row"
          allowUpdating={true}
          allowDeleting={true}
          allowAdding={false} />

        <Column dataField="location"  caption="Shooting Range"  width={'20%'} />
        <Column dataField="invoiceId" caption="Invoice"         width={'10%'} />
        <Column dataField="occupancy" caption="Occupancy"       width={'10%'} />
        <Column dataField="start"     dataType='datetime'       width={'30%'} />
        <Column dataField="end"       dataType='datetime'       width={'30%'} />
      </DataGrid>

      <div id="events">
        <div style={{display:'flex'}}>
          <div className="caption" style={{marginTop:'auto', marginBottom:'auto', marginRight:'10px', fontWeight:'bolder'}}>Fired events</div>
          <Button id="clear" text="Clear" onClick={clearEvents} />
        </div>
        <ul style={{textAlign:'left'}}>
          {events.map((event, index) => <li key={index}>{event}</li>)}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default DataGridWrapper;
