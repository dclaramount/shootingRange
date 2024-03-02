import React from 'react';
import { Button, Grid, styled, TextField } from '@mui/material';
import { StyledBaseProps } from '../common/types';
import { ShootingRangeInputProps } from './shooting-range-input';

interface ShootingRangeInputViewProps
  extends StyledBaseProps,
    ShootingRangeInputProps {
  handleSubmit: (e: any) => void;
}

export const ShootingRangeInputView = styled(
  (props: ShootingRangeInputViewProps) => (
    <div className={props.className}>
      <form onSubmit={props.handleSubmit}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction={'row'}
          spacing={2}
        >
          <Grid item>
            <TextField
              type="text "
              label={props.placeholder ? props.placeholder : 'Type a new title'}
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <Button type="submit" variant="outlined">
              {props.label ? props.label : 'Update title'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
)`
  & {
    .bt-project-select {
      width: 100%;
    }
  }
`;
