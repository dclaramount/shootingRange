import { AxiosResponse } from "axios";
import { CustomResponse, globalVariableEntity, globalVariablesType, SimpleCustomResponse } from "./types";
import { fetchGlobalVariables } from "./APICalls";
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
* Returns a CustomResponse Like Object for the Management PlugIn Level.
*
* @remarks
  * This method returns an  CustomResponse Object for the Management PlugIn.
*
* @returns a CustomResponse Object for the Management PlugIn.
*
* @beta
      */
export async function apiCallsManagementPlugIn (): Promise<CustomResponse> {
  const gvFetch: SimpleCustomResponse = await fetchGlobalVariables();
  return {
    status: gvFetch.status,
    payload: { GlobalVariables: gvFetch.payload }
  }
}
/** 
* Returns the object with the proper shape for the global variables.
*
* @remarks
  * This method parses the result from the SQL query into a usable object
*
* @param response - The response object from the axios call.
    * @returns the globalVariablesType object to better handle the global variables entries.
      *
* @beta
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