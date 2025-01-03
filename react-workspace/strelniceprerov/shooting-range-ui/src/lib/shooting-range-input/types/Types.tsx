import React from 'react';

export interface TextFormProps extends React.ComponentProps<'input'> {
    label: string;
    isComputerLayout: boolean;
}
export interface CommentFormProps extends React.ComponentProps<'textarea'> {
    label: string;
}
