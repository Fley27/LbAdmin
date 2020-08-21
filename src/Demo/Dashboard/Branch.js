import React, { Component } from "react";
import { Row, Col, Table, Form, Button, FormControl } from "react-bootstrap";
import Aux from "../../hoc/_Aux";
import Card from "../../App/components/MainCard";

import avatar1 from "../../assets/images/user/avatar-1.jpg";
import avatar2 from "../../assets/images/user/avatar-2.jpg";
import avatar3 from "../../assets/images/user/avatar-3.jpg";

import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  registerBranch,
  get_branches,
  deleteBranch,
} from "../actions/branchActions";
import { get_coach_view2_axios } from "../actions/coach2actions";
import classnames from "classnames";
var empty = require("is-empty");
class Branch extends Component {
  constructor() {
    super();
    this.state = {
      branchname: "",
      branchaddress: "",
      branchincharge: "",
      branchcontact: "",
      city: "",
      errors: {},
      succeserret: {},
    };
  }

  componentDidMount() {
    /* this._isMounted = true; */
    console.log(
      "On coach page this is state " + this.props.auth.isAuthenticated
    );

    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("../auth/signin-1");
    }
    // fire functon to get branch & caoch list
    this.props.get_branches();
    this.props.get_coach_view2_axios();
  }
  componentWillReceiveProps(nextProps) {
    console.log("props are below =========>");
    console.log(nextProps);
    console.log("props are above =========>");
    if (nextProps.errors) {
      this.setState(
        {
          errors: nextProps.errors,
        },
        () => {
          console.log(this.state.errors, "dealersOverallTotal1");
        }
      );
    } else {
      this.setState(
        {
          errors: {},
        },
        () => {
          console.log(this.state.errors, "dealersOverallTotal1");
        }
      );
    }
    if (nextProps.succeserret) {
      this.setState(
        {
          succeserret: nextProps.succeserret,
        },
        () => {
          console.log(this.state.succeserret, "dealersOverallTotal1");
        }
      );
      this.props.history.push("/dashboard/branch");
    }
    /*  if(empty(this.state.coach2.coachlist)){
            alert("No coach found in app , PLease register a coach first");
            this.props.history.push("/coach");
        } */
  }
  onChange = (e) => {
    console.log(
      "targeting state " + e.target.id + " with value " + e.target.value
    );

    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      branchname: this.state.branchname,
      branchaddress: this.state.branchaddress,
      branchincharge: this.state.branchincharge,
      branchcontact: this.state.branchcontact,
      city: this.state.city,
    };
    console.log(newUser);

    this.props.registerBranch(newUser, this.props.history);
    this.props.get_branches();
    this.props.get_coach_view2_axios();
  };
  handleClick = (value) => () => {
    console.log(value._id);

    const deleteId = {
      delId: value._id,
    };
    if (window.confirm("Are you sure to delete this branch ?")) {
      this.props.deleteBranch(deleteId, this.props.history);
    }
    this.props.get_branches();
  };
  render() {
    const { errors } = this.state;
    const { succeserret } = this.state;
    const { branchlist } = this.props.branch;
    const { coachlist } = this.props.coach2;
    return (
      <Aux>
        <Row>
          <Col>
            <Card title='Branch creation form' isOption>
              <Col md={12}>
                <form noValidate onSubmit={this.onSubmit}>
                  <Row>
                    <Col md={4}>
                      <Form.Group controlId='formBasicPassword'>
                        <Form.Label>Branch Name</Form.Label>
                        <input
                          onChange={this.onChange}
                          value={this.state.branchname}
                          error={errors.branchname}
                          id='branchname'
                          type='text'
                          className={classnames("form-control", {
                            invalid: errors.branchname,
                          })}
                          placeholder='Branch name'
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId='formBasicPassword'>
                        <Form.Label>Branch Contact no.</Form.Label>
                        <input
                          onChange={this.onChange}
                          value={this.state.branchcontact}
                          error={errors.branchcontact}
                          id='branchcontact'
                          type='contact'
                          className={classnames("form-control", {
                            invalid: errors.branchcontact,
                          })}
                          placeholder='Contact No.'
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>City*</Form.Label>
                        <select
                          onChange={this.onChange}
                          value={this.state.city}
                          error={errors.city}
                          id='city'
                          className='form-control mb-3'
                        >
                          <option value=''>Select a city</option>
                          <option value='Amsterdam'>Amsterdam</option>
                          <option value='Putnik'>Putnik</option>
                          <option value='Vogatha'>Vogatha</option>
                        </select>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId='formBasicPassword'>
                        <Form.Label>Address</Form.Label>
                        <input
                          onChange={this.onChange}
                          value={this.state.branchaddress}
                          error={errors.branchaddress}
                          id='branchaddress'
                          type='text'
                          className={classnames("form-control", {
                            invalid: errors.branchaddress,
                          })}
                          placeholder='Branch Address'
                        />
                      </Form.Group>
                    </Col>{" "}
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
                    </Col>
                    <Col md={12}>
                      <Button variant='primary' type='submit'>
                        Submit
                      </Button>
                    </Col>
                    <Col md={12}>
                      <span style={{ color: "#cc0000" }}>
                        {" "}
                        {this.state.errors.city ||
                          this.state.errors.branchname ||
                          this.state.errors.branchaddress ||
                          this.state.errors.branchincharge ||
                          this.state.errors.branchcontact}
                      </span>
                      <span style={{ color: "#22bb33" }}>
                        {" "}
                        {this.state.errors.sucstring}
                      </span>
                    </Col>
                  </Row>
                </form>
              </Col>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card title='Branches' isOption>
              <Table responsive hover>
                <thead>
                  <th>Branch Name</th>
                  <th>Incharge </th>
                  <th>Contact</th>
                  <th>Actions</th>
                </thead>
                <tbody>
                  {branchlist.map(
                    ({
                      _id,
                      branchname,
                      branchaddress,
                      branchincharge,
                      branchcontact,
                    }) => (
                      <tr>
                        <td>{branchname}</td>
                        <td>
                          <h6 className='mb-1'>{branchincharge}</h6>
                        </td>
                        <td>{branchcontact}</td>
                        <td>
                          {/* <a class="btn btn-small"><i class="material-icons left">edit</i>edit</a>
                                                     <a class="btn btn-small red"><i class="material-icons left">delete</i>delete</a> */}
                          {/*  <a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12">Edit</a> */}
                          <a
                            href='#'
                            onClick={this.handleClick({ _id })}
                            className='label theme-bg2 text-white f-12'
                          >
                            Delete
                          </a>
                          <a
                            href={`/dashboard/branchdetails/${_id}`}
                            className='label theme-bg2 text-white f-12'
                          >
                            details
                          </a>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Aux>
    );
  }
}
Branch.propTypes = {
  registerBranch: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  coach2: PropTypes.object.isRequired,
  branch: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  coach2: state.coach2,
  branch: state.branch,
});

export default connect(mapStateToProps, {
  registerBranch,
  get_branches,
  get_coach_view2_axios,
  deleteBranch,
})(withRouter(Branch));
