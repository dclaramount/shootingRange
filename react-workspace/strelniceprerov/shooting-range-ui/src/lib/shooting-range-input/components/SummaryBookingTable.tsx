import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ManagementDashboardContext } from './Context/ManagementDashboardContext';

const columns: GridColDef[] = [
  { field: 'location', headerName: 'Location', width: 260 },
  { field: 'segmentStarts', headerName: 'Start Segment', width: 260 },
  { field: 'segmentEnd', headerName: 'End Segment', width: 260 },
  { field: 'occupancyBooked', headerName: 'Occupancy Booked', width: 160 },
  { field: 'maxOccupancy', headerName: 'Max Occupancy', width: 160 }
];

export default function SummaryBookingTable() {
  const {summaryBookingSegments} = React.useContext(ManagementDashboardContext);
  if(summaryBookingSegments){
    if(summaryBookingSegments.length>0){

  return (
    <div style={{ height: 650, width: '100%' }}>
      <DataGrid
        rows={summaryBookingSegments}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 15]}
      />
    </div>
  );
}
}
}