import React from "react";
import TopBar from "./TopBar";
import Home from "./Home";

class Main extends React.Component {
  render() {
    return (
      <div style={{ height: "100vh" }}>
        <TopBar />
        <Home />
      </div>
    );
  }
}

export default Main;
