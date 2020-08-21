import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import { Row, Col, Form, Button } from "react-bootstrap";
import "./SignUp1.css";

class SignUp1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: 0,
      name: "",
      email: "",
      city: "",
      address: "",
      password: "",
      confirmPassword: "",
      isContainNumber: false,
      checked: false,
      errors: {},
    };
  }

  onChange = (e) => {
    let errors = {};
    if (["name"].includes(e.target.id)) {
      if (!e.target.value.match(/^[a-zA-Z, ]+$/)) {
        errors.name = "Must be a letter.";
        this.setState({ errors: errors });
        return 0;
      } else {
        errors.name = "";
        this.setState({ errors: errors });
      }
    } else if (["contact"].includes(e.target.id)) {
      if (this.state.contact.length === 9) {
        errors.contact = "";
        this.setState({ errors: errors });
      } else {
        errors.contact = "Must contain 10 digit";
        this.setState({ errors: errors });
      }
    } else if (["password"].includes(e.target.id)) {
      if (this.state.password.length < 8) {
        errors.password = "Must contain at least 8 digit";
        this.setState({ errors: errors });
        if (!e.target.value.match(/^[a-zA-Z]+$/)) {
          this.setState({ isContainNumber: true });
        }
      } else {
        if (!this.state.password.match(/^[a-zA-Z]+$/)) {
          this.setState({ isContainNumber: true });
        } else {
          this.setState({ isContainNumber: false });
          errors.password = "Must contain at least 1 digit";
          this.setState({ errors: errors });
        }
        if (!e.target.value.match(/^[a-zA-Z]+$/)) {
          errors.password = "";
          this.setState({ errors: errors });
          this.setState({ isContainNumber: true });
        }
      }
    } else if (["confirmPassword"].includes(e.target.id)) {
      let confirm = `${this.state.confirmPassword}${e.target.value}`;
      if (confirm === this.state.password) {
        errors.confirmPassword = "";
        this.setState({ errors: errors });
      } else {
        errors.confirmPassword = "Must be same with the password";
        this.setState({ errors: errors });
      }
    }
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    let errors = {};
    let find = false;

    if (!this.state.name) {
      errors.name = "Branch name is required";
      find = true;
    }
    if (!this.state.contact) {
      errors.contact = "Branch contact is required";
      find = true;
    } else {
      if (this.state.contact.length !== 10) {
        errors.contact = "Branch contact must 10 digits";
        find = true;
      }
    }
    if (!this.state.city) {
      errors.city = "Please select a city";
      find = true;
    }
    if (!this.state.email) {
      errors.email = "Please provide your email";
      find = true;
    }
    if (!this.state.address) {
      errors.address = "Please provide address";
      find = true;
    }
    if (!this.state.password) {
      errors.password = "Please provide password";
      find = true;
    } else {
      if (this.state.password !== this.state.confirmPassword) {
        errors.password = "They are not same";
        errors.confirmPassword = "They are not same";
        find = true;
      }
    }

    if (find) {
      this.setState({ errors: errors });
      find = false;
      return 0;
    }

    let newUser = {};
    newUser.name = this.state.name;
    newUser.contact = this.state.contact;
    newUser.address = this.state.address;
    newUser.city = this.state.city;
    newUser.email = this.state.email;
    newUser.password = this.state.password;
    newUser.name = this.state.name;

    axios
      .post("http://localhost:5000/api/users/newuser", newUser)
      .then((response) => {
        if (response.data.success) {
          toast.success(`${response.data.msg}`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          this.props.history.push("/auth/signin-1");
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    let errors = this.state;
    return (
      <Aux>
        <Breadcrumb />
        <ToastContainer />
        <div className='auth-wrapper '>
          <div className='auth-content signup'>
            <div className='auth-bg'>
              <span className='r' />
              <span className='r s' />
              <span className='r s' />
              <span className='r' />
            </div>
            <div className='card  mb-12'>
              <div className='card-body text-center'>
                <div className='mb-4'>
                  <i className='feather icon-user-plus auth-icon' />
                </div>
                <h3 className='mb-4 '>Sign up</h3>
                <Col md={12}>
                  <Form noValidate onSubmit={this.onSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Name*</Form.Label>
                          <Form.Control
                            onChange={this.onChange}
                            value={this.state.name}
                            error={errors.name}
                            id='name'
                            type='text'
                            pattern='[a-zA-Z]'
                            placeholder='Name'
                          />
                          <div style={{ color: "red" }}>
                            {this.state.errors.name}
                          </div>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Contact*</Form.Label>
                          <Form.Control
                            onChange={this.onChange}
                            value={this.state.contact}
                            error={errors.contact}
                            id='contact'
                            type='number'
                            maxlength='10'
                            placeholder='10 digit mobile no'
                          />
                          <div style={{ color: "red" }}>
                            {this.state.errors.contact}
                          </div>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>City*</Form.Label>
                          <Form.Control
                            onChange={this.onChange}
                            value={this.state.city}
                            error={errors.city}
                            id='city'
                            as='select'
                            className='mb-6'
                          >
                            <option value=''>Select a city</option>
                            <option value='Amsterdam'>Amsterdam</option>
                            <option value='Putnik'>Putnik</option>
                            <option value='Vogatha'>Vogatha</option>
                          </Form.Control>
                        </Form.Group>
                        <div style={{ color: "red" }}>
                          {this.state.errors.city}
                        </div>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Address*</Form.Label>
                          <Form.Control
                            onChange={this.onChange}
                            value={this.state.address}
                            error={errors.address}
                            id='address'
                            type='text'
                            placeholder='Addresss '
                          />
                          <div style={{ color: "red" }}>
                            {this.state.errors.address}
                          </div>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Email*</Form.Label>
                          <Form.Control
                            onChange={this.onChange}
                            value={this.state.email}
                            error={errors.email}
                            id='email'
                            type='email'
                            placeholder='Email'
                          />
                          <div style={{ color: "red" }}>
                            {this.state.errors.email}
                          </div>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            onChange={this.onChange}
                            value={this.state.password}
                            error={errors.password}
                            id='password'
                            type='password'
                            placeholder='Password'
                            maxlength='15'
                          />
                        </Form.Group>
                        <div style={{ color: "red" }}>
                          {this.state.errors.password}
                        </div>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Confirm Password</Form.Label>
                          <Form.Control
                            onChange={this.onChange}
                            value={this.state.confirmPassword}
                            error={errors.confirmPassword}
                            disabled={!this.state.isContainNumber}
                            id='confirmPassword'
                            type='password'
                            placeholder='Confirm Password'
                            maxlength='15'
                          />
                        </Form.Group>
                        <div style={{ color: "red" }}>
                          {this.state.errors.confirmPassword}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <Button md={8} variant='primary' type='submit'>
                          Submit
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
                <p className='mb-0 text-muted'>
                  Allready have an account?{" "}
                  <NavLink to='/auth/signin-1'>Login</NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Aux>
    );
  }
}

export default SignUp1;
