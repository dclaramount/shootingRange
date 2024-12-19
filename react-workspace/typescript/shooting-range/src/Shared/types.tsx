import { API_REQUEST_STATUS } from "./enums";
export type emptyObject = {};
export type ManagementPluginPayload = {
  GlobalVariables: globalVariablesType;
}
export type SimpleCustomResponse = {
  status: API_REQUEST_STATUS;
  payload: globalVariablesType | emptyObject;
};
export type CustomResponse = {
  status: API_REQUEST_STATUS;
  payload: ManagementPluginPayload | emptyObject;
};
export type globalVariableEntity = {
  name: string,
  value: string
}
export type globalVariablesType = {
  startBusinessHours: number;
  endBusinessHours: number;
  startDayHours: number;
  endDayHours: number,
  apiRootURL: string,
  defaultLocation: number,
  maxOccupancy: number,
  maxBookingLength: number,
  defaultDuration: number,
  defaultOccupancy: number,
  msgAlertSlotFull: string,
  msgAlertOccupancy: string,
  sendGridEncryptedKey: string,
  decryptionKey: string,
  emailFrom: string,
  confirmationTemplateId: string,
  changeEmailTemplateId: string,
  deleteEmailTemplate: string,
  msgErrorNonZeroHour: string,
  msgErrorWrongConditions: string,
  msgErrorEmail: string,
  msgErrorPhoneNumber: string,
  msgErrorInstructor: string,
  blockSegmentFormTitle: string
}