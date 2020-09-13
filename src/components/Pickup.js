import React, { Component } from "react";
import { Pickup } from "./PickupFunction";
import { Link } from "react-router-dom";

class PickupUser extends Component {
  constructor() {
    super();
    this.state = {
      customerId: "",
      slot: "",
      qunatity: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.props);
  }
  onSubmit(e) {
    e.preventDefault();

    const user = {
      slot: this.state.slot,
      qunatity: this.state.qunatity,
    };

    Pickup(user).then((res) => {
      if (res) {
        this.props.history.push(`/book/payment`);
      }
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
              <div className="form-group">
                <label htmlFor="slot" className="font-weight-bold text-danger">
                  Choose you Pickup Slot
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="slot"
                  placeholder="9am-10pm"
                  value={this.state.slot}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="qunatity"
                  className="font-weight-bold text-danger"
                >
                  Specify number of Clothes, Price/Cloth is{" "}
                  {this.props.location.price}
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="qunatity"
                  placeholder="In number"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <Link
                to={{
                  pathname: "/payment",
                  price: this.props.location.price * this.state.qunatity,
                }}
              >
                <button
                  type="Submit"
                  className="btn btn-lg btn-primary btn-block"
                >
                  Continue & checkout
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default PickupUser;
