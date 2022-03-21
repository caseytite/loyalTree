import React from "react";

import Logo from "../components/Logo";

export default {
  title: "Logo/loyalTree",
  component: Logo,
};

export const Icon = () => <Logo noText />;
export const Text = () => <Logo noIcon />;
export const Full = () => <Logo />;
