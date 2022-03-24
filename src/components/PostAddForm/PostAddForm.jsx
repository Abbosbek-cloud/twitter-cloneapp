import React from "react";

import "./PostAddForm.css";

export default class PostAddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeValue(e) {
    // console.log(e.target.value);
    this.setState({ value: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.value) {
      this.props.onAdd(this.state.value);
    } else {
      console.log("Enter something");
    }
    this.setState({
      value: "",
    });
  }
  render() {
    return (
      <form className="bottom-panel d-flex" onSubmit={this.onSubmit}>
        <input
          type="text"
          placeholder="What are you thinking about"
          className="form-control new-post-panel"
          onChange={this.onChangeValue}
          value={this.state.value}
        />
        <button type="submit" className="btn btn-outline-secondary">
          Add Post
        </button>
      </form>
    );
  }
}
