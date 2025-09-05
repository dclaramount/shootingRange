import React from 'react';
import {styles} from "../../styling/GlobalStyles";
import {TextFormProps} from "../../types/Types";

export const BookingEmail = React.forwardRef<HTMLInputElement, TextFormProps>(({label, isComputerLayout, ...rest}, ref) => {
    return(
        <div className="reservation-order-row" style={styles.inputField(isComputerLayout)}>
            <label htmlFor={'input_field_email'} style={styles.emailLabel()}>
                {label}
            </label>
            <input ref={ref} {...rest} id={'input_field_email'} style={styles.emailInputField()}/>
        </div>
    );
});