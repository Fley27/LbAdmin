import React, { Component } from "react";
import axios from "axios";
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
import Aux from "../../hoc/_Aux";
import Card from "../../App/components/MainCard";
import DEMO from "../../store/constant";

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
  get_batches,
  registerBatch,
  admissionProc,
} from "../actions/branchActions";
import { getUser } from "../actions/userActions";
import { get_coach_view2_axios } from "../actions/coach2actions";
import classnames from "classnames";

class Admission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parentname: "",
      parentcontact: "",
      parentaddress: "",
      studentname: "",
      studentbatch: "",
      subscriptionduration: "",
      totalfees: "",
      discount: "",
      addate: "",
      curruntfees: "",
      errors: {},
      succeserret: {},
      search: "",
      toggel: "",
    };
    this.getfees = this.getfees.bind(this);
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
    if (!this.props.auth.selectedbranch) {
      this.props.history.push("../auth/branchselector");
    }
    // fire functon to get branch & caoch list
    this.props.get_batches();
    this.props.getUser();
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
    }
  }
  onChange = (e) => {
    console.log(
      "targeting state " + e.target.id + " with value " + e.target.value
    );

    this.setState({ [e.target.id]: e.target.value });
  };
  getfees = (e) => {
    /*  console.log("selected key is "+e.target.value);
         console.log("this.props.branch");
         console.log(this.props.branch.batchlist); */
    delete this.state.errors["studentbatch"];
    this.setState({ studentbatch: e.target.value });
    this.setState({ discount: "" });
    this.setState({ totalfees: "" });
    this.setState({ subscriptionduration: "" });
    for (var i in this.props.branch.batchlist) {
      if (this.props.branch.batchlist[i]._id == e.target.value) {
        console.log(
          "hello there " + this.props.branch.batchlist[i].standardfee
        );
        this.setState({
          curruntfees: this.props.branch.batchlist[i].standardfee,
        });
      }
    }
    /*  this.setState({ curruntfees: fees }); */
    /*  this.setState({ [e.target.id]: e.target.value }); */
  };
  setfees = (e) => {
    delete this.state.errors["subscriptionduration"];
    if (this.state.studentbatch == "") {
      this.state.errors["studentbatch"] = "Please select a batch !";
      this.setState({ toggel: e.target.value }, () => {
        console.log(this.state.toggel, "state changed --forced");
      });
    } else {
      /* console.log("Target value " + e.target.value) */
      this.setState({ subscriptionduration: e.target.value }, () => {
        console.log(this.state.subscriptionduration, "state changed --forced");
      });
      this.setState(
        { totalfees: e.target.value * this.state.curruntfees },
        () => {
          console.log(this.state, "state changed --forced");
        }
      );
    }
  };
  applydiscount = (e) => {
    delete this.state.errors["discount"];
    if (
      this.state.subscriptionduration == "" ||
      this.state.studentbatch == "" ||
      e.target.value > 100
    ) {
      if (this.state.studentbatch == "") {
        this.state.errors["studentbatch"] = "Please select a batch !";
        this.setState({ toggel: e.target.value }, () => {
          console.log(this.state.toggel, "state changed --forced");
        });
      }
      if (this.state.subscriptionduration == "") {
        this.state.errors["subscriptionduration"] =
          "Please select a subscription plan !";
        this.setState({ toggel: e.target.value }, () => {
          console.log(this.state.toggel, "state changed --forced");
        });
      }
      if (e.target.value > 100) {
        this.state.errors["discount"] =
          "You tried to enter discount greater than 100% !";
        this.setState({ toggel: e.target.value }, () => {
          console.log(this.state.toggel, "state changed --forced");
        });
      }
    } else {
      console.log("target ", e.target.value);
      this.setState({ discount: e.target.value }, () => {
        console.log(this.state.discount, "discount state changed --forced");
      });
      console.log("Logging states before logic ", this.state);

      this.setState(
        {
          totalfees:
            this.state.subscriptionduration * this.state.curruntfees -
            this.state.subscriptionduration *
              this.state.curruntfees *
              (e.target.value / 100),
        },
        () => {
          console.log(
            "Monthly must be ",
            this.state.subscriptionduration * this.state.curruntfees,
            " discount is ",
            this.state.discount / 100,
            "so tatal must be",
            this.state.subscriptionduration *
              this.state.curruntfees *
              (this.state.discount / 100),
            "state changed --forced"
          );
        }
      );
    }
  };

  setNotifications = () => {
    const { batchlist } = this.props.branch;
    let coach = "";
    batchlist.forEach((item) => {
      if (item._id === this.state.studentbatch) {
        coach = item.coachid;
        return 0;
      }
    });
    let obj = {},
      notifications = [];
    obj.notification_title = "Welcome";
    obj.notification_msg = `${this.state.studentname} is welcome to our grand family.
    We thank you for your decision.`;
    obj.fromid = this.props.auth.user.id;
    obj.toid = this.state.parentcontact;
    obj.severity = "blue";
    notifications.push(obj);

    obj = {};
    obj.notification_title = "New member";
    obj.notification_msg = `New student gonna join your bacth from admission date ${this.state.addate} his/her name is ${this.state.studentname}`;
    obj.fromid = this.props.auth.user.id;
    obj.toid = coach;
    obj.severity = "blue";
    notifications.push(obj);

    obj = {};
    obj.notifications = notifications;
    console.log(notifications);

    axios
      .post("http://localhost:5000/api/notification", obj)
      .then((response) => {
        if (response.success) {
          console.log("ok");
        }
      });
  };

  onSubmit = (e) => {
    e.preventDefault();

    console.log("firing on submit");
    const newUser = {
      parentname: this.state.parentname,
      parentcontact: this.state.parentcontact,
      parentaddress: this.state.parentaddress,
      studentname: this.state.studentname,
      studentbatch: this.state.studentbatch,
      subscriptionduration: this.state.subscriptionduration,
      totalfees: this.state.totalfees,
      discount: this.state.discount,
      addate: this.state.addate,
    };
    /*    console.log("value of ref_branchid is "+newUser.ref_branchid);
           console.log(newUser); */

    axios
      .post("http://localhost:5000/api/branch/admissionproc", newUser)
      .then((response) => {
        this.setNotifications();
      })
      .catch((err) => console.log(err));

    this.props.get_batches();
  };
  render() {
    const { batchlist } = this.props.branch;
    const { studentlist } = this.props.users;
    let students = [],
      parents = [];

    studentlist.forEach((element) => {
      if (element.usertype === "student") {
        students.push(element);
      } else if (element.usertype === "parent") {
        parents.push(element);
      }
    });

    let responses = [];

    students.forEach((student) => {
      parents.forEach((parent) => {
        parent.studententity.forEach((child) => {
          if (child == student._id) {
            let obj = {};
            obj.student = student.name;
            obj.datejoin = student.datejoin;
            obj.parent = parent.name;
            obj.contact = parent.contact;
            responses.push(obj);
          }
        });
      });
    });

    const filteredList = responses.filter((element) =>
      element.student.toLowerCase().includes(this.state.search.toLowerCase())
    );
    const { errors } = this.state;
    const { succeserret } = this.state;
    return (
      <Aux>
        <Row>
          <Col>
            <Card title='Admission form' isOption>
              <Col md={12}>
                <Form noValidate onSubmit={this.onSubmit}>
                  <Row>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Parent Name*</Form.Label>
                        <Form.Control
                          onChange={this.onChange}
                          value={this.state.parentname}
                          error={errors.parentname}
                          id='parentname'
                          type='text'
                          placeholder='Parent Name'
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
                          value={this.state.parentcontact}
                          error={errors.parentcontact}
                          id='parentcontact'
                          type='text'
                          placeholder='10 digit mobile no'
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
                          value={this.state.parentaddress}
                          error={errors.parentaddress}
                          id='parentaddress'
                          type='text'
                          placeholder='Addresss '
                        />
                        <div style={{ color: "red" }}>
                          {this.state.errors.parentaddress}
                        </div>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Student Name*</Form.Label>
                        <Form.Control
                          onChange={this.onChange}
                          value={this.state.studentname}
                          error={errors.studentname}
                          id='studentname'
                          type='text'
                          placeholder='Student Name'
                        />
                        <div style={{ color: "red" }}>
                          {this.state.errors.studentname}
                        </div>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Batch*</Form.Label>
                        <Form.Control
                          onChange={this.getfees}
                          value={this.state.studentbatch}
                          error={errors.studentbatch}
                          id='studentbatch'
                          as='select'
                          className='mb-3'
                        >
                          <option value=''>Select a coach</option>
                          {console.log(batchlist)}
                          {batchlist.map(({ _id, batchname, ref_branchid }) => (
                            <option value={_id}>
                              {ref_branchid.branchname} - {batchname}
                            </option>
                          ))}
                        </Form.Control>
                        {/*   <div style={{ color: "red" }}>{this.state.errors.studentname}</div> */}
                      </Form.Group>
                      <div style={{ color: "red" }}>
                        {this.state.errors.studentbatch}
                      </div>
                    </Col>
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
                        <Form.Label>Discount (if any)</Form.Label>
                        <Form.Control
                          onChange={this.applydiscount}
                          value={this.state.discount}
                          error={errors.discount}
                          id='discount'
                          type='test'
                          placeholder='%'
                        />
                      </Form.Group>
                      <span style={{ color: "red" }}>
                        {this.state.errors.discount}
                      </span>
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
              <Form.Label>Search</Form.Label>
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
            <Card title='Registered Students' isOption>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th></th>
                    <th>STUDENT</th>
                    <th>PARENT</th>
                    <th>INSCRIPTION DATE</th>
                    <th>CONTACT</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.map((item) =>
                    item ? (
                      <tr>
                        <td>
                          <img
                            className='rounded-circle'
                            style={{ width: "40px" }}
                            src={avatar2}
                            alt='activity-user'
                          />
                        </td>
                        <td>
                          <h6 className='mb-1'>{item.student}</h6>
                        </td>
                        <td>
                          <h6 className='mb-1'>{item.parent}</h6>
                        </td>
                        <td>
                          <i className='fa fa-circle text-c-green f-10 m-r-15' />
                          {new Date(item.datejoin).toLocaleDateString()}
                        </td>
                        <td>
                          <i className='fa fa-circle text-c-green f-10 m-r-15' />
                          {item.contact}
                        </td>
                        {/* <td>
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
                        </td> */}
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

Admission.propTypes = {
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
  get_batches,
  registerBatch,
  admissionProc,
  getUser,
})(withRouter(Admission));
