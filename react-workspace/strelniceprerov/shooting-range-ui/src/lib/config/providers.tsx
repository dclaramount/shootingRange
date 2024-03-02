import { Provider } from 'react-redux';
import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { falseReducer } from '../store';
import { responsiveFontSizes } from '@mui/material/styles';
import { createTheme } from '@mui/material';
import { BaseAppProviderProps } from '../common/types';
import { ThemeProviders } from '../common';

export const muiTheme = responsiveFontSizes(
  createTheme({
    /* your custom theme */
  })
);

// redux config
const reducer = {
  falseEntity: falseReducer,
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: {},
  enhancers: [],
});

export function CustomProviders(props: BaseAppProviderProps) {
  return (
    <ThemeProviders theme={muiTheme}>
      <Provider store={store}>{props.children}</Provider>
    </ThemeProviders>
  );
}
