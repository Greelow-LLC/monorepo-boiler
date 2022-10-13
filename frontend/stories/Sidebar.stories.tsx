import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Sidebar from "../components/Sidebar";
import "../styles/globals.css";

export default {
  title: "Sidebar",
  component: Sidebar,
  argTypes: {},
} as ComponentMeta<typeof Sidebar>;

export const Template: ComponentStory<typeof Sidebar> = () => <Sidebar />;
