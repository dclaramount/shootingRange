import {ApiEndpointFetchStatus} from "./enums";
import {SetStateAction, Dispatch} from "react";
import {globalVariableType} from "./types";

export interface ApiResponseObject {
    payload:                    undefined;
    requestStatus:              ApiEndpointFetchStatus;
    status:                     number;
    error:                      string;
    message:                    string
}
export interface WeekSelectorInterfaceProps {
    context:                    HonestWeekPickerContextInterface;
}
export interface InstructorInterface{
    id:                         number;
    name:                       string;
    color:                      string;
    isDeleted:                  boolean;
    createdBy:                  string;
    createdAt:                  Date;
    lastUpdatedAt:              Date;
}
export interface SummaryViewBookingsInterface{
    id:                         number;
    invoiceId:                  number;
    invoiceType:                string;
    locationId:                 number;
    locationName:               string;
    serviceId:                  number;
    serviceName:                string;
    occupancy:                  number;
    locationMaxOccupancy:       number;
    length:                     number;
    withInstructor:             boolean;
    startTime:                  Date;
    endTime:                    Date;
    isDeleted:                  boolean;
    customerName:               string;
    customerEmail:              string;
    customerPhoneNumber:        string;
    uuid:                       string;
    comment:                    string;
    shootingPermit:             string;
}
/* Interfaces for UI */
export interface BookingFilteredInterface extends InvoiceInterface{
    locationName:               string;
    locationMaxCapacity:        number;
}
export interface FullInstructorSegmentInterface extends InstructorSegmentsInterface{
    instructorName:             string;
}
export interface FullServiceInfoInterface extends ServiceInterface{
    locationName:               string;
    locationComment:            string;
}
export interface HonestWeekInterface {
    firstDay:                   Date;
    lastDay:                    Date
}
/*Bookings Table DB Interfaces */
export interface InvoiceInterface extends BaseDBEntryInterface{
    id:                         number;
    invoiceId:                  number;
    locationId:                 number;
    occupancy:                  number;
    length:                     number;
    withInstructor:             boolean;
    startTime:                  Date;
    endTime:                    Date;
}
export interface InstructorSegmentsInterface extends BaseDBEntryInterface{
    id:                         number;
    instructorId:               number;
    uuid:                       string;
    startTime:                  Date;
    endTime:                    Date;
}
export interface ServiceInterface extends BaseDBEntryInterface{
    id:                         number;
    locationId:                 number;
    name:                       string;
    minCapacity:                number;
    maxCapacity:                number;
    comment:                    string;
}
export interface SummaryBookingSegmentInterface{
    locationId:                 number;
    locationName:               string;
    serviceId:                  number;
    serviceName:                string;
    occupancyBooked:            number;
    maxOccupancy:               number;
    segmentStarts:              Date;
    segmentEnds:                Date;
    instructorsBooked:          number;
    isFullyBooked:              boolean;
}
export interface GlobalVariableInterface{
    id:                         number;
    nameOfVariable:             string;
    value:                      globalVariableType;
    comment:                    string;
    modifiedBy:                 string;
    createdAt:                  Date;
    lastUpdatedAt:              Date;
}
/* Base Interfaces */
export interface BaseDBEntryInterface{
    isDeleted:                  boolean;
    modifiedBy:                 string;
    createdAt:                  Date;
    lastUpdatedAt:              Date;
}

/* CONTEXTS */
export interface EditBookingsContextType extends HonestWeekPickerContextInterface{
    bookingsSummaryView:        SummaryViewBookingsInterface[];
    setBookingsSummaryView:     Dispatch<SetStateAction<SummaryViewBookingsInterface[]>>;
    globalVariables:            GlobalVariableInterface[];
    setGlobalVariables:         Dispatch<SetStateAction<GlobalVariableInterface[]>>;
    instructorsList:            InstructorInterface[];
    setInstructorsList:         Dispatch<SetStateAction<InstructorInterface[]>>;
    fullInstructorSegments:     FullInstructorSegmentInterface[];
    setFullInstructorSegments:  Dispatch<SetStateAction<FullInstructorSegmentInterface[]>>;
    serviceList:                FullServiceInfoInterface[];
    setServiceList:             Dispatch<SetStateAction<FullServiceInfoInterface[]>>;
    summaryBookingSegments:     SummaryBookingSegmentInterface[];
    setSummaryBookingSegments:  Dispatch<SetStateAction<SummaryBookingSegmentInterface[]>>;
    //Space specific context variables.
    showBookingsSummaryOverlay: boolean;
    setShowBookingsSummaryOverlay: Dispatch<SetStateAction<boolean>>;
    businessHours:              string[];
    setBusinessHours:           Dispatch<SetStateAction<string[]>>;
    selectedSegment:            string[];
    setSelectedSegment:         Dispatch<SetStateAction<string[]>>;
}
export interface HonestWeekPickerContextInterface{
    bookingsFiltered:           BookingFilteredInterface[];
    setBookingsFiltered:        Dispatch<SetStateAction<BookingFilteredInterface[]>>;
    daysOfWeek:                 string[];
    setDaysOfWeek:              Dispatch<SetStateAction<string[]>>;
    daysOfWeekISOFormat:        string[];
    setDaysOfWeekISOFormat:     Dispatch<SetStateAction<string[]>>;
    selectedLocation:           number;
    setSelectedLocation:        Dispatch<SetStateAction<number>>;
    selectedWeek:               HonestWeekInterface;
    setSelectedWeek:            Dispatch<SetStateAction<HonestWeekInterface>>;
}
export interface EditBookingContextProviderProps{
    children : any;
    listGlobalVariables: GlobalVariableInterface[];
}