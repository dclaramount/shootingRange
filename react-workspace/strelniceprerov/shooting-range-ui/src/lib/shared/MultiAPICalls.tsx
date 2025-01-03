import { fetchGlobalVariables, fetchInstructorInfo, fetchInstructors, fetchInstructorSegments, fetchInvoices, fetchShootingRanges, fetchSummaryBookings } from "./APICalls";
import { summaryResponse } from "./GeneralAPIHelpers";
import { CustomResponse, SimpleCustomResponse } from "./types";

/** 
* Returns a CustomResponse Like Object for the Management PlugIn Level.
*
* @remarks
  * This method returns an  CustomResponse Object for the Management PlugIn.
*
* @returns a CustomResponse Object for the Management PlugIn.
*
*/
export async function apiCallsManagementPlugIn (): Promise<CustomResponse> {
  const gvFetch: SimpleCustomResponse = await fetchGlobalVariables();
  return {
    status: gvFetch.status,
    payload: { GlobalVariables: gvFetch.payload }
  }
}
/** 
* Returns a CustomResponse Like Object for the Editing Bookints Tab (Management Dashboard).
*
* @remarks
  * This method returns a  CustomResponse Object for Editing Bookints Tab (this includes Instructors, Instructor Segments).
*
* @returns a CustomResponse Object for the Editing Bookints Tab.
*
*/
export async function apiCallsEditBookingsTab (): Promise<CustomResponse> {
  const instFetch: SimpleCustomResponse = await fetchInstructors( `getAllInstructors.php` );
  const instSegmentsFetch: SimpleCustomResponse = await fetchInstructorSegments( `getAllInstructorSegments.php` );
  const instInfoFetch: SimpleCustomResponse = await fetchInstructorInfo( `getInfoInstructors.php` );
  const summaryBookingsFetch: SimpleCustomResponse = await fetchSummaryBookings( `getSummaryBookings.php` );
  const invoiceFetch: SimpleCustomResponse = await fetchInvoices( `getAllInvoices.php` );
  const shootingRangesFetch: SimpleCustomResponse = await fetchShootingRanges( `getListShootingRange.php` );
  return {
    status: summaryResponse( [instFetch, instSegmentsFetch, instInfoFetch, summaryBookingsFetch, invoiceFetch, shootingRangesFetch] ),
    payload: {
      Instructors: instFetch.payload,
      InstructorSegments: instSegmentsFetch.payload,
      InfoInstructors: instInfoFetch.payload,
      SummaryBookings: summaryBookingsFetch.payload,
      Invoices: invoiceFetch.payload,
      ShootingRanges: shootingRangesFetch.payload
    }
  }
}