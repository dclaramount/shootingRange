import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { ShootingRangeTitle } from './shooting-range-title';
import { CustomProviders } from '../config/providers';

const Story: ComponentMeta<typeof ShootingRangeTitle> = {
  component: ShootingRangeTitle,
  title: 'ShootingRangeTitle',
};
export default Story;

const Template: ComponentStory<typeof ShootingRangeTitle> = (args) => (
  <CustomProviders>
    <ShootingRangeTitle {...args} />
  </CustomProviders>
);

export const Primary = Template.bind({});
Primary.args = { label: 'Your fresh title:' };
