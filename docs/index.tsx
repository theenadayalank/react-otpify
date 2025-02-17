import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import OtpifyDemo from "./components/OtpifyDemo";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <OtpifyDemo />
  </StrictMode>
);
