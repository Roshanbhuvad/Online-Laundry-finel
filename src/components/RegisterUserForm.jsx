import React, { Component } from "react";
import axios from "axios";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};
export default class RegisterUserForm extends Component {
  state = {
    username: "",
    password: "",
    email: "",
    phoneNumber: null,
    formErrors: {
      usernameError: "",
      emailError: "",
      phoneNumberError: "",
      passwordError: "",
    },
  }; /* This is where the magic happens */
  handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password,
    };
    axios
      .post("https://laundrybackend.herokuapp.com/user/registercustomer", user)
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
    const { name, value } = event.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "name":
        formErrors.usernameError =
          value.length < 3 ? "minimum 3 characters required" : "";
        break;
      case "password":
        formErrors.passwordError =
          value.length < 5 ? "minimum 5 characters required" : "";
        break;
      case "email":
        formErrors.emailError = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "phoneNumber":
        formErrors.phoneNumberError =
          value.length < 10 ? "minimum 10 characters required" : "";
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };
  render() {
    const { formErrors } = this.state;
    return (
      <div className="register">
        <h1 className="reghead">
          Want to find laundry shops near you?Register here
        </h1>
        <form className="regtform" onSubmit={this.handleSubmit}>
          <label className="rlabel">
            {" "}
            Your Name Here:
            <input
              className={formErrors.usernameError.length > 0 ? "error" : null}
              type="text"
              name="username"
              className="rinput"
              placeholder="enter your username"
              onChange={this.handleChange}
            />
          </label>
          <div style={{ fontSize: 20, color: "red" }}>
            {this.state.usernameError}
            {formErrors.usernameError.length > 0 && (
              <span className="errorMessage">{formErrors.usernameError}</span>
            )}
          </div>
          <label className="rlabel">
            {" "}
            Email:
            <input
              className={formErrors.emailError.length > 0 ? "error" : null}
              type="text"
              name="email"
              placeholder="enter your email"
              onChange={this.handleChange}
            />
          </label>
          <div style={{ fontSize: 20, color: "red" }}>
            {this.state.emailError}
            {formErrors.emailError.length > 0 && (
              <span className="errorMessage">{formErrors.emailError}</span>
            )}
          </div>
          <label className="rlabel">
            {" "}
            Phone Number:
            <input
              className={
                formErrors.phoneNumberError.length > 0 ? "error" : null
              }
              type="number"
              name="phoneNumber"
              className="rinput"
              placeholder="enter your mobile number"
              onChange={this.handleChange}
            />
          </label>
          <div style={{ fontSize: 20, color: "red" }}>
            {this.state.phoneNumberError}
            {formErrors.phoneNumberError.length > 0 && (
              <span className="errorMessage">
                {formErrors.phoneNumberError}
              </span>
            )}
          </div>
          <label className="rlabel">
            {" "}
            Password:
            <input
              className={formErrors.passwordError.length > 0 ? "error" : null}
              type="password"
              name="password"
              placeholder="enter your password"
              onChange={this.handleChange}
            />
          </label>
          <div style={{ fontSize: 20, color: "red" }}>
            {this.state.passwordError}
            {formErrors.passwordError.length > 0 && (
              <span className="errorMessage">{formErrors.passwordError}</span>
            )}
          </div>
          <button className="btn btn-success btn-block rgbutton" type="submit">
            {" "}
            register{" "}
          </button>
        </form>
      </div>
    );
  }
}
