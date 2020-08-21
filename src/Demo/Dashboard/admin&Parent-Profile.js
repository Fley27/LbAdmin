import React, { Component, useState } from "react";
import "./profile.css";
import Aux from "../../hoc/_Aux";
import axios from "axios";
import {
  Row,
  Col,
  Table,
  Tabs,
  Tab,
  Form,
  Button,
  Alert,
  FormControl,
} from "react-bootstrap";

import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class AdminParent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filename: "",
      file: "",
      uploadedfilepath: "",
      uploadedfilename: "",
      type: "",
      uploadPercentage: 0,
      successer: null,
      errstr: null,
      uploadedfile: {},
      profileHide: true,
      errors: {},
      name: "",
      conntact: "",
      address: "",
      bio: "",
      filepath: "",
      user: {},
    };
  }

  componentDidMount() {
    console.log(this.props.auth);
    axios
      .get(
        `https://mighty-ridge-28744.herokuapp.com/api/users/profile/${this.props.auth.user.id}`
      )
      .then((response) => {
        if (response.data.success) {
          this.setState({ user: response.data.user });
          this.setState({ name: this.state.user.name });
          this.setState({ contact: this.state.user.contact });
        } else {
          alert("Couldnt get blog`s lists");
        }
      });
  }

  handleClick = () => {
    this.setState({
      profileHide: !this.state.profileHide,
    });
  };
  handlefileclick = (e) => {
    this.setState({ errstr: null });
    this.setState({ uploadedfilename: null });
    this.setState({ uploadedfilepath: null });
    this.setState({ successer: null });
    this.setState({ filepath: null });
    console.log("files", e.target.files[0].name);
    this.setState({ file: e.target.files[0] }, () => {
      console.log("just logging", this.state.file);
    });
    this.setState({ filename: e.target.files[0].name });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    let errors = {};

    if (!this.state.name) {
      errors.name = "Branch name is required";
    }

    // Email checks
    if (!this.state.contact) {
      errors.contact = "Branch contact is required";
    }

    const formData = new FormData();
    formData.append("file", this.state.file);
    try {
      const res = await axios.post(
        "https://mighty-ridge-28744.herokuapp.com/api/users/fileupload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      this.setState({ uploadedfilename: res.data.filename });
      this.setState({ uploadedfilepath: res.data.filepath });
      this.setState({ type: res.data.type });
      this.setState({ successer: "File uploaded successfully !" });
      this.setState({ filepath: res.data.filepath });
      /* this.setState({ type: res.data.filepath }); */
    } catch (error) {
      if (error.response.status === 500) {
        console.log("there was a server error !");
        this.setState({
          errstr:
            "Check selected file, A server error occured ! Please try again",
        });
      } else {
        console.log(error.response.data.msg);
        this.setState({ errstr: error.response.data.msg });
      }
    }
    let obj = {};
    obj.name = this.state.name;
    obj.contact = this.state.contact;
    obj.filepath = this.state.filepath;
    axios
      .put(
        `https://mighty-ridge-28744.herokuapp.com/api/users/profile/${this.props.auth.user.id}`,
        obj
      )
      .then((response) => {
        if (response.data.success) {
          this.setState({ user: response.data.user });
          toast.success(`${response.data.msg}`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          alert("Couldnt get blog`s lists");
        }
      });
    this.setState({
      profileHide: !this.state.profileHide,
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    const errors = this.state;
    console.log("just logging", this.state);
    const orgname = this.state.user.name;
    const orgcontact = this.state.user.contact;

    return (
      <Aux>
        <ToastContainer />
        <div className='container emp-profile'>
          <Form method='post' noValidate onSubmit={this.onSubmit}>
            <div className='row'>
              <div className='col-md-4'>
                <div className='profile-img rounded-circle'>
                  <img
                    style={{ width: 300, height: 300 }}
                    src={this.state.user.filepath}
                    alt={`alt`}
                    className='img-radius'
                  />

                  {this.state.profileHide ? null : (
                    <div
                      style={{ width: "100%" }}
                      className='file btn btn-lg btn-primary'
                    >
                      Click.....
                      <input
                        onChange={this.handlefileclick}
                        id='branchcontact'
                        type='file'
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className='col-md-6'>
                {this.state.profileHide ? (
                  <div className='profile-head'>
                    <h5>NAME: {this.state.user.name}</h5>
                    <h5>CONTACT: {this.state.user.contact}</h5>
                    <h5>Role: {this.state.user.usertype}</h5>
                  </div>
                ) : (
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Name*</Form.Label>
                        <Form.Control
                          onChange={this.onChange}
                          value={this.state.name}
                          error={errors.name}
                          id='name'
                          type='text'
                          placeholder={`${this.state.user.name}`}
                        />
                        <div style={{ color: "red" }}>
                          {this.state.errors.name}
                        </div>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Contact*</Form.Label>
                        <Form.Control
                          onChange={this.onChange}
                          value={this.state.contact}
                          error={errors.contact}
                          id='contact'
                          type='text'
                          placeholder={`${this.state.user.contact}`}
                        />
                        <div style={{ color: "red" }}>
                          {this.state.errors.contact}
                        </div>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Role*</Form.Label>
                        <Form.Control
                          onChange={this.onChange}
                          value={this.state.user.usertype}
                          id='userType'
                          type='text'
                          placeholder='@ example admin'
                          readOnly
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                )}
              </div>
              <div className='col-md-2'>
                <Button
                  onClick={this.handleClick}
                  variant={this.state.profileHide ? "dark" : "danger"}
                >
                  {this.state.profileHide ? "Edit" : "Cancel"}
                </Button>
              </div>
            </div>
            <Row>
              {this.state.profileHide ? null : (
                <Col md={12}>
                  <Button variant='primary' type='submit'>
                    Change Profile
                  </Button>
                </Col>
              )}
            </Row>
          </Form>
        </div>
      </Aux>
    );
  }
}

AdminParent.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(AdminParent));
