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
class BranthDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      branchname: "",
      branchincharge: "",
      branchaddress: "",
      branch: {},
      batches: [],
      profileHide: true,
      user: "",
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:5000/api/branch/get/${this.props.match.params.id}`)
      .then((response) => {
        if (response.data.success) {
          this.setState({ branch: response.data.branch });
          this.setState({ batches: response.data.batches });
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

    if (!this.state.branchname) {
      errors.branchname = "Branch name is required";
    }

    // Email checks
    if (!this.state.branchaddress) {
      errors.branchaddress = "Branch address is required";
    }

    if (!this.state.branchincharge) {
      errors.branchincharge = "Branch branchincharge is required";
    }

    let obj = {};
    obj.branchname = this.state.branchname;
    obj.branchincharge = this.state.branchincharge;
    obj.branchaddress = this.state.branchaddress;
    axios
      .put(
        `http://localhost:5000/api/branch/edit/${this.props.match.params.id}`,
        obj
      )
      .then((response) => {
        if (response.data.success) {
          this.setState({ branch: response.data.branch });
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
    console.log("just logging", this.state.branch);
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
                    <h5>NAME: {this.state.branch.branchname}</h5>
                    <h5>Coach: {this.state.user}</h5>
                    <h5>Address: {this.state.branch.branchaddress}</h5>
                  </div>
                ) : (
                  <Row md={8}>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Name*</Form.Label>
                        <Form.Control
                          onChange={this.onChange}
                          value={this.state.branchname}
                          error={errors.branchname}
                          id='branchname'
                          type='text'
                          placeholder={`${this.state.branch.branchname}`}
                        />
                        <div style={{ color: "red" }}>
                          {this.state.errors.branchname}
                        </div>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId='formBasicPassword'>
                        <Form.Label>Incharge</Form.Label>
                        <select
                          onChange={this.onChange}
                          value={this.state.branchincharge}
                          error={errors.branchincharge}
                          id='branchincharge'
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
                        {this.state.errors.branchincharge}
                      </div>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Address*</Form.Label>
                        <Form.Control
                          onChange={this.onChange}
                          value={this.state.branchaddress}
                          id='branchaddress'
                          type='text'
                          placeholder={`${this.state.branch.branchaddress}`}
                        />
                        <div style={{ color: "red" }}>
                          {this.state.errors.branchaddress}
                        </div>
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
          <Card title='Assosiated Batches' isOption>
            <Table responsive hover>
              <tbody>
                {this.state.batches.map((item) => (
                  <tr className='unread'>
                    <td>
                      <h6 className='text-muted card-text'>{item.batchname}</h6>
                    </td>
                    <td>
                      <a
                        className='text-primary mb-1 card-text '
                        href={`/dashdoard/batchdedit/${item._id}`}
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

BranthDetail.propTypes = {
  auth: PropTypes.object.isRequired,
  coach2: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  coach2: state.coach2,
});

export default connect(mapStateToProps, { get_coach_view2_axios })(
  withRouter(BranthDetail)
);
