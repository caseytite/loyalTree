import React from "react";

import LoyaltreeComponent from "./LoyaltreeComponent";

export default {
  title: "Loyaltree/LoyaltreeComponent",
  component: LoyaltreeComponent,
};

//you can put any JS here
const pText = "Howdy from ptext variable";

// Primary is the story name
export const Primary = () => <LoyaltreeComponent text={pText} />;

export const Secondary = () => (
  <LoyaltreeComponent text="There is no storybook" />
);
