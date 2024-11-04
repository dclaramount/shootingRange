import React from 'react';
import {Legend} from "./Legend";
import {HonestWeekPicker} from "./HonestWeekPicker";
import {WeekSelectorInterfaceProps} from "../../Types/interfaces";

export function WeekSelector(WeekSelectorProps: WeekSelectorInterfaceProps){
    const cWeekSelector = WeekSelectorProps.context;

    const onChange = (week : any) => {
        cWeekSelector.setSelectedWeek(week);
        const arrayDaysOfWeek = []
        const isoDaysOfWeek = []
        for (let i=0; i<=7; i++){
            const dt = new Date(week.firstDay);
            dt.setDate(dt.getDate() + i);
            isoDaysOfWeek.push(dt.toISOString().split('T')[0]);
            if(i<7){
                arrayDaysOfWeek.push(`${dt.getDate()}.${dt.getMonth() + 1}`);
            }
        }
        cWeekSelector.setDaysOfWeekISOFormat(isoDaysOfWeek);
        cWeekSelector.setDaysOfWeek(arrayDaysOfWeek);
    };

    return(
        <div className="reservation-date">
            <label>Datum</label>
            <HonestWeekPicker onChange={onChange} startValue={cWeekSelector.selectedWeek}/>
        </div>
    )
}