import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import CustomTextarea from "@/src/components/CustomTextarea";
import "../styles/globals.css";

export default {
  title: "Form/Textarea",
  component: CustomTextarea,
  argTypes: {
    label: {
      control: { type: "text" },
    },
    placeholder: {
      control: { type: "text" },
    },
    rows: {
      control: { type: "select", options: [1, 2, 3, 4, 5] },
    },
  },
} as ComponentMeta<typeof CustomTextarea>;

const Template: ComponentStory<typeof CustomTextarea> = (args) => (
  <CustomTextarea {...args} />
);

export const Generic = Template.bind({});
Generic.args = {
  label: "Text",
  id: "text",
  placeholder: "Generic text",
  rows: 1,
};
