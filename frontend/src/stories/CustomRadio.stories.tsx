import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import CustomRadio from '../components/CustomRadio';
import '../styles/globals.css';

export default {
  title: 'Form/Radio',
  component: CustomRadio,
  argTypes: {
    label: {
      control: { type: 'text' },
    },
  },
} as ComponentMeta<typeof CustomRadio>;

const Template: ComponentStory<typeof CustomRadio> = ({
  label,
  id,
  ...args
}) => (
  <div>
    <CustomRadio {...args} label="Option 1" id="1" />
    <CustomRadio {...args} label="Option 2" id="2" />
    <CustomRadio {...args} label="Option 3" id="3" />
  </div>
);

export const Generic = Template.bind({});
Generic.args = {
  label: 'Options',
  id: 'select',
  name: 'Option',
};
