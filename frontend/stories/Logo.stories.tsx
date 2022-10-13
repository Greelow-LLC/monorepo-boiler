import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import '../styles/globals.css';
import Logo from '../components/Logo';

export default {
  title: 'Logo',
  component: Logo,
  argTypes: {
    hasTitle: {
      control: { type: 'boolean', default: true },
    },
    color: {
      control: { type: 'text' },
    },
  },
} as ComponentMeta<typeof Logo>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Logo> = args => <Logo {...args} />;

export const Generic = Template.bind({});
Generic.args = {
  hasTitle: true,
  color: 'custom-green',
};
