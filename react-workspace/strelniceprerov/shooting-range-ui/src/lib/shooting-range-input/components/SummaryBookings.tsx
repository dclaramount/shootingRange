import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ManagementDashboardContext } from './Context/ManagementDashboardContext';
import { Button } from '@mui/material';

interface rowInfo{
  id:                     number,
  invoiceId:              number,
  invoiceType:            string,
  locationName:           string, 
  occupancy:              number,
  locationMaxOccupancy:   number,
  length:                 number,
  instructor:             boolean,
  startTime:              number,
  endTime:                number,
  isDeleted:              boolean,
  customerName:           string,
  customerEmail:          string,
  phoneNumber:            string,
  createdOn:              Date, 
  updatedOn:              Date
}

const getDateStringFromPHP=(date:number)=>{
  const dt = new Date(date*1000);
  return dt.toLocaleString('en-GB')
}

function Row(props: { row: rowInfo , childInvoices: rowInfo[]}) {
  const { row , childInvoices} = props;
  const [open, setOpen] = React.useState(false);
  console.log(childInvoices);
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">{row.id}</TableCell>
        <TableCell align="right">{row.customerName}</TableCell>
        <TableCell align="right">{row.locationName}</TableCell>
        <TableCell align="right">{getDateStringFromPHP(row.startTime)}</TableCell>
        <TableCell align="right">{getDateStringFromPHP(row.endTime)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Occupancy</TableCell>
                    <TableCell align="right">Start</TableCell>
                    <TableCell align="right">End</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {childInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell component="th" scope="row">{invoice.invoiceType}</TableCell>
                      <TableCell>{invoice.occupancy}</TableCell>
                      <TableCell align="right">{getDateStringFromPHP(invoice.startTime)}</TableCell>
                      <TableCell align="right">{getDateStringFromPHP(invoice.startTime)}</TableCell>
                      <TableCell style={{display:'flex'}}>
                        <Button onClick={() => console.log("PLACE HOLDER FOR DELETE")} variant='contained' color='error' disabled={invoice.isDeleted} >DELETE</Button>
                        <Button style={{marginLeft:'5px'}} onClick={() => console.log("PLACE HOLDER FOR DELETE")} variant='contained' color='primary' disabled={invoice.isDeleted} >MODIFY</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows : any[] = [1,2];

export default function SummaryBookings() {
  const {allInvoices} = React.useContext(ManagementDashboardContext);
  console.log(allInvoices);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Invoice Number</TableCell>
            <TableCell align="center">Customers Name</TableCell>
            <TableCell align="right">Location/Service</TableCell>
            <TableCell align="right">Start Segment</TableCell>
            <TableCell align="right">End Segment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allInvoices.map((invoice:any) => (
            <Row key={invoice.id} row={invoice} childInvoices={allInvoices.filter((childInvoice:any) => childInvoice.parentInvoice===invoice.invoiceId || (childInvoice.parentInvoice===0 && childInvoice.invoiceId===invoice.invoiceId))}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}