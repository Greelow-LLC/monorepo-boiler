import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import CustomCheckbox from "components/CustomCheckbox";
import "../styles/globals.css";

export default {
  title: "Form/Checkbox",
  component: CustomCheckbox,
  argTypes: {
    label: {
      control: { type: "text" },
    },
    note: {
      control: { type: "text" },
    },
  },
} as ComponentMeta<typeof CustomCheckbox>;

const Template: ComponentStory<typeof CustomCheckbox> = (args) => (
  <CustomCheckbox {...args} />
);

export const Generic = Template.bind({});
Generic.args = {
  label: "Check",
  id: "check",
  note: "A simple checkbox",
};
