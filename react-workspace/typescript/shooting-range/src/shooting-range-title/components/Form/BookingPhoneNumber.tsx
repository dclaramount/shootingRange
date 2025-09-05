import React from 'react';
import { styles } from "../../styling/GlobalStyles";
import { TextFormProps } from "../../types/Types";

export const BookingPhoneNumber = React.forwardRef<HTMLInputElement, TextFormProps>( ( { label, isComputerLayout, ...rest }, ref ) => {
    return (

        <div className="reservation-order-row" style={styles.inputField( isComputerLayout )}>
            <label htmlFor={'input_field_country_code'}>
                {'Kód'}
            </label>
            <input style={{ width: '25%' }} ref={ref} value={'+420'} readOnly={true} {...rest} id={'input_field_country_code'} />
            <label htmlFor={'input_field_phone_number'} style={{ left: '70px' }}>
                {label}
            </label>
            <input style={{ width: '75%' }} ref={ref} {...rest} id={'input_field_phone_number'} />
        </div>

    );
} );
