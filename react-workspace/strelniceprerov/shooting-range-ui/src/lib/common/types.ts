import React from 'react';
import { Theme } from '@mui/material/styles/createTheme';

export interface BaseAppProviderProps {
  children: React.ReactNode | React.ReactNode[] | null;
}

export interface ProvidersProps extends BaseAppProviderProps {
  theme: Theme;
}
export interface StyledBaseProps {
  className?: string;
  children?: any;
}
