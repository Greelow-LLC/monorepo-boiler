import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Avatar from "../components/Avatar";

import "../styles/globals.css";

export default {
  title: "Avatar",
  component: Avatar,
  argTypes: {
    url: {
      control: { type: "text" },
    },
    alt: {
      control: { type: "text" },
    },
    initials: {
      control: { type: "text", upperCase: true },
      length: { min: 2, max: 2 },
    },
    color: {
      control: { type: "select" },
      options: ["red", "green", "blue", "sky"],
    },
    size: {
      control: { type: "inline-radio" },
      options: ["xs", "sm", "md", "lg", "xl"],
    },
  },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Image = Template.bind({});

export const Initials = Template.bind({});

Image.args = {
  url: "https://i.pravatar.cc/300",
  size: "md",
  alt: "Test Avatar",
};

Initials.args = {
  initials: "TS",
  color: "green",
  size: "md",
};
