import React from 'react';
import {styles} from "../../styling/GlobalStyles";
import {TextFormProps} from "../../types/Types";

export const BookingName = React.forwardRef<HTMLInputElement, TextFormProps>(({label, isComputerLayout, ...rest}, ref) => {
    return(
        <div className="reservation-order-row" style={styles.inputField(isComputerLayout)}>
            <label htmlFor={'input_field_name'}>
                {label}
            </label>
            <input ref={ref} {...rest} id={'input_field_name'}/>
        </div>
    );
});