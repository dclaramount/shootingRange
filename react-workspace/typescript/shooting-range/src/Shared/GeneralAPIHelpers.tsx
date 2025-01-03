import { AxiosResponse } from "axios";
import { CustomResponse, FilteredBookingsEntity, FilteredBookingsResponse, FilteredBookingsType, globalVariableEntity, globalVariablesType, InstructorEntity, InstructorInfoEntity, InstructorInfoType, InstructorSegmentEntity, InstructorSegmentType, InstructorType, InvoiceEntity, InvoiceType, ShootingRangeEntity, ShootingRangeType, SimpleCustomResponse, SummaryBookingsEntity, SummaryBookingsType, UserModificationType } from "./types";
import { API_REQUEST_STATUS } from "./enums";
/** 
* Returns a base object of type ModificationUser.
*
* @remarks
  * This method returns an empty ModificationUser Object to initialize our ref object .
*
* @returns an empty Custom Response Object.
*
* @beta
      */
export function initializeModificationObject (): UserModificationType {
  return {
    oldInfo: {
      id: -1,
      uuid: '',
      length: 1,
      location: '',
      service: '',
      withInstructor: false,
      name: '',
      email: '',
      phone: '',
      shootingPermit: '',
      updatedOn: new Date(),
      userId: -1,
      startTime: new Date()
    },
    newInfo: {
      id: -1,
      uuid: '',
      length: 1,
      location: '',
      withInstructor: false,
      service: '',
      name: '',
      email: '',
      phone: '',
      shootingPermit: '',
      updatedOn: new Date(),
      userId: -1,
      startTime: new Date()

    }
  }
}
/** 
* Returns a summary response for those pages that fetches from more than one endpoint at the same time.
*
* @remarks
  * This method returns API_REQUEST_STATUS response (summarizing the status OF all api calls involved)..
*
* @returns a API_REQUEST_STATUS Object for a multiple call of api endpoints.
*
*/
export function summaryResponse ( x: SimpleCustomResponse[] ): API_REQUEST_STATUS {
  for ( let i = 0; i < x.length; i++ ) {
    switch ( x[i].status ) {
      case API_REQUEST_STATUS.LOADING:
        return API_REQUEST_STATUS.LOADING;
      case API_REQUEST_STATUS.BAD_REQUEST:
        return API_REQUEST_STATUS.BAD_REQUEST
      case API_REQUEST_STATUS.SUCCESS:
        if ( ( i + 1 ) === x.length ) { return API_REQUEST_STATUS.SUCCESS }
        else { continue; }
      default:
        return API_REQUEST_STATUS.FAILURE
    }
  }
  return API_REQUEST_STATUS.FAILURE;
}
/** 
* Returns a base object of type CustomResponse.
*
* @remarks
  * This method returns an empty CustomResponse Object to initialize our ref object for API responses.
*
* @returns an empty Custom Response Object.
*
* @beta
      */
export function initializeCustomerResponseObject (): CustomResponse {
  return {
    status: -1,
    payload: {}
  }
}

/** 
* Returns the object with the proper shape for the global variables..
*
* @remarks
  * This method parses the result from the SQL query into a usable object
*
* @param response - The response object from the axios call.
    * @returns the globalVariablesType object to better handle the global variables entries.
      *
*/
export function parseGlobalVariablesResponse ( response: AxiosResponse<globalVariableEntity[], any> ): globalVariablesType {
  return {
    startBusinessHours: parseInt( response.data.find( ( variable: globalVariableEntity ): boolean => variable.name === "Start_Business_Hours" )?.value ?? "-1" ),
    endBusinessHours: parseInt( response.data.find( ( variable: globalVariableEntity ): boolean => variable.name === "End_Business_Hours" )?.value ?? "-1" ),
    startDayHours: parseInt( response.data.find( ( variable: globalVariableEntity ): boolean => variable.name === "Start_Day_Hours" )?.value ?? "-1" ),
    endDayHours: parseInt( response.data.find( ( variable: globalVariableEntity ): boolean => variable.name === "End_Day_Hours" )?.value ?? "-1" ),
    apiRootURL: response.data.find( ( variable: any ) => variable.name === "API_URL" )?.value ?? "UNDEFINIED",
    defaultLocation: parseInt( response.data.find( ( variable: globalVariableEntity ): boolean => variable.name === "Default_Location" )?.value ?? "-1" ),
    maxOccupancy: parseInt( response.data.find( ( variable: globalVariableEntity ): boolean => variable.name === "Max_Occupancy" )?.value ?? "-1" ),
    maxBookingLength: parseInt( response.data.find( ( variable: globalVariableEntity ): boolean => variable.name === "Max_Length_Booking" )?.value ?? "-1" ),
    defaultDuration: parseInt( response.data.find( ( variable: globalVariableEntity ): boolean => variable.name === "Default_Booking_Length" )?.value ?? "-1" ),
    defaultOccupancy: parseInt( response.data.find( ( variable: globalVariableEntity ): boolean => variable.name === "Default_Booking_Occupancy" )?.value ?? "-1" ),
    msgAlertSlotFull: response.data.find( ( variable: any ) => variable.name === "Alert_Message_Slot_Full" )?.value ?? "UNDEFINIED",
    msgAlertOccupancy: response.data.find( ( variable: any ) => variable.name === "Alert_Message_Occupancy" )?.value ?? "UNDEFINIED",
    sendGridEncryptedKey: response.data.find( ( variable: any ) => variable.name === "SendGrid_Key_Encrypted" )?.value ?? "UNDEFINIED",
    decryptionKey: response.data.find( ( variable: any ) => variable.name === "Decryption_Key" )?.value ?? "UNDEFINIED",
    emailFrom: response.data.find( ( variable: any ) => variable.name === "Email_From" )?.value ?? "UNDEFINIED",
    confirmationTemplateId: response.data.find( ( variable: any ) => variable.name === "Confirmation_email_template" )?.value ?? "UNDEFINIED",
    changeEmailTemplateId: response.data.find( ( variable: any ) => variable.name === "Change_email_template" )?.value ?? "UNDEFINIED",
    deleteEmailTemplate: response.data.find( ( variable: any ) => variable.name === "Cancelation_email_template" )?.value ?? "UNDEFINIED",
    msgErrorNonZeroHour: response.data.find( ( variable: any ) => variable.name === "error_time_slot_not_rounded" )?.value ?? "UNDEFINIED",
    msgErrorWrongConditions: response.data.find( ( variable: any ) => variable.name === "error_time_slot_wrong_conditions" )?.value ?? "UNDEFINIED",
    msgErrorEmail: response.data.find( ( variable: any ) => variable.name === "error_email" )?.value ?? "UNDEFINIED",
    msgErrorPhoneNumber: response.data.find( ( variable: any ) => variable.name === "error_phone_number" )?.value ?? "UNDEFINIED",
    msgErrorInstructor: response.data.find( ( variable: any ) => variable.name === "error_instructor" )?.value ?? "UNDEFINIED",
    blockSegmentFormTitle: response.data.find( ( variable: any ) => variable.name === "title_block_segment_form" )?.value ?? "UNDEFINIED",
  }
}
/** 
* Parses the entity object of Instructor into a usable object of type InstructorType.
*
* @remarks
  * This method parses the result from the SQL query into a usable object
*
* @param response - The response object from the axios call.
    * @returns the InstructorType[] object to better handle the object throughout the app.
      *
*/
export function parseInstructors ( response: AxiosResponse<InstructorEntity[], any> ): InstructorType[] {
  const res: InstructorType[] = [];
  response.data.forEach( ( instEntity: InstructorEntity ) => res.push( {
    name: instEntity.name,
    id: instEntity.id,
    color: instEntity.color,
    isDeleted: instEntity.isDeleted,
    createdBy: parseInt( instEntity.createdBy ),
    createdAt: new Date( instEntity.createdAt * 1000 ),
    lastUpdatedAt: new Date( instEntity.lastUpdatedAt * 1000 )
  } ) )
  return res;
}
/** 
* Parses the entity object of Instructor Segments (InstructorSegmentEntity[]) into a usable object of type InstructorSegmentType[].
*
* @remarks
  * This method parses the result from the SQL query into a usable object of type InstructorSegmentType[]
*
* @param response - The response object from the axios call.
    * @returns the InstructorSegmentType[] object to better handle the object throughout the app.
      *
*/
export function parseInstructorSegments ( response: AxiosResponse<InstructorSegmentEntity[], any> ): InstructorSegmentType[] {
  const res: InstructorSegmentType[] = [];
  response.data.forEach( ( instSegEntity: InstructorSegmentEntity ) => res.push( {
    id: parseInt( instSegEntity.id ),
    instructorId: parseInt( instSegEntity.instructorId ),
    instructorName: instSegEntity.instructorName,
    guid: instSegEntity.guid,
    startTime: new Date( Date.parse( instSegEntity.startTime ) ),
    endTime: new Date( Date.parse( instSegEntity.endTime ) )
  } ) )
  return res;
}
/** 
* Parses the entity object of Instructor Info (InstructorInfoEntity[]) into a usable object of type InstructorInfoType[].
*
* @remarks
  * This method parses the result from the SQL query into a usable object of type InstructorInfoType[]
*
* @param response - The response object from the axios call.
    * @returns the InstructorInfoType[] object to better handle the object throughout the app.
      *
*/
export function parseInstructorInfo ( response: AxiosResponse<InstructorInfoEntity[], any> ): InstructorInfoType[] {
  const res: InstructorInfoType[] = [];
  response.data.forEach( ( instInfo: InstructorInfoEntity ) => res.push( {
    id: parseInt( instInfo.id ),
    color: instInfo.color,
    name: instInfo.name
  } ) )
  return res;
}
/** 
* Parses the entity object of Summary Booking (SummaryBookingsEntity[]) into a usable object of type SummaryBookingsType[].
*
* @remarks
  * This method parses the result from the SQL query into a usable object of type SummaryBookingsType[]
*
* @param response - The response object from the axios call.
    * @returns the SummaryBookingsType[] object to better handle the object throughout the app.
      *
*/
export function parseSummaryBookings ( response: AxiosResponse<SummaryBookingsEntity[], any> ): SummaryBookingsType[] {
  const res: SummaryBookingsType[] = [];
  response.data.forEach( ( sumBooking: SummaryBookingsEntity ) => res.push( {
    id: sumBooking.id,
    instructoresBooked: parseInt( sumBooking.instructoresBooked ),
    location: sumBooking.location,
    locationId: parseInt( sumBooking.locationId ),
    maxOccupancy: parseInt( sumBooking.maxOccupancy ),
    occupancyBooked: parseInt( sumBooking.occupancyBooked ),
    segmentEnd: new Date( Date.parse( sumBooking.segmentEnd ) ),
    segmentLocationFullyBooked: sumBooking.segmentLocationFullyBooked,
    segmentStarts: new Date( Date.parse( sumBooking.segmentStarts ) ),
    service: sumBooking.service,
    serviceId: parseInt( sumBooking.serviceId )
  } ) )
  return res;
}
/** 
* Parses the entity object of Invoice (InvoiceEntity[]) into a usable object of type InvoiceType[].
*
* @remarks
  * This method parses the result from the SQL query into a usable object of type InvoiceType[]
*
* @param response - The response object from the axios call.
    * @returns the InvoiceType[] object to better handle the object throughout the app.
      *
*/
export function parseInvoice ( response: AxiosResponse<InvoiceEntity[], any> ): InvoiceType[] {
  const res: InvoiceType[] = [];
  response.data.forEach( ( inv: InvoiceEntity ) => res.push( {
    id: inv.id,
    customerName: inv.customerName,
    customerEmail: inv.customerEmail,
    phoneNumber: inv.phoneNumber,
    shootingPermit: inv.shootingPermit,
    instructor: inv.instructor,
    invoiceId: inv.invoiceId,
    uuid: inv.uuid,
    invoiceType: inv.invoiceType,
    occupancy: inv.occupancy,
    length: inv.lenght,
    locationId: parseInt( inv.locationId ),
    serviceId: parseInt( inv.serviceId ),
    serviceName: inv.serviceName,
    locationName: inv.locationName,
    locationMaxOccupancy: inv.locationMaxOccupancy,
    comment: inv.comment,
    startTime: new Date( inv.startTime * 1000 ),
    endTime: new Date( inv.endTime * 1000 ),
    isDeleted: inv.isDeleted
  } ) )
  return res;
}
/** 
* Parses the entity object of Shooting Range (ShootingRangeEntity[]) into a usable object of type ShootingRangeType[].
*
* @remarks
  * This method parses the result from the SQL query into a usable object of type ShootingRangeType[]
*
* @param response - The response object from the axios call.
    * @returns the ShootingRangeType[] object to better handle the object throughout the app.
      *
*/
export function parseShootingRange ( response: AxiosResponse<ShootingRangeEntity[], any> ): ShootingRangeType[] {
  const res: ShootingRangeType[] = [];
  response.data.forEach( ( shootingR: ShootingRangeEntity ) => res.push( {
    id: parseInt( shootingR.id ),
    serviceName: shootingR.serviceName,
    locationId: parseInt( shootingR.locationId ),
    locationName: shootingR.locationName,
    capacity: parseInt( shootingR.capacity ),
    isDeleted: shootingR.isDeleted === "1" ? true : false,
    userId: parseInt( shootingR.userId ),
    created: new Date( Date.parse( shootingR.created ) ),
    updated: new Date( Date.parse( shootingR.updated ) )
  } ) )
  return res;
}

/** 
* Parses the entity object of Filtered Bookings (FilteredBookingsEntity[]) into a usable object of type FilteredBookingsType[].
*
* @remarks
  * This method parses the result from the SQL query into a usable object of type FilteredBookingsType[]
*
* @param response - The response object from the axios call.
    * @returns the FilteredBookingsType[] object to better handle the object throughout the app.
      *
*/
export function parseFilteredBookings ( response: AxiosResponse<FilteredBookingsResponse, any> ): FilteredBookingsType[] {
  const res: FilteredBookingsType[] = [];
  if ( response.status < API_REQUEST_STATUS.BAD_REQUEST && response.data.filteredBookings ) {
    response.data.filteredBookings.forEach( ( fBooking: FilteredBookingsEntity ) => res.push( {
      invoiceId: fBooking.invoiceId,
      location: fBooking.location,
      length: fBooking.length,
      occupancy: fBooking.occupancy,
      maxOccupancy: fBooking.maxOccupancy,
      start: new Date( fBooking.start ),
      end: new Date( fBooking.end ),
      withInstructor: fBooking.withInstructor,
      comments: fBooking.withComments ? fBooking.comments.split( ";" ) : [] as string[],
      withComments: fBooking.withComments,
      name: fBooking.name,
      color: fBooking.withInstructor ? '#F2B51B' : 'black',
      serviceId: fBooking.serviceId,
      serviceName: fBooking.serviceName,
      locationId: fBooking.locationId,
      shootingPermit: fBooking.shootingPermit,
      phoneNumber: fBooking.phoneNumber,
      email: fBooking.email,
      uuid: fBooking.uuid,
      userId: fBooking.userId
    } ) )
  }
  return res;
}