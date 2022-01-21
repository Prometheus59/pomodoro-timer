import React from "react";

type Props = {
  startTimeInSeconds: number;
};

type State = {
  timeRemainingInSeconds: number;
};

export default class Timer extends React.Component<any, any> {
  private timer: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      timeRemainingInSeconds: null,
      breakMinutes: null,
      timerMinutes: null,
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
      this.setState({
        // Default to 25 minute pomodoros
        timeRemainingInSeconds: this.state.timerMinutes
          ? this.state.timerMinutes * 60
          : 25 * 60,
      });
      this.timer = setInterval(() => {
        this.decrementTimeRemaining();
      }, 1000);
      this.setState({
        hasStarted: true,
      });
    } else {
      clearInterval(this.timer);
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
      timeRemainingInSeconds: this.state.timerMinutes * 60,
      hasStarted: false,
    });
  }

  // Consider using event parameter for the input fields (see above)
  handleChange() {
    const element = document.getElementById("focus-length") as HTMLInputElement;
    const element2 = document.getElementById(
      "break-length"
    ) as HTMLInputElement;
    this.setState({
      // Don't allow for setting a timer with negative time
      timerMinutes: parseInt(element.value) > 0 ? element.value : 0,
      breakMinutes: parseInt(element2.value) > 0 ? element2.value : 0,
    });
  }

  decrementTimeRemaining = () => {
    if (this.state.timeRemainingInSeconds > 0) {
      this.setState({
        timeRemainingInSeconds: this.state.timeRemainingInSeconds - 1,
      });
    } else {
      alert("Fucked up");
      clearInterval(this.timer);
    }
  };

  displayTime = () => {
    let minutes = Math.floor(this.state.timeRemainingInSeconds / 60);
    let seconds = this.state.timeRemainingInSeconds - minutes * 60;

    let secondsString = null;
    let minutesString = null;

    if (seconds < 10) {
      secondsString = "0" + seconds;
    }
    if (minutes < 10) {
      minutesString = "0" + minutes;
    }

    return `${minutesString ? minutesString : minutes}:${
      secondsString ? secondsString : seconds
    }`;
  };

  render() {
    return (
      <div>
        <div>
          <form>
            <div className="inputs">
              <label htmlFor="focus-length">Focus Length</label>
              <input
                id="focus-length"
                type={`number`}
                name="Focus Length"
                min={1}
                max={60}
                list="focus-length-list"
                value={this.state.timerMinutes}
                onChange={this.handleChange}
              />
              <datalist id="focus-length-list">
                <option value="15" />
                <option value="25" />
                <option value="30" />
                <option value="45" />
              </datalist>
              <label htmlFor="Break Length">Break Length</label>
              <input
                id="break-length"
                type={"number"}
                name="Break Length"
                min={1}
                max={30}
                list="break-length-list"
                value={this.state.breakMinutes}
                onChange={this.handleChange}
              />
            </div>
            <datalist id="break-length-list">
              <option value="5" />
              <option value="10" />
              <option value="15" />
              <option value="20" />
            </datalist>
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
