import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import '../styles/globals.css';
import Modal from '../src/components/Modal';

export default {
  title: 'Modal',
  component: Modal,
  argTypes: {
    title: {
      control: { type: 'text' },
    },
    persistent: {
      control: { type: 'boolean' },
    },
    size: {
      control: { type: 'inline-radio' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'full'],
    },
  },
} as ComponentMeta<typeof Modal>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Generic = Template.bind({});
