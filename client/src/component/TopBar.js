import React from "react";
import { Toolbar, AppBar, IconButton } from "@material-ui/core";
import WifiIcon from "@material-ui/icons/Wifi";

class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div style={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ background: "lightblue" }}>
          <Toolbar style={{ background: "#3298dc" }}>
            <IconButton>
              <WifiIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default TopBar;
