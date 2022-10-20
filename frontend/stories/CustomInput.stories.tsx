import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import CustomInput from "@/src/components/CustomInput";
import "../styles/globals.css";

export default {
  title: "Form/Input",
  component: CustomInput,
  argTypes: {
    label: {
      control: { type: "text" },
    },
    placeholder: {
      control: { type: "text" },
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
} as ComponentMeta<typeof CustomInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CustomInput> = (args) => (
  <CustomInput {...args} />
);

export const Text = Template.bind({});
Text.args = {
  label: "Text",
  id: "text",
  placeholder: "Generic text",
};

export const Password = Template.bind({});
Password.args = {
  label: "Password",
  id: "pass",
  placeholder: "Generic password",
  isPassWordInput: true,
};
