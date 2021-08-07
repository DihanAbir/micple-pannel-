import React from "react";
import { Divider } from "@material-ui/core";

import { AuthGuard } from "../../shared";
import Notice from "./Notice";
import Home from "./Home";
import News from "./News";

function Updates() {
  document.title = "Ads & Updates";
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <News />
      <Divider />
      <Notice />
      <Divider />
      <div style={{ display: "flex", flex: 4 }}>
        <Home page="left" />
        <Divider orientation="vertical" />
        <Home page="right" />
      </div>
    </div>
  );
}

export default AuthGuard(Updates);
