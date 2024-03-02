import { updatefalseEntity } from '../store';
import React, { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes, { InferProps } from 'prop-types';
import { ShootingRangeInputView } from './shooting-range-input.view';

export const ShootingRangeInputPropsTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
};

export type ShootingRangeInputProps = InferProps<
  typeof ShootingRangeInputPropsTypes
>;

/**
 * Same component linked to the store
 */
export function ShootingRangeInput(props: ShootingRangeInputProps) {
  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (e.target[0]?.value) {
      dispatch(updatefalseEntity(e.target[0]?.value));
      e.target[0].value = '';
    }
  };
  return <ShootingRangeInputView {...props} handleSubmit={handleSubmit} />;
}

/**
 * Exposing props to elementor through the web component
 */
ShootingRangeInput.propTypes = ShootingRangeInputPropsTypes;
