import React, { Component } from "react";
import axios from "axios";
import { Row, Col, Table, Form, Button } from "react-bootstrap";
import Aux from "../../hoc/_Aux";
import Card from "../../App/components/MainCard";
import DEMO from "../../store/constant";

import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  registerBranch,
  get_branches,
  registerBatch,
  admissionProc,
} from "../actions/branchActions";
import { getUser } from "../actions/userActions";
import { get_coach_view2_axios } from "../actions/coach2actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const __DEV__ = document.domain === "localhost";

class PaymentGuest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subscriptionduration: "",
      totalfees: "",
      addate: "",
      errors: {},
      succeserret: {},
      user: {},
      search: "",
      toggel: "",
    };
  }

  onChange = (e) => {
    console.log(
      "targeting state " + e.target.id + " with value " + e.target.value
    );

    this.setState({ [e.target.id]: e.target.value });
  };
  setfees = (e) => {
    delete this.state.errors["subscriptionduration"];
    this.setState({ subscriptionduration: e.target.value }, () => {
      console.log(this.state.subscriptionduration, "state changed --forced");
    });
    this.setState(
      { totalfees: e.target.value * this.props.match.params.fees },
      () => {
        console.log(this.state, "state changed --forced");
      }
    );
  };
  async displayRazorpay(obj, batch, student, user) {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const data = await fetch(
      `http://localhost:5000/api/paymentsraz/razorpay/${batch}`,
      {
        method: "POST",
      }
    ).then((t) => t.json());

    console.log(data);
    //Change "rzp_test_yJX3rHu06JXDSH" to yours
    const options = {
      key: __DEV__ ? "rzp_test_yJX3rHu06JXDSH" : "rzp_live_AgYBEhL6xjcZYq",
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: "Donation",
      description: "Thank you for nothing. Please give us some money",
      image: "http://localhost:5000/api/paymentsraz/logo.svg",
      handler: function (response) {
        if (
          response.razorpay_payment_id != null &&
          response.razorpay_order_id != null &&
          response.razorpay_signature != null
        ) {
          axios
            .post(
              `http://localhost:5000/api/users/fees/${batch}/${student}`,
              obj
            )
            .then((response) => {
              if (response.data.success) {
                toast.success(" Save with succes!", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              }
            });
        }
      },
      prefill: {
        name: `${user.name}`,
        email: `ch@gmail.com`,
        phone: `9999999999`,
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  onSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    let find = false;

    if (!this.state.subscriptionduration) {
      errors.subscriptionduration = "Branch subscriptionduration is required";
      find = true;
    }

    if (!this.state.totalfees) {
      errors.totalfees = "Branch totalfees is required";
      find = true;
    }

    // Email checks
    if (!this.state.addate) {
      errors.addate = "Branch addate is required";
      find = true;
    }

    if (find) {
      this.setState({ errors: errors });
      // return 0;
    }
    let obj = {};
    obj.subscriptionduration = this.state.subscriptionduration;
    obj.totalfees = this.state.totalfees;
    obj.addate = this.state.addate;

    this.displayRazorpay(
      obj,
      this.props.match.params.batch,
      this.props.match.params.student,
      this.props.auth.user
    );
  };

  render() {
    const { errors } = this.state;

    return (
      <Aux>
        <ToastContainer />
        <Row>
          <Col>
            <Card title='Payment form' isOption>
              <Col md={12}>
                <Form noValidate onSubmit={this.onSubmit}>
                  <Row>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>
                          Subscription duration (at time of admission)
                        </Form.Label>
                        <Form.Control
                          onChange={this.setfees}
                          value={this.state.subscriptionduration}
                          error={errors.subscriptionduration}
                          id='subscriptionduration'
                          as='select'
                          className='mb-3'
                        >
                          <option>Select a duration</option>
                          <option value={1}>1 Month</option>
                          <option value={3}>3 Month</option>
                          <option value={6}>6 Month</option>
                          <option value={12}>12 Month</option>
                        </Form.Control>
                      </Form.Group>
                      <span style={{ color: "red" }}>
                        {this.state.errors.subscriptionduration}
                      </span>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>
                          Fees to be paid (at time of admission)
                        </Form.Label>
                        <Form.Control
                          onChange={this.onChange}
                          value={this.state.totalfees}
                          error={errors.totalfees}
                          id='totalfees'
                          type='test'
                          disabled={"disabled"}
                          placeholder='Total fees'
                        />
                      </Form.Group>
                      <div style={{ color: "red" }}>
                        {this.state.errors.totalfees}
                      </div>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Date of joining</Form.Label>
                        <Form.Control
                          onChange={this.onChange}
                          value={this.state.addate}
                          error={errors.addate}
                          id='addate'
                          type='date'
                          placeholder='Expected fees'
                        />
                      </Form.Group>
                      <span style={{ color: "red" }}>
                        {this.state.errors.addate}
                      </span>
                    </Col>

                    <Col md={12}>
                      <Button variant='primary' type='submit'>
                        Pay now
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Card>
          </Col>
        </Row>
      </Aux>
    );
  }
}

PaymentGuest.propTypes = {
  admissionProc: PropTypes.func.isRequired,
  registerBranch: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  coach2: PropTypes.object.isRequired,
  branch: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  coach2: state.coach2,
  branch: state.branch,
  users: state.users,
});
export default connect(mapStateToProps, {
  registerBranch,
  get_branches,
  get_coach_view2_axios,
  registerBatch,
  admissionProc,
  getUser,
})(withRouter(PaymentGuest));
