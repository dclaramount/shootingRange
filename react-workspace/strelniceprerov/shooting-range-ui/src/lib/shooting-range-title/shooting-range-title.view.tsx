import { styled } from '@mui/material';
import { ShootingRangeTitleProps } from './shooting-range-title';
import { StyledBaseProps } from '../common/types';
import React from 'react';


interface ShootingRangeTitleViewProps
  extends ShootingRangeTitleProps,
    StyledBaseProps {
  lastValue: string;
  callBackClock: ()=>void
}


export const ShootingRangeTitleView = styled(
  (props: ShootingRangeTitleViewProps) => (
    <div className={props.className}>
      <h1>This is the place holder</h1>
    </div>
  )
)``;
