import {ApiResponseObject, GlobalVariableInterface, HonestWeekInterface} from "./Types/interfaces";
import {ApiEndpointFetchStatus} from "./Types/enums";
import {endOfWeek, startOfWeek, subMonths} from "date-fns";
import {retriggerFetchType} from "./Types/types";


export function AllEndPointsSuccessFullyFetched(endPoints : ApiResponseObject[]) : boolean{
    return !endPoints.some((aro : ApiResponseObject) => aro.requestStatus !== ApiEndpointFetchStatus.SUCCESS)
}
export function getStringGlobalVariable(listGlobalVariables : GlobalVariableInterface[], globalVariableName : string) : string{
    const valueGlobalVariable= Object.values(listGlobalVariables).find((globalVariable : GlobalVariableInterface) => globalVariable.nameOfVariable===globalVariableName)?.value.toString();
    return valueGlobalVariable ?? 'NOT DEFINED';
}
export function getNumberGlobalVariable(listGlobalVariables : GlobalVariableInterface[], globalVariableName : string) : number {
    return Object.values(listGlobalVariables).find((globalVariable : GlobalVariableInterface) => globalVariable.nameOfVariable===globalVariableName)?.value as number ?? -1;
}
export function getFirstAndLastDayOfThisWeek() : HonestWeekInterface{
    return ({
        firstDay:   startOfWeek(new Date(), { weekStartsOn: 1 }),
        lastDay:    endOfWeek(new Date(), { weekStartsOn: 1 })
    });
}
export function hasTriggerChange(oldStatus: retriggerFetchType, newStatus: retriggerFetchType) : boolean {
    return !(JSON.stringify(oldStatus) === JSON.stringify(newStatus));
}
export function buildArrayOfBusinessHours  (startHour : number, endHour : number) : string[] {
    const arrayToReturn : string[] = [] as string[];
    let countStartHour = startHour;
    while(countStartHour < endHour){
        if(countStartHour < 10){
            arrayToReturn.push(`0${countStartHour}`);
        }
        else{
            arrayToReturn.push(`${countStartHour}`);
        }
        countStartHour=countStartHour+1;
    }
    return arrayToReturn;
}