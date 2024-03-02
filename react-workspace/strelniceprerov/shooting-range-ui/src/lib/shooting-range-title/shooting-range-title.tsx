import { useSelector } from 'react-redux';
import { falseEntitySelector } from '../store';
import PropTypes, { InferProps } from 'prop-types';
import { ShootingRangeTitleView } from './shooting-range-title.view';

export const ShootingRangeTitlePropsTypes = {
  label: PropTypes.string,
};

export type ShootingRangeTitleProps = InferProps<
  typeof ShootingRangeTitlePropsTypes
>;

/**
 * Same component linked to the store
 */
export function ShootingRangeTitle(props: ShootingRangeTitleProps) {
  const v = useSelector(falseEntitySelector);

  return <ShootingRangeTitleView lastValue={v} {...props} />;
}

/**
 * Exposing props to elementor through the web component
 * /!\ o not use this for state management
 */
ShootingRangeTitle.propTypes = ShootingRangeTitlePropsTypes;
