import {
  CustomProviders,
  ShootingRangeInput,
  ShootingRangeTitle,
  WebComponentWrapper,
} from '@strelniceprerov/shooting-range-ui';

WebComponentWrapper(
  'shooting-range-input',
  ShootingRangeInput,
  CustomProviders
);

WebComponentWrapper(
  'shooting-range-title',
  ShootingRangeTitle,
  CustomProviders
);
