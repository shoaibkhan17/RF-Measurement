import React from "react";
import {
  TextField,
  Button,
  LinearProgress,
  Typography,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import axios from "axios";
import "../styles/styles.css";

const START_SESSION_URL = "http://localhost:5000/startSession";

class IPerfConfig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientIP: "10.1.0.1",
      outputInterval: "0.5",
      time: "100000",
      UDP: true,
      inSession: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.startSession = this.startSession.bind(this);
  }

  componentDidMount() {}

  handleClick() {
    if (!this.state.inSession) {
      this.startSession();
    } else {
      this.setState({ inSession: false });
    }
  }

  async startSession() {
    var obj = {
      clientIP: this.state.clientIP,
      outputInterval: this.state.outputInterval,
      time: this.state.time,
      UDP: this.state.UDP,
    };

    axios
      .post(START_SESSION_URL, obj)
      .then((res) => this.setState({ inSession: true }))
      .catch((error) => this.console.log(error));
  }

  render() {
    return (
      <div className="box">
        <div className="title">
          <Typography
            variant="h6"
            style={{
              paddingBottom: "15px",
              color: "rgb(50, 152, 220)",
              textDecoration: "underline",
            }}
          >
            Enter iPerf Parameters
          </Typography>
        </div>

        <div className="formContainer">
          <TextField
            label="Client IP"
            placeholder="10.1.0.1"
            variant="outlined"
            fullWidth
            value={this.state.clientIP}
            onChange={(event) =>
              this.setState({ clientIP: event.target.value })
            }
            style={{ paddingBottom: "4%" }}
          />
          <TextField
            label="Output Interval (seconds)"
            variant="outlined"
            placeholder="0.5"
            fullWidth
            type="number"
            value={this.state.outputInterval}
            onChange={(event) =>
              this.setState({ outputInterval: event.target.value })
            }
            style={{ paddingBottom: "4%" }}
          />
          <TextField
            label="Time (seconds)"
            variant="outlined"
            placeholder="100000"
            fullWidth
            type="number"
            value={this.state.time}
            onChange={(event) => this.setState({ time: event.target.value })}
            style={{
              paddingBottom: "4%",
            }}
          />

          <FormControlLabel
            control={
              <Switch
                checked={this.state.UDP}
                onChange={() => this.setState({ UDP: !this.state.UDP })}
                color="primary"
              />
            }
            label="UDP"
          />
        </div>

        <div className="buttonContainer">
          <Button
            variant="contained"
            fullWidth
            color={this.state.inSession ? "secondary" : "primary"}
            onClick={this.handleClick}
          >
            {this.state.inSession ? "Stop Session" : "Start Session"}
          </Button>
          {this.state.inSession && (
            <LinearProgress color="primary" style={{ color: "#33eb91" }} />
          )}
        </div>
      </div>
    );
  }
}

export default IPerfConfig;
