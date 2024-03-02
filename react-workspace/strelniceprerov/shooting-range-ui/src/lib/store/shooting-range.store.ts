import { createSlice } from '@reduxjs/toolkit';

const initialState = 'Hello shooting-range';

const falseEntitySlice = createSlice({
  name: 'falseEntity',
  initialState,
  reducers: {
    updatefalseEntity: (state, action) => {
      return action.payload;
    },
  },
});

export const { updatefalseEntity } = falseEntitySlice.actions;

export const falseReducer = falseEntitySlice.reducer;
