import React, { Component } from "react";
import {
  Row,
  Col,
  Table,
  Tabs,
  Tab,
  Form,
  Button,
  FormControl,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Aux from "../../hoc/_Aux";
import Card from "../../App/components/MainCard";
import DEMO from "../../store/constant";
import OneSelect from "../Forms/creatable";

import avatar2 from "../../assets/images/user/avatar-2.jpg";

import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  registerBranch,
  get_branches,
  deleteBranch,
} from "../actions/branchActions";
import { getUser } from "../actions/userActions";
import { enquiryProc, getEnquiry } from "../actions/enquiryActions";
import { get_coach_view2_axios } from "../actions/coach2actions";

class Enquiry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parentname: "",
      parentcontact: "",
      address: "",
      studentname: "",
      sport: "",
      expectedfees: 0,
      age: 0,
      ref_coachid: "",
      errors: {},
      succeserret: {},
      search: "",
      toggle: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
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
    this.props.get_coach_view2_axios();
    this.props.getEnquiry();
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    let errors = {};
    let find = false;

    if (!this.state.parentname) {
      errors.parentname = "Branch name is required";
      find = true;
    }
    if (!this.state.parentcontact) {
      errors.parentcontact = "Branch address is required";
      find = true;
    }
    if (!this.state.studentname) {
      errors.studentname = "Please provide student name";
      find = true;
    }
    if (!this.state.age) {
      errors.age = "Please provide the student age";
      find = true;
    }
    if (!this.state.sport) {
      errors.sport = "Please provide sport";
      find = true;
    }
    if (!this.state.ref_coachid) {
      errors.ref_coachid = "Please provide a coach";
      find = true;
    }
    if (!this.state.address) {
      errors.address = "Please provide address";
      find = true;
    }
    if (!this.state.expectedfees) {
      errors.expectedfees = "Please provide expectedfees";
      find = true;
    }

    console.log("ffdkflkdflkdlfsdfs" + find);

    if (find) {
      this.setState({ errors: errors });
      find = false;
    } else {
      this.props.enquiryProc(this.state);

      toast.success(" Save with succes!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      this.props.getEnquiry();
    }
  };

  render() {
    const { coachlist } = this.props.coach2;
    const { enquirylist } = this.props.enquiries;

    const filteredList = enquirylist.filter((element) =>
      element.studentname
        .toLowerCase()
        .includes(this.state.search.toLowerCase())
    );

    const { errors } = this.state;

    return (
      <Aux>
        <ToastContainer />
        <Row>
          <Col>
            <Card title='Enquiry form' isOption>
              <Col md={12}>
                <Form noValidate onSubmit={this.onSubmit}>
                  <Row>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Student Name*</Form.Label>
                        <Form.Control
                          onChange={this.onChange}
                          id='studentname'
                          type='text'
                          placeholder='Student Name'
                          error={errors.studentname}
                          value={this.state.studentname}
                        />
                        <div style={{ color: "red" }}>
                          {this.state.errors.studentname}
                        </div>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Student Age*</Form.Label>
                        <Form.Control
                          onChange={this.onChange}
                          id='age'
                          type='number'
                          placeholder='Student Age'
                          error={errors.age}
                          value={this.state.age}
                        />
                        <div style={{ color: "red" }}>
                          {this.state.errors.age}
                        </div>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Parent Name*</Form.Label>
                        <Form.Control
                          onChange={this.onChange}
                          id='parentname'
                          type='text'
                          placeholder='Parent Name'
                          error={errors.parentname}
                          value={this.state.parentname}
                        />
                        <div style={{ color: "red" }}>
                          {this.state.errors.parentname}
                        </div>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Parent Contact*</Form.Label>
                        <Form.Control
                          onChange={this.onChange}
                          id='parentcontact'
                          type='text'
                          placeholder='10 digit mobile no'
                          error={errors.parentcontact}
                          value={this.state.parentcontact}
                        />
                        <div style={{ color: "red" }}>
                          {this.state.errors.parentcontact}
                        </div>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Addresss*</Form.Label>
                        <Form.Control
                          onChange={this.onChange}
                          id='address'
                          type='text'
                          placeholder='Addresss '
                          error={errors.address}
                          value={this.state.address}
                        />
                        <div style={{ color: "red" }}>
                          {this.state.errors.address}
                        </div>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Sports*</Form.Label>
                        <Form.Control
                          onChange={this.onChange}
                          id='sport'
                          as='select'
                          className='mb-3'
                          error={errors.sport}
                          value={this.state.sport}
                        >
                          <option>Select a sport</option>
                          <option>BasketBall</option>
                          <option>Hockey</option>
                          <option>Football</option>
                          <option>Cricket</option>
                        </Form.Control>
                        <div style={{ color: "red" }}>
                          {this.state.errors.sport}
                        </div>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Expected fees</Form.Label>
                        <Form.Control
                          onChange={this.onChange}
                          id='expectedfees'
                          type='number'
                          placeholder='Expected fees'
                          error={errors.expectedfees}
                          value={this.state.expectedfees}
                        />
                        <div style={{ color: "red" }}>
                          {this.state.errors.expectedfees}
                        </div>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Referance Coach</Form.Label>
                        <Form.Control
                          onChange={this.onChange}
                          id='ref_coachid'
                          as='select'
                          className='mb-3'
                          error={errors.ref_coachid}
                          value={this.state.ref_coachid}
                        >
                          <option value=''>Select a coach</option>
                          {coachlist.map(({ _id, name, contact }) => (
                            <option key={_id} value={_id}>
                              {name}
                            </option>
                          ))}
                        </Form.Control>
                        <div style={{ color: "red" }}>
                          {this.state.errors.ref_coachid}
                        </div>
                      </Form.Group>
                    </Col>

                    <Col md={12}>
                      <Button variant='primary' type='submit'>
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Group>
              <Form.Label>Search*</Form.Label>
              <Form.Control
                onChange={this.onChange}
                value={this.state.search}
                id='search'
                type='search'
                placeholder='Search'
              />
            </Form.Group>
          </Col>
          <Col>
            <Card title='Registered Enquiries' isOption>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th></th>
                    <th>STUDENT</th>
                    <th>PARENT</th>
                    <th>ADDRESS</th>
                    <th>CONTACT</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.map((item) =>
                    item ? (
                      <tr key={item._id}>
                        <td>
                          <img
                            className='rounded-circle'
                            style={{ width: "40px" }}
                            src={avatar2}
                            alt='activity-user'
                          />
                        </td>
                        <td>
                          <h6 className='mb-1'>{item.studentname}</h6>
                        </td>
                        <td>
                          <h6 className='mb-1'>{item.parentname}</h6>
                        </td>
                        <td>
                          <i className='fa fa-circle text-c-green f-10 m-r-15' />
                          {item.address}
                        </td>
                        <td>
                          <i className='fa fa-circle text-c-green f-10 m-r-15' />
                          {item.contact}
                        </td>
                        <td>
                          {/* <a class="btn btn-small"><i class="material-icons left">edit</i>edit</a>
                                           <a class="btn btn-small red"><i class="material-icons left">delete</i>delete</a> */}
                          <a
                            href={DEMO.BLANK_LINK}
                            className='label theme-bg text-white f-12'
                          >
                            Edit
                          </a>
                          <a
                            className='label theme-bg2 text-white f-12'
                            href={DEMO.BLANK_LINK}
                          >
                            Delete
                          </a>
                        </td>
                      </tr>
                    ) : null
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

Enquiry.propTypes = {
  enquiryProc: PropTypes.func.isRequired,
  registerBranch: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  coach2: PropTypes.object.isRequired,
  branch: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  enquiries: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  coach2: state.coach2,
  branch: state.branch,
  users: state.users,
  enquiries: state.enquiries,
});

export default connect(mapStateToProps, {
  registerBranch,
  get_branches,
  get_coach_view2_axios,
  deleteBranch,
  getUser,
  enquiryProc,
  getEnquiry,
})(withRouter(Enquiry));
