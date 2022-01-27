import React from "react";

type Props = {
  startTimeInSeconds: number;
};

// type State = {
//   timeRemainingInSeconds: number;
// };
const toSeconds = 60;

export default class Timer extends React.Component<any, any> {
  private timer: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      timeRemainingInSeconds: 25 * toSeconds,
      timerMinutes: 25,
      breakMinutes: null,
      hasStarted: false,
    };

    this.handleStart = this.handleStart.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleStart(event: any) {
    event.preventDefault();
    if (!this.state.hasStarted) {
      this.decrementTimeRemaining();
      this.timer = setInterval(() => {
        this.decrementTimeRemaining();
      }, 1000);
      this.setState({
        hasStarted: true,
      });
    } else {
      clearInterval(this.timer);
      // this.decrementTimeRemaining(); //? Should timer continue immediately after re-starting?
      this.timer = setInterval(() => {
        this.decrementTimeRemaining();
      }, 1000);
    }
  }

  handleStop(event: any) {
    event.preventDefault();
    clearInterval(this.timer);
  }

  handleReset(event: any) {
    event.preventDefault();
    clearInterval(this.timer);
    this.setState({
      timeRemainingInSeconds: this.state.timerMinutes * toSeconds,
      hasStarted: false,
    });
  }

  handleChange(event: any) {
    event.preventDefault(); //? TODO: Is this necessary?
    this.setState({
      [event.target.name]: event.target.value,
    });
    if (!this.state.hasStarted && event.target.name === "timerMinutes") {
      this.setState({
        [event.target.name]: event.target.value,
        //TODO: Change this part to account for when break timer is running
        timeRemainingInSeconds: event.target.value * toSeconds
      });
    }
  }

  decrementTimeRemaining = () => {
    if (this.state.timeRemainingInSeconds > 0) {
      this.setState({
        timeRemainingInSeconds: this.state.timeRemainingInSeconds - 1,
      });
    } else {
      alert("Timer Completed");
      clearInterval(this.timer);
      //TODO: Switch to break timer
    }
  };

  displayTime = () => {
    let minutes = Math.floor(this.state.timeRemainingInSeconds / toSeconds);
    let seconds = this.state.timeRemainingInSeconds - minutes * toSeconds;

    let secondsString = null;
    let minutesString = null;

    // Append "0" to the front if it is less than 10
    if (seconds < 10) {
      secondsString = "0" + seconds;
    }
    if (minutes < 10) {
      minutesString = "0" + minutes;
    }

    return `${minutesString ? minutesString : minutes}:${secondsString ? secondsString : seconds
      }`;
  };

  render() {
    return (
      <div>
        <div>
          <form>
            <div className="inputs">
              <label htmlFor="focus-length">Focus Length</label>
              <select value={this.state.timerMinutes} onChange={this.handleChange} id="focus-length" name="timerMinutes">
                <option value="15">15</option>
                <option selected value="25">25</option>
                <option value="30">30</option>
                <option value="45">45</option>
              </select>
              <label htmlFor="break-length">Break Length</label>
              <select value={this.state.breakMinutes} onChange={this.handleChange} id="break-length" name="breakMinutes">
                <option selected value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>
            <div className="buttons">
              <button id="start" onClick={this.handleStart.bind(this)}>
                Start
              </button>
              <button id="stop" onClick={this.handleStop.bind(this)}>
                Stop
              </button>
              <button id="reset" onClick={this.handleReset.bind(this)}>
                Reset
              </button>
            </div>
          </form>
        </div>
        <div className="countdown-timer">{this.displayTime()}</div>
      </div>
    );
  }
}
