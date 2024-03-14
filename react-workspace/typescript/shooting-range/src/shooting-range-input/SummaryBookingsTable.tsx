import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ManagementDashboardContext } from './Context/ManagementDashboardContext';

const columns: GridColDef[] = [
  { field: 'location', headerName: 'Location', width: 70 },
  { field: 'segmentStarts', headerName: 'Start Segment', width: 130 },
  { field: 'segmentEnd', headerName: 'End Segment', width: 130 },
  { field: 'occupancyBooked', headerName: 'Occupancy Booked', width: 130 },
  { field: 'maxOccupancy', headerName: 'Max Occupancy', width: 130 }
];

export default function SummaryBookingTable() {
  const {summaryBookingSegments} = React.useContext(ManagementDashboardContext);
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