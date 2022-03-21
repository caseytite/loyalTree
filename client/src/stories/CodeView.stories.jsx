import React from "react";

import CodeView from "../components/CodeView";

export default {
  title: "Utility/QR Code",
  component: CodeView,
};

export const FirstCard = () => <CodeView cardID={"7"} />;
export const SecondCard = () => <CodeView cardID={"24"} />;
