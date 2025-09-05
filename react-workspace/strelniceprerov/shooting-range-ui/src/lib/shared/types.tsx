import { Dispatch, SetStateAction } from "react";
import { API_REQUEST_STATUS } from "./enums";
export type UserModificationType = {
  oldInfo: UserRecordType,
  newInfo: UserRecordType
}
export type EditRowTableProps = {
  locationList: ShootingRangeType[],
  showUpPopUpCancelation: boolean,
  setShowUpPopUpCancelation: Dispatch<SetStateAction<boolean>>,
  showUpPopUpModification: boolean,
  setShowUpPopUpModification: Dispatch<SetStateAction<boolean>>,
  selectedBooking: FilteredBookingsType,
  setSelectedBooking: Dispatch<SetStateAction<FilteredBookingsType>>,
  globalVariabes: globalVariablesType
  allInvoices: InvoiceType[],
  setModificationInfo: Dispatch<SetStateAction<UserModificationType>>
  instructorSegments: InstructorSegmentType[],
  inv: FilteredBookingsType
}
export type UserRecordType = {
  id: number;
  uuid: string;
  location: string,
  service: string,
  length: number,
  withInstructor: boolean,
  name: string;
  email: string;
  phone: string;
  shootingPermit: string;
  startTime: Date;
  updatedOn: Date;
  userId: number;
}
export type EditBookingsPopUpType = {
  locationList: ShootingRangeType[],
  selectedSegment: string[],
  selectedLocation: number,
  allInvoices: InvoiceType[],
  globalVariabes: globalVariablesType,
  setRefreshTab: Dispatch<SetStateAction<Date>>,
  closeModalFunction: ( e: any ) => void,
  filteredBookings: FilteredBookingsType[],
  instructorSegments: InstructorSegmentType[],
  sendGridKeyAPI: string
}
export type DaysColumPropsType = {
  timesToShow: string[],
  selectedSegment: string[],
  setSelectedSegment: Dispatch<SetStateAction<string[]>>,
  allInvoices: InvoiceType[],
  summaryBookingSegments: SummaryBookingsType[],
  locationList: ShootingRangeType[],
  selectedLocation: number,
  weekSelector: WeekSelectorUpdatedCallBackType
}
export type TimeColumnProps = {
  timeToShow: string[]
}
export type WeekSelectorUpdatedCallBackType = {
  daysOfWeek: string[],
  selectedWeek: HonestWeekType,
  filteredBookings: FilteredBookingsType[],
  isoDaysOfWeek: string[]
}
export type HonestWeekType = {
  firstDay: Date;
  lastDay: Date;
};
export type ShootingRangeSelectorProps = {
  locationList: ShootingRangeType[];
  selectedLocation: number;
  setSelectedLocation: Dispatch<SetStateAction<number>>;
}
export type EditBookingFormSelectorProps = {
  setShowUpPopUp: Dispatch<SetStateAction<boolean>>;
  selectedSegment: string[];
} & ShootingRangeSelectorProps;
export type BookingEditCalendarProps = { timesToShow: string[] } & EditBookingFormSelectorProps;
export type BookingsViewerWrapperContextType = {
  showUpPopUp: boolean;
  setShowUpPopUp: Dispatch<SetStateAction<boolean>>;
  selectedSegment: string[];
  setSelectedSegment: Dispatch<SetStateAction<string[]>>;
  selectedLocation: number;
  setSelectedLocation: Dispatch<SetStateAction<number>>;
}
export type EditBookingsContextType = {
  refreshTab: Date,
  setRefreshTab: Dispatch<SetStateAction<Date>>,
  globalVariables: globalVariablesType,
  setGlobalVariables: Dispatch<SetStateAction<globalVariablesType>>,
  instructorSegments: InstructorSegmentType[],
  setInstructorSegments: Dispatch<SetStateAction<InstructorSegmentType[]>>,
  sendGridKeyAPI: string,
  setSendGridKeyAPI: Dispatch<SetStateAction<string>>,
} & WeekSelectorContextType & BookingCalendarContextType;

export type BookingCalendarContextType = {
  timesToShow: string[];
  setTimesToShow: Dispatch<SetStateAction<string[]>>;
  selectedSegment: string[];
  setSelectedSegment: Dispatch<SetStateAction<string[]>>;
  showUpPopUp: boolean;
  setShowUpPopUp: Dispatch<SetStateAction<boolean>>;
  allInvoices: InvoiceType[];
  setAllInvoices: Dispatch<SetStateAction<InvoiceType[]>>;
  summaryBookingSegments: SummaryBookingsType[];
  setSummaryBookingSegments: Dispatch<SetStateAction<SummaryBookingsType[]>>;
  locationList: ShootingRangeType[];
  setLocationList: Dispatch<SetStateAction<ShootingRangeType[]>>;
  weekSelector: WeekSelectorUpdatedCallBackType;
  setWeekSelector: Dispatch<SetStateAction<WeekSelectorUpdatedCallBackType>>;
}
export type WeekSelectorProps = {
  CallBackFc: ( parameteres: WeekSelectorUpdatedCallBackType ) => void
} & WeekSelectorContextType;
export type WeekSelectorContextType = {
  // bookings: any[];
  // setBookings: Dispatch<SetStateAction<any[]>>;
  // daysOfWeek: string[];
  // setDaysOfWeek: Dispatch<SetStateAction<string[]>>;
  // isoDaysOfWeek: string[];
  // setISODaysOfWeek: Dispatch<SetStateAction<string[]>>;
  // selectedWeek: HonestWeek;
  // setSelectedWeek: Dispatch<SetStateAction<HonestWeek>>;
  selectedLocation: number;
  setSelectedLocation: Dispatch<SetStateAction<number>>;
};
export type emptyObject = object;
export type PlaceHolderTabProps = {
  status: API_REQUEST_STATUS,
  loadingMessage: string,
  errorMessage: string
}
export type EditBookingProviderPropsType = {
  children?: React.ReactElement;
  GlobalVariables: globalVariablesType;
  InputProps: EditBookingsTabType;
}
export type ManagementPluginPayload = {
  GlobalVariables: globalVariablesType;
}
export type EditBookingsTabType = {
  Instructors: InstructorType[],
  InstructorSegments: InstructorSegmentType[],
  InfoInstructors: InstructorInfoType[],
  SummaryBookings: SummaryBookingsType[],
  Invoices: InvoiceType[],
  ShootingRanges: ShootingRangeType[]
}
export type SimpleCustomResponse = {
  status: API_REQUEST_STATUS;
  payload: globalVariablesType | InstructorType[] | FilteredBookingsType[] | emptyObject;
};
export type CustomResponse = {
  status: API_REQUEST_STATUS;
  payload: ManagementPluginPayload | EditBookingsTabType | emptyObject;
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
export type InstructorEntity = {
  name: string,
  id: number,
  color: string,
  isDeleted: boolean,
  createdBy: string,
  createdAt: number,
  lastUpdatedAt: number
}
export type InstructorType = {
  name: string,
  id: number,
  color: string,
  isDeleted: boolean,
  createdBy: number,
  createdAt: Date,
  lastUpdatedAt: Date
}
export type InstructorSegmentEntity = {
  id: string,
  instructorId: string,
  instructorName: string,
  guid: string,
  startTime: string, // This Endpoint still returns startTime as String
  endTime: string // This Endpoint still returns startTime as String
}
export type InstructorSegmentType = {
  id: number,
  instructorId: number,
  instructorName: string,
  guid: string,
  startTime: Date,
  endTime: Date
}
export type InstructorInfoEntity = {
  color: string,
  id: string,
  name: string
}
export type InstructorInfoType = {
  color: string,
  id: number,
  name: string
}
export type SummaryBookingsEntity = {
  id: number,
  instructoresBooked: string,
  location: string,
  locationId: string,
  maxOccupancy: string,
  occupancyBooked: string,
  segmentEnd: string, // This Endpoint still returns startTime as String
  segmentLocationFullyBooked: boolean,
  segmentStarts: string, // This Endpoint still returns startTime as String
  service: string,
  serviceId: string
}
export type SummaryBookingsType = {
  id: number,
  instructoresBooked: number,
  location: string,
  locationId: number,
  maxOccupancy: number,
  occupancyBooked: number,
  segmentEnd: Date,
  segmentLocationFullyBooked: boolean,
  segmentStarts: Date,
  service: string,
  serviceId: number
}
export type InvoiceEntity = {
  id: number,
  customerName: string,
  customerEmail: string,
  phoneNumber: string,
  shootingPermit: string,
  instructor: boolean,
  invoiceId: number,
  uuid: string,
  invoiceType: string,
  occupancy: number,
  lenght: number, // Misppeled to lenght in the API call.
  locationId: string,
  serviceId: string,
  serviceName: string,
  locationName: string,
  locationMaxOccupancy: number,
  comment: string,
  startTime: number,
  endTime: number,
  isDeleted: boolean,
}
export type InvoiceType = {
  id: number,
  customerName: string,
  customerEmail: string,
  phoneNumber: string,
  shootingPermit: string,
  instructor: boolean,
  invoiceId: number,
  uuid: string,
  invoiceType: string,
  occupancy: number,
  length: number,
  locationId: number,
  serviceId: number,
  serviceName: string,
  locationName: string,
  locationMaxOccupancy: number,
  comment: string,
  startTime: Date,
  endTime: Date,
  isDeleted: boolean,
}
export type ShootingRangeEntity = {
  id: string,
  serviceName: string,
  locationId: string,
  locationName: string,
  capacity: string,
  isDeleted: string,
  userId: string,
  created: string,
  updated: string
}
export type ShootingRangeType = {
  id: number,
  serviceName: string,
  locationId: number,
  locationName: string,
  capacity: number,
  isDeleted: boolean,
  userId: number,
  created: Date,
  updated: Date
}
export type FilteredBookingsResponse = {
  message: string,
  filteredBookings: FilteredBookingsEntity[]
}
export type FilteredBookingsEntity = {
  invoiceId: number,
  location: number,
  length: number,
  occupancy: number,
  maxOccupancy: number,
  start: number,
  end: number,
  withInstructor: boolean,
  comments: string,
  withComments: boolean,
  name: string,
  serviceId: number,
  serviceName: string,
  locationId: number,
  shootingPermit: string,
  phoneNumber: string,
  email: string,
  uuid: string
  userId: number,
}

export type FilteredBookingsType = {
  invoiceId: number,
  location: number,
  length: number,
  occupancy: number,
  maxOccupancy: number,
  start: Date,
  end: Date,
  withInstructor: boolean,
  comments: string[],
  withComments: boolean,
  name: string,
  color: string,
  serviceId: number,
  serviceName: string,
  locationId: number,
  shootingPermit: string,
  phoneNumber: string,
  email: string,
  uuid: string,
  userId: number
}
export type filteredBookingsAPICallType = {
  endpoint: string,
  firstDay: string,
  lastDay: string,
  selectedLocation: number
}