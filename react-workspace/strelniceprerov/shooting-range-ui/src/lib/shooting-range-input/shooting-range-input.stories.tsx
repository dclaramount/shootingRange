import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { ShootingRangeInput } from './shooting-range-input';
import { CustomProviders } from '../config/providers';

const Story: ComponentMeta<typeof ShootingRangeInput> = {
  component: ShootingRangeInput,
  title: 'ShootingRangeInput',
};
export default Story;

const Template: ComponentStory<typeof ShootingRangeInput> = (args) => (
  <CustomProviders>
    <ShootingRangeInput {...args} />
  </CustomProviders>
);

export const Primary = Template.bind({});
Primary.args = {
  label: 'Push it!',
  placeholder: 'To the limit',
};
