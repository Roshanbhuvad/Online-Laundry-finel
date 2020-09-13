import React, { Component } from "react";
import axios from "axios";

class LoginForm extends Component {
  state = {
    username: "",
    password: "",
  }; /* This is where the magic happens */
  handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password,
    };
    axios
      .post("https://laundrybackend.herokuapp.com/login", user)
      .then((res) => {
        console.log(res);
        // window.location = "/retrieve"; //This line of code will redirect you once the submission is succeed
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    return (
    <div className = "login">
     <h1 className = "reghead">login</h1>
      <form className = "logform"onSubmit={this.handleSubmit}>
        <label className = "rglabel">
          {" "}
          UserName:
          <input type="text" name="username" placeholder = "enter your username"onChange={this.handleChange} />
        </label>
        <label className = "rglabel">
          {" "}
          Password:
          <input type="password" name="password" placeholder = "enter your password"onChange={this.handleChange} />
        </label>
        <button type="submit" className = "btn btn-success btn-block rgbutton"> login </button>
      </form>
      </div>
    );
  }
}
export default LoginForm;
