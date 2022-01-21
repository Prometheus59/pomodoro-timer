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
      timeRemainingInSeconds: 0,
      breakMinutes: 0,
      timerMinutes: 25,
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
        timeRemainingInSeconds: this.state.timerMinutes * 60,
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

  render() {
    return (
      <div>
        <div>
          <form>
            <input
              id="focus-length"
              type={`number`}
              name="Focus Length"
              value={this.state.timerMinutes}
              onChange={this.handleChange}
            />
            <input
              id="break-length"
              type={"number"}
              name="Break Length"
              value={this.state.breakMinutes}
              onChange={this.handleChange}
            />
            <button onClick={this.handleStart.bind(this)}>Start</button>
            <button onClick={this.handleStop.bind(this)}>Stop</button>
            <button onClick={this.handleReset.bind(this)}>Reset</button>
          </form>
        </div>
        <div className="countdown-timer">
          {this.state.timeRemainingInSeconds}s
        </div>
      </div>
    );
  }
}
