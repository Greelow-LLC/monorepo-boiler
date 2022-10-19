import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import Loader from '../components/Loader';
import '../styles/globals.css';

export default {
  title: 'Loader',
  component: Loader,
  argTypes: {},
} as ComponentMeta<typeof Loader>;

export const Template: ComponentStory<typeof Loader> = () => <Loader />;
