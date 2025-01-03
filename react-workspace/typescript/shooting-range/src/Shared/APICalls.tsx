import axios, { AxiosResponse } from "axios";
import { filteredBookingsAPICallType, FilteredBookingsResponse, globalVariableEntity, InstructorEntity, InstructorInfoEntity, InstructorSegmentEntity, InvoiceEntity, ShootingRangeEntity, SimpleCustomResponse, SummaryBookingsEntity } from "./types";
import { parseFilteredBookings, parseGlobalVariablesResponse, parseInstructorInfo, parseInstructors, parseInstructorSegments, parseInvoice, parseShootingRange, parseSummaryBookings } from "./GeneralAPIHelpers";

export async function fetchGlobalVariables (): Promise<SimpleCustomResponse> {
  const uri = "https://strelniceprerov.cz/wp-content/plugins/elementor-addon/widgets/getGlobalVariables.php"
  const response: AxiosResponse<globalVariableEntity[], any> = await axios.get<globalVariableEntity[]>( uri );
  return {
    status: response.status,
    payload: parseGlobalVariablesResponse( response )
  }
}
/** 
* Fetches from the DB the InstructorEntity[] from the instructors table.
* And parses it into a usable object of type InstructorType[]
* All this using the api endpoint getAllInstructors.php
*
* @remarks
  * Fetches the entire table of instructors from the DB.
*
* @param response - The response object from the axios call.
    * @returns the InstructorEntity[] object to better handle the object throughout the app.
      *
* @beta
      */
export async function fetchInstructors ( endpoint: string ): Promise<SimpleCustomResponse> {
  const uri = `https://strelniceprerov.cz/wp-content/plugins/elementor-addon/widgets/${endpoint}`
  const response: AxiosResponse<InstructorEntity[], any> = await axios.get<InstructorEntity[]>( uri );
  return {
    status: response.status,
    payload: parseInstructors( response )
  }
}
/** 
* Fetches from the DB a custom view of the instructor segments this includes 
* instructors table INNER JOIN with instructor_segments view and returns
* a InstructorSegmentEntity[] from this SQL Query.
* And parses it into a usable object of type InstructorSegmentType[]
* All this using the api endpoint getAllInstructorSegment.php
*
* @remarks
  * Fetches all the instructor segments from the DB.
*
* @param response - The response object from the axios call.
    * @returns the Promise<SimpleCustomResponse> which includes the InstructorSegmentType[]handle the object throughout the app.
      *
* @beta
      */
export async function fetchInstructorSegments ( endpoint: string ): Promise<SimpleCustomResponse> {
  const uri = `https://strelniceprerov.cz/wp-content/plugins/elementor-addon/widgets/${endpoint}`
  const response: AxiosResponse<InstructorSegmentEntity[], any> = await axios.get<InstructorSegmentEntity[]>( uri );
  return {
    status: response.status,
    payload: parseInstructorSegments( response )
  }
}
/** 
* Fetches from the DB the entries of the table instructors
* And parses it into a usable object of type InstructorInfoType[]
* All this using the api endpoint getInfoInstructors.php
*
* @remarks
  * Fetches all the instructor info from the DB.
*
* @param response - The response object from the axios call.
    * @returns the Promise<SimpleCustomResponse> which includes the InstructorInfoType[] handle the object throughout the app.
      *
* @beta
      */
export async function fetchInstructorInfo ( endpoint: string ): Promise<SimpleCustomResponse> {
  const uri = `https://strelniceprerov.cz/wp-content/plugins/elementor-addon/widgets/${endpoint}`
  const response: AxiosResponse<InstructorInfoEntity[], any> = await axios.get<InstructorInfoEntity[]>( uri );
  return {
    status: response.status,
    payload: parseInstructorInfo( response )
  }
}
/** 
* Fetches from the DB the entries of the view Summary_Booking_Segments
* And parses it into a usable object of type SummaryBookingsType[]
* All this using the api endpoint getSummaryBookings.php
*
* @remarks
  * Fetches all the instructor info from the DB.
*
* @param response - The response object from the axios call.
    * @returns the Promise<SimpleCustomResponse> which includes the SummaryBookingsType[] handle the object throughout the app.
      *
*/
export async function fetchSummaryBookings ( endpoint: string ): Promise<SimpleCustomResponse> {
  const uri = `https://strelniceprerov.cz/wp-content/plugins/elementor-addon/widgets/${endpoint}`
  const response: AxiosResponse<SummaryBookingsEntity[], any> = await axios.get<SummaryBookingsEntity[]>( uri );
  return {
    status: response.status,
    payload: parseSummaryBookings( response )
  }
}
/** 
* Fetches from the DB the entries of the view Summary_View_Bookings
* And parses it into a usable object of type InvoiceType[]
* All this using the api endpoint getAllInvoices.php
*
* @remarks
  * Fetches all the instructor info from the DB.
*
* @param response - The response object from the axios call.
    * @returns the Promise<SimpleCustomResponse> which includes the InvoiceType[] handle the object throughout the app.
      *
*/
export async function fetchInvoices ( endpoint: string ): Promise<SimpleCustomResponse> {
  const uri = `https://strelniceprerov.cz/wp-content/plugins/elementor-addon/widgets/${endpoint}`
  const response: AxiosResponse<InvoiceEntity[], any> = await axios.get<InvoiceEntity[]>( uri );
  return {
    status: response.status,
    payload: parseInvoice( response )
  }
}
/** 
* Fetches from the DB a custom view of the shooting ranges list this includes 
* services table INNER JOIN with location table and returns
* a ShootingRangeEntity[] from this SQL Query.
* And parses it into a usable object of type ShootingRangeType[]
* All this using the api endpoint getListShootingRange.php
*
* @remarks
  * Fetches all the instructor info from the DB.
*
* @param response - The response object from the axios call.
    * @returns the Promise<SimpleCustomResponse> which includes the InvoiceType[] handle the object throughout the app.
      *
*/
export async function fetchShootingRanges ( endpoint: string ): Promise<SimpleCustomResponse> {
  const uri = `https://strelniceprerov.cz/wp-content/plugins/elementor-addon/widgets/${endpoint}`
  const response: AxiosResponse<ShootingRangeEntity[], any> = await axios.get<ShootingRangeEntity[]>( uri );
  return {
    status: response.status,
    payload: parseShootingRange( response )
  }
}
/** 
* Fetches from the DB a custom view of the shooting ranges list this includes 
* services table INNER JOIN with location table and returns
* a ShootingRangeEntity[] from this SQL Query.
* And parses it into a usable object of type ShootingRangeType[]
* All this using the api endpoint getBookingsFiltered..php
*
* @remarks
  * Fetches all the instructor info from the DB.
*
* @param response - The response object from the axios call.
    * @returns the Promise<SimpleCustomResponse> which includes the InvoiceType[] handle the object throughout the app.
      *
*/
export async function fetchFilteredBookings ( parameteres: filteredBookingsAPICallType ): Promise<SimpleCustomResponse> {
  const uri = `https://strelniceprerov.cz/wp-content/plugins/elementor-addon/widgets/${parameteres.endpoint}?firstDayOfWeek=${parameteres.firstDay}&lastDayOfWeek=${parameteres.lastDay}&location=${parameteres.selectedLocation}`
  const response: AxiosResponse<FilteredBookingsResponse, any> = await axios.get<FilteredBookingsResponse>( uri );
  return {
    status: response.status,
    payload: parseFilteredBookings( response )
  }
}