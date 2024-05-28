import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import "./css/ej2_base_material.css";
import "./css/ej2_buttons_material.css";
import "./css/ej2_calendars_material.css";
import "./css/ej2_dropdowns_material.css";
import "./css/ej2_inputs_material.css";
import "./css/ej2_lists_material.css";
import "./css/ej2_navigations_material.css";
import "./css/ej2_popups_material.css";
import "./css/ej2_react_schedule_material.css";
import "./css/ej2_splitbuttons_material.css";

export const SegmentBlockerCalendar = () => {
    return (<ScheduleComponent>
      <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
    </ScheduleComponent>);
};