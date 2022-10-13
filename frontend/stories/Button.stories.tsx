import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "../styles/globals.css";
import Button from "../components/Button";

export default {
  title: "Button",
  component: Button,
  argTypes: {
    label: {
      control: { type: "text" },
    },
    color: {
      options: ["red", "green", "blue", "sky"],
      control: { type: "select" },
    },
    size: {
      options: ["xs", "sm", "md", "lg", "xl", "full"],
      control: { type: "inline-radio" },
    },
  },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Generic = Template.bind({});
Generic.args = {
  label: "Click me!",
  color: "red",
  size: "sm",
};
