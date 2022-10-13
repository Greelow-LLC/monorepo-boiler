import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import CustomSelect from "../components/CustomSelect";
import "../styles/globals.css";

export default {
  title: "Form/Select",
  component: CustomSelect,
  argTypes: {
    label: {
      control: { type: "text" },
    },
    type: {
      control: { type: "radio", options: ["white", "gray"] },
    },
  },
} as ComponentMeta<typeof CustomSelect>;

const Template: ComponentStory<typeof CustomSelect> = (args) => (
  <CustomSelect {...args}>
    <option value="">Select an option</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
  </CustomSelect>
);

export const Generic = Template.bind({});
Generic.args = {
  label: "Select",
  id: "select",
  type: "white",
};
