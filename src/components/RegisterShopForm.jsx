import React, { Component } from "react";
import axios from "axios";
import "../style.css";

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

export default class RegisterShopForm extends Component {
  state = {
    name: "",
    password: "",
    email: "",
    phoneNumber: null,
    OpeningTime: "",
    ClosingTime: "",
    lat: null,
    lng: null,
    price: null,
    address: "",
    selectedFile: null,
    formErrors: {
      nameError: "",
      emailError: "",
      phoneNumberError: "",
      OpeningTimeError: "",
      ClosingTimeError: "",
      passwordError: "",
    },
  }; /* This is where the magic happens */

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    const { name, value } = event.target;
    let formErrors = { ...this.state.formErrors };
    switch (name) {
      case "name":
        formErrors.nameError =
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
      case "ClosingTime":
        formErrors.ClosingTimeError =
          value.length < 2 ? "minimum 2 characters required" : "";
        break;
      case "OpeningTime":
        formErrors.OpeningTimeError =
          value.length < 2 ? "minimum 2 characters required" : "";
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };
  onClickHandler = () => {
    const data = new FormData();
    data.append("image", this.state.selectedFile);
    data.append("name", this.state.name);
    data.append("password", this.state.password);
    data.append("email", this.state.email);
    data.append("phoneNumber", this.state.phoneNumber);
    data.append("OpeningTime", this.state.OpeningTime);
    data.append("ClosingTime", this.state.ClosingTime);
    data.append("lat", this.state.lat);
    data.append("lng", this.state.lng);
    data.append("price", this.state.price);
    data.append("address", this.state.address);

    axios.post("http://localhost:3001/shops/registershop", data).then((res) => {
      // then print response status
      console.log(res);
    });
  };
  handleFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  render() {
    const { formErrors } = this.state;
    return (
      <div className="register">
        <h1 className="reghead">have a laundry shop?Register here</h1>
        <form className="regform" onSubmit={this.handleSubmit}>
          <label className="rlabel">
            {" "}
            Your Name Here:
            <input
              className={formErrors.nameError.length > 0 ? "error" : null}
              type="text"
              name="name"
              className="rinput"
              placeholder="enter your shop name"
              onChange={this.handleChange}
            />
          </label>
          <div style={{ fontSize: 20, color: "red" }}>
            {this.state.nameError}
            {formErrors.nameError.length > 0 && (
              <span className="errorMessage">{formErrors.nameError}</span>
            )}{" "}
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
              placeholder="enter your phoneNumber"
              className="rinput"
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
              className="linput"
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
          <label className="rlabel">
            {" "}
            OpeningTime:
            <input
              className={
                formErrors.OpeningTimeError.length > 0 ? "error" : null
              }
              type="text"
              name="OpeningTime"
              placeholder="enter your shop opening-time"
              className="rinput"
              onChange={this.handleChange}
            />
          </label>
          <div style={{ fontSize: 20, color: "red" }}>
            {this.state.OpeningTimeError}
            {formErrors.OpeningTimeError.length > 0 && (
              <span className="errorMessage">
                {formErrors.OpeningTimeError}
              </span>
            )}
          </div>
          <label className="rlabel">
            {" "}
            ClosingTime:
            <input
              className={
                formErrors.ClosingTimeError.length > 0 ? "error" : null
              }
              type="text"
              name="ClosingTime"
              placeholder="enter your shop closing-time"
              onChange={this.handleChange}
            />
          </label>
          <div style={{ fontSize: 20, color: "red" }}>
            {this.state.ClosingTimeError}
            {formErrors.ClosingTimeError.length > 0 && (
              <span className="errorMessage">
                {formErrors.ClosingTimeError}
              </span>
            )}
          </div>
          <label className="rlabel">
            {" "}
            lng:
            <input
              type="number"
              name="lng"
              placeholder="enter your lng location"
              className="rinput"
              onChange={this.handleChange}
            />
          </label>
          <label className="rlabel">
            {" "}
            Lat:
            <input
              type="number"
              name="lat"
              placeholder="enter your lat location"
              onChange={this.handleChange}
            />
          </label>
          <label className="rlabel">
            {" "}
            Address:
            <input
              type="text"
              name="address"
              className="rinput"
              placeholder="enter your shop address"
              onChange={this.handleChange}
            />
          </label>
          <label className="rlabel">
            {" "}
            price:
            <input
              type="number"
              name="price"
              placeholder="enter your shop's laundry price"
              onChange={this.handleChange}
            />
          </label>
          <div className="rimage">
            <input type="file" name="image" onChange={this.handleFileChange} />
          </div>
          <button
            type="button"
            class="btn btn-success btn-block rbutton"
            onClick={this.onClickHandler}
          >
            Upload and Submit
          </button>
        </form>
      </div>
    );
  }
}
