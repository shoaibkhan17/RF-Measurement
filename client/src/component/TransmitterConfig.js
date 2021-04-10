import React from "react";
import {
  TextField,
  Button,
  LinearProgress,
  Typography,
  FormControl,
  FormHelperText,
  Select,
} from "@material-ui/core";
import axios from "axios";
import "../styles/styles.css";

const GET_NOISE_FILE_URL = "http://localhost:5000/getNoiseFiles";
const START_TRANSMISSION_URL = "http://localhost:5000/startTransmit";

class TransmitterConfig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gain: 60.4,
      cFreq: "5.22e9",
      sampleRate: "20e6",
      transmitting: false,
      files: [],
      selectedFile: "",
    };
    this.getNoiseFiles = this.getNoiseFiles.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.startTransmission = this.startTransmission.bind(this);
  }

  componentDidMount() {
    this.getNoiseFiles();
  }

  async getNoiseFiles() {
    axios
      .get(GET_NOISE_FILE_URL)
      .then((res) => {
        this.setState({ files: res.data, selectedFile: res.data[0] });
      })
      .catch((error) => this.console.log(error));
  }

  handleClick() {
    if (!this.state.transmitting) {
      this.startTransmission();
    } else {
      this.setState({ transmitting: false });
    }
  }

  async startTransmission() {
    var obj = {
      gain: this.state.gain,
      cFreg: this.state.cFreq,
      sampleRate: this.state.sampleRate,
      selectedFile: this.state.selectedFile,
    };

    axios
      .post(START_TRANSMISSION_URL, obj)
      .then((res) => this.setState({ transmitting: true }))
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
            Enter USRP Transmitter Parameters
          </Typography>
        </div>
        <div className="formContainer">
          <TextField
            label="Gain"
            placeholder="20"
            variant="outlined"
            fullWidth
            type="number"
            value={this.state.gain}
            onChange={(event) => this.setState({ gain: event.target.value })}
            style={{ paddingBottom: "4%" }}
          />
          <TextField
            label="Center Frequency"
            variant="outlined"
            placeholder="5.22e9"
            fullWidth
            type="number"
            value={this.state.cFreq}
            onChange={(event) => this.setState({ cFreq: event.target.value })}
            style={{ paddingBottom: "4%" }}
          />
          <TextField
            label="Sample Rate"
            variant="outlined"
            placeholder="20e6"
            fullWidth
            type="number"
            value={this.state.sampleRate}
            onChange={(event) =>
              this.setState({ sampleRate: event.target.value })
            }
            style={{
              paddingBottom: "4%",
            }}
          />

          <FormControl fullWidth>
            <Select
              value={this.state.selectedFile}
              native
              onChange={(event) =>
                this.setState({ selectedFile: event.target.value })
              }
            >
              {this.state.files.map((file) => (
                <option key={file} value={file}>
                  {file}
                </option>
              ))}
            </Select>
            <FormHelperText>Select Noise File</FormHelperText>
          </FormControl>
        </div>

        <div className="buttonContainer">
          <Button
            variant="contained"
            fullWidth
            color={this.state.transmitting ? "secondary" : "primary"}
            onClick={this.handleClick}
          >
            {this.state.transmitting ? "Stop Transmitting" : "Transmit"}
          </Button>
          {this.state.transmitting && (
            <LinearProgress color="primary" style={{ color: "#33eb91" }} />
          )}
        </div>
      </div>
    );
  }
}

export default TransmitterConfig;
