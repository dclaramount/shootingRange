import React from 'react';
import {CommentFormProps} from "../../types/Types";
import {styles} from "../../styling/GlobalStyles";

export const CommentsField = React.forwardRef<HTMLTextAreaElement, CommentFormProps>(({label, ...rest}, ref) => {
    return(
        <div className="reservation-order-row" style={{width:'248px'}}>
            <label htmlFor={'input_field_name'} style={styles.labelComments()}>
                {label}
            </label>
            <textarea ref={ref} {...rest} id={'input_field_name'} style={styles.inputComments()} />
        </div>
    );
});