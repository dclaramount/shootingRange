import { Context } from "react";
import {EditBookingsContextType, HonestWeekInterface} from "./interfaces";

export type test = boolean;
export type globalVariableType              = number | string;
export type retriggerFetchType              = boolean | HonestWeekInterface;
export type dropdownShootingRangeCtx        =   Context<EditBookingsContextType> | editBookingsCtx;
export type dropdownShootingRangeCtxType    =   EditBookingsContextType | editBookingsCtxType;
export type editBookingsCtx                 =   Context<EditBookingsContextType>;
export type editBookingsCtxType             =   EditBookingsContextType;