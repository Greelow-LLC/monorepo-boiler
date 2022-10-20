<<<<<<< HEAD:frontend/stories/Loader.stories.tsx
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Loader from 'components/Loader';
import React from 'react';

=======
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Loader from '../components/Loader';
>>>>>>> parent of 1a609dd... migrating fe to src folder:frontend/src/stories/Loader.stories.tsx
import '../styles/globals.css';

export default {
  title: 'Loader',
  component: Loader,
  argTypes: {},
} as ComponentMeta<typeof Loader>;

export const Template: ComponentStory<typeof Loader> = () => <Loader />;
