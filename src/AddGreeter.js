import React, { Component } from 'react';
import './AddGreeter.css';

class AddGreeter extends Component {
  constructor(props) {
    super(props);
    this.addGreeting = this.addGreeting.bind(this);
    this.state = { greetingName: '' };
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  handleUpdate(event) {
    this.setState({ greetingName: event.target.value });
  }
  render() {
    return (
      <div className="AddGreeter">
        <input
          type="text"
          onChange={this.handleUpdate}
          value={this.state.greetingName}
        />
        &nbsp;&nbsp;
        <button onClick={this.addGreeting}>Add</button>
      </div>
    );
  }

  addGreeting() {
    this.props.addGreeting(this.state.greetingName);
    this.setState({ greetingName: '' });
  }

}

export default AddGreeter;