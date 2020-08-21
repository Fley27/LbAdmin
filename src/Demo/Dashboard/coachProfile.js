import React, { Component, useState } from "react";
import "./coachProfile.css";
import "./profile.css";
import Aux from "../../hoc/_Aux";
import axios from "axios";
import AdminParent from "./admin&Parent-Profile";
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

import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Progress from "./Progress";

import Carousel from "react-bootstrap/Carousel";
import dash1 from "../../assets/images/widget/dashborad-1.jpg";
import dash2 from "../../assets/images/widget/dashborad-3.jpg";
import dash3 from "../../assets/images/widget/dashborad-2.jpg";

import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import "./coachProfile.css";

class CoachProfile extends Component {
  constructor() {
    super();
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
      certificateHide: true,
      bioHide: true,
      user: {},
      bio: "",
      filepath: "",
    };
  }

  componentDidMount() {
    axios
      .get(`https://mighty-ridge-28744.herokuapp.com/api/users/profile/${this.props.auth.user.id}`)
      .then((response) => {
        if (response.data.success) {
          this.setState({ user: response.data.user });
        } else {
          alert("Couldnt get the user's data");
        }
      });
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  certificateClick = () => {
    this.setState({
      certificateHide: !this.state.certificateHide,
    });
  };

  bioClick = () => {
    this.setState({
      bioHide: !this.state.bioHide,
    });
  };

  handlefileclick = (e) => {
    this.setState({ errstr: null });
    this.setState({ uploadedfilename: null });
    this.setState({ uploadedfilepath: null });
    this.setState({ successer: null });
    console.log("files", e.target.files[0].name);
    this.setState({ file: e.target.files[0] }, () => {
      console.log("just logging", this.state.file);
    });
    this.setState({ filename: e.target.files[0].name });
    this.setState({ filepath: null });
  };

  onSubmit = async (e) => {
    e.preventDefault();

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
        toast.error();
      } else {
        console.log(error.response.data.msg);
        this.setState({ errstr: error.response.data.msg });
      }
    }
    let obj = {};
    obj.filepath = this.state.filepath;
    console.log("IJIJFIQEFJIEWJFIJWEIQFJIFQWJIQWEF" + obj.filepath);
    axios
      .put(
        `https://mighty-ridge-28744.herokuapp.com/api/users/certificates/${this.props.auth.user.id}`,
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
      certificateHide: !this.state.certificateHide,
    });
  };

  bioSubmit = (e) => {
    e.preventDefault();
    let obj = {};
    obj.bio = this.state.bio;
    axios
      .put(
        `https://mighty-ridge-28744.herokuapp.com/api/users/bio/${this.props.auth.user.id}`,
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
      bioHide: !this.state.bioHide,
    });
  };

  render() {
    console.log("just logging", this.state);
    return (
      <Aux>
        <ToastContainer />
        <AdminParent />
        <Form noValidate onSubmit={this.bioSubmit}>
          <Row>
            <Col md={12} onClick={this.bioClick} style={{ cursor: "pointer" }}>
              <h1>Biography</h1><h6>(Click to edit)</h6>
            </Col>
          </Row>
          <Row>
            {this.state.bioHide === true ? (
              <div className='bio'>{this.state.user.bio}</div>
            ) : (
              <Row className='textarea'>
                <textarea
                  id='bio'
                  onChange={this.onChange}
                  value={this.state.bio}
                  rows='8'
                  cols='50'
                ></textarea>
                <Col md={12}>
                  <Button variant='primary' type='submit'>
                    Save Bio
                  </Button>
                </Col>
              </Row>
            )}
          </Row>
        </Form>
        <Form onSubmit={this.onSubmit}>
          <Row>
            <Col
              md={12}
              onClick={this.certificateClick}
              style={{ cursor: "pointer" }}
            >
              <h1>Certificates</h1>
            </Col>
          </Row>
          {this.state.certificateHide == true &&
          this.state.user.certificates ? (
            <Carousel
              style={{
                height: 500,
                border: "0 solid black",
                borderRadius: 20,
                overflow: "hidden",
                margin: "30px 0",
              }}
            >
              {this.state.user.certificates.map((item) => (
                <Carousel.Item key={item._id}>
                  <img
                    style={{ with: "100%", height: "100%" }}
                    className='d-block w-100 '
                    src={item.filepath}
                    alt='First slide'
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <Row>
              <Col md={4}>
                <Form.Group controlId='formBasicPassword'>
                  <Form.Label className='text-danger'></Form.Label>
                  <input
                    onChange={this.handlefileclick}
                    id='branchcontact'
                    type='file'
                    className='form-control'
                    placeholder='Contact No.'
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Button variant='primary' type='submit'>
                  Submit
                </Button>
              </Col>
            </Row>
          )}
        </Form>
        
      </Aux>
    );
  }
}

CoachProfile.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(CoachProfile));
