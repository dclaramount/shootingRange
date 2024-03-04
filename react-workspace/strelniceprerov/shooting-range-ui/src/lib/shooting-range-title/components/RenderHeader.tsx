import { LegendText } from "./LegentText";
import { HonestWeekPicker } from "./WeekPicker";

const onChange = (week : any) => {
  console.log(week);
};

export const RenderHeader = () => (
  <>
  <div className="reservation-date">
    <label>Datum</label>
    <HonestWeekPicker onChange={onChange}/>
  </div>
  <LegendText/>
  </>
);