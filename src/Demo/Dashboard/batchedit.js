import React, { Component, useState } from "react";
import "./profile.css";
import Aux from "../../hoc/_Aux";
import axios from "axios";
import { get_coach_view2_axios } from "../actions/coach2actions";
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
  CarouselItem,
} from "react-bootstrap";

import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Card from "../../App/components/MainCard";
import "react-toastify/dist/ReactToastify.css";
class BatchEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      batchname: "",
      coachid: "",
      sport: "",
      batch: {},
      students: [],
      profileHide: true,
      user: "",
    };
  }

  componentDidMount() {
    axios
      .get(
        `http://localhost:5000/api/branch/get/batch/${this.props.match.params.id}`
      )
      .then((response) => {
        if (response.data.success) {
          this.setState({ batch: response.data.batch });
          this.setState({ students: response.data.students });
          this.setState({ user: response.data.user });
        } else {
          alert("Couldnt get blog`s lists");
        }
      });
    this.props.get_coach_view2_axios();
  }

  handleClick = () => {
    this.setState({
      profileHide: !this.state.profileHide,
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    let errors = {};

    if (!this.state.batchname) {
      errors.batchname = "batch name is required";
    }

    // Email checks
    if (!this.state.sport) {
      errors.sport = "batch sport is required";
    }

    if (!this.state.coachid) {
      errors.coachid = "batch coachid is required";
    }

    let obj = {};
    obj.batchname = this.state.batchname;
    obj.coachid = this.state.coachid;
    obj.sport = this.state.sport;
    axios
      .put(
        `http://localhost:5000/api/branch/edit/batch/${this.props.match.params.id}`,
        obj
      )
      .then((response) => {
        if (response.data.success) {
          this.setState({ batch: response.data.batch });
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
    console.log("just logging", this.state.batch);
    const { coachlist } = this.props.coach2;
    return (
      <Aux>
        <ToastContainer />
        <div className='container emp-profile'>
          <Form method='post' noValidate onSubmit={this.onSubmit}>
            <div className='row'>
              <div className='col-md-6'>
                {this.state.profileHide ? (
                  <div className='profile-head'>
                    <h5>NAME: {this.state.batch.batchname}</h5>
                    <h5>Coach: {this.state.user}</h5>
                    <h5>Address: {this.state.batch.sport}</h5>
                  </div>
                ) : (
                  <Row md={8}>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Name*</Form.Label>
                        <Form.Control
                          onChange={this.onChange}
                          value={this.state.batchname}
                          error={errors.batchname}
                          id='batchname'
                          type='text'
                          placeholder={`${this.state.batch.batchname}`}
                        />
                        <div style={{ color: "red" }}>
                          {this.state.errors.batchname}
                        </div>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId='formBasicPassword'>
                        <Form.Label>Coach</Form.Label>
                        <select
                          onChange={this.onChange}
                          value={this.state.coachid}
                          error={errors.coachid}
                          id='coachid'
                          type='text'
                          className='form-control mb-3'
                        >
                          <option value=''>Select a coach</option>
                          {console.log(coachlist)}
                          {coachlist.map(({ _id, name, contact }) => (
                            <option value={_id}>{name}</option>
                          ))}
                        </select>
                      </Form.Group>
                      <div style={{ color: "red" }}>
                        {this.state.errors.coachid}
                      </div>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Sport*</Form.Label>
                        <Form.Control
                          onChange={this.onChange}
                          value={this.state.batch.sport}
                          id='sport'
                          type='text'
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
                    Save
                  </Button>
                </Col>
              )}
            </Row>
          </Form>
        </div>
        <Col md={6}>
          <Card title='Assosiated Students' isOption>
            <Table responsive hover>
              <tbody>
                {this.state.students.map((item) => (
                  <tr className='unread'>
                    <td>
                      <h6 className='text-muted card-text'>{item.name}</h6>
                    </td>
                    <td>
                      <a
                        className='text-primary mb-1 card-text '
                        href={`/dashdoard/batchdetails/${item._id}`}
                      >
                        details <i class=' feather icon-chevrons-right'></i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Aux>
    );
  }
}

BatchEdit.propTypes = {
  auth: PropTypes.object.isRequired,
  coach2: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  coach2: state.coach2,
});

export default connect(mapStateToProps, { get_coach_view2_axios })(
  withRouter(BatchEdit)
);
