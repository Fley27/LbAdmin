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
  Modal,
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
  deleteBatch,
} from "../actions/branchActions";
import { get_coach_view2_axios } from "../actions/coach2actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  settt,
  viewtt,
  viewalltt,
  viewbatchstudents,
  saveatt,
} from "../actions/branchActions";
import classnames from "classnames";

class Batch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      batchname: "",
      ref_branchid: "",
      coachid: "",
      batchactivestatus: false,
      standardfee: "",
      check: false,
      errors: {},
      succeserret: {},
      show: false,
      selectedleaveid: null,
      leavereason: null,
    };
    this.presentarr = [];
    this.leavearr = [];
    this.allarr = [];
    this.confirmtt = this.confirmtt.bind(this);
    this.handleshow = this.handleshow.bind(this);
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
    if (this.props.branch.coachbatch == null) {
      this.props.history.push("/dashboard/schedule");
    }
    // fire functon to get branch & caoch list
    this.props.get_batches();
    this.props.viewalltt();
    this.props.get_coach_view2_axios();

    console.log("CoachBatch: " + this.props.branch.coachbatch);
    console.log("CoachBatch: " + this.props.branch.coachsession);
    const SelectedID = {
      batchId: this.props.branch.coachbatch,
    };
    this.props.viewbatchstudents(SelectedID);

    axios
      .get(
        `http://localhost:5000/api/ttnatt/atendance/${this.props.branch.coachbatch}/${this.props.branch.coachsession}`
      )
      .then((response) => {
        if (response.data.success) {
          this.presentarr = response.data.absent;
          this.leavearr = response.data.informed;
        } else {
          alert("Couldnt get blog`s lists");
        }
      });
    /* if(empty(this.props.coach2.coachlist)){
            alert("No coach found in app , PLease register a coach first");
            this.props.history.push("/coach");
        } */
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

  confirmtt = (e) => {
    e.preventDefault();
    Array.prototype.diff = function (a) {
      return this.filter(function (i) {
        return a.indexOf(i) < 0;
      });
    };

    const diffarr = this.allarr.diff(this.presentarr);
    const dataset = {
      present: diffarr,
      batchid: this.props.branch.coachbatch,
      session: this.props.branch.coachsession,
      coachedby: this.props.auth.user.id,
      absent: this.presentarr,
      leave: this.leavearr,
    };
    axios
      .post(`http://localhost:5000/api/ttnatt//saveatt`, dataset)
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
        } else {
          alert("Couldnt get blog`s lists");
        }
      });
    console.log("diffarr", dataset);
  };

  resetform() {
    this.setState({ errors: {} });
    this.setState({ batchname: "" });
    this.setState({ coachid: "" });
    this.setState({ standardfee: "" });
  }
  handleshow(xid) {
    this.setState({ show: !this.state.show });
    this.setState({ selectedleaveid: xid });
  }
  render() {
    const { errors } = this.state;
    const { succeserret } = this.state;
    const { batchlist } = this.props.branch;
    const { studentList } = this.props.branch;
    const { coachlist } = this.props.coach2;
    const { timetable } = this.props.branch;

    const smartmarking = (x) => {
      if (this.presentarr.includes(x)) {
        var index = this.presentarr.indexOf(x);
        if (index !== -1) this.presentarr.splice(index, 1);
      } else {
        this.presentarr.push(x);
      }
      console.log("this.presentarr", this.presentarr);

      this.setState({ check: !this.state.check });
      console.log(this.state.check);
    };

    const smartleaving = (xid, reason) => {
      if (this.presentarr.includes(xid)) {
        var index = this.presentarr.indexOf(xid);
        if (index !== -1) this.presentarr.splice(index, 1);
      }

      const leaver = {
        student: xid,
        leavereason: reason,
      };

      this.leavearr.push(leaver);
      console.log(this.leavearr);
      this.handleshow();
      this.setState({ leavereason: "" });
    };

    const undoleaving = (x) => {
      if (this.presentarr.includes(x)) {
        var index = this.presentarr.indexOf(x);
        if (index !== -1) this.presentarr.splice(index, 1);
      } else {
        this.presentarr.push(x);
      }
      let i = 0,
        idx = -1;
      this.leavearr.map((item) => {
        if ((item.student = x)) {
          idx = i;
        }
        i++;
      });
      let obj = {};
      if (idx > -1) {
        this.leavearr.splice(idx, 1);
      }
      this.setState({ leavereason: "" });
    };

    return (
      <Aux>
        <ToastContainer />
        <Row>
          <Col>
            <Card title='Attendance' isOption>
              <Col md={12}>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>Student name</th>
                      <th>Attendance Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentList ? (
                      studentList.map(({ name, _id, userbatches }, index) => {
                        //populate  this.presentarr.push(_id)
                        if (!this.allarr.includes(_id)) {
                          this.allarr.push(_id);
                        }
                        var xid = _id;
                        var btn = "";
                        var btn2 = "";
                        var i = 0;

                        if (this.presentarr.includes(_id)) {
                          btn = (
                            <button
                              className='btn card-text btn-sm btn-danger'
                              onClick={() => smartmarking(xid)}
                            >
                              Absent
                            </button>
                          );
                          btn2 = (
                            <button
                              className='btn card-text btn-sm btn-info'
                              onClick={() => {
                                this.handleshow(xid);
                              }}
                            >
                              Informed Leave{" "}
                              <i
                                class='fa fa-question-circle '
                                style={{ color: "black" }}
                                aria-hidden='true'
                              ></i>
                            </button>
                          );
                        } else {
                          btn = (
                            <button
                              className='btn card-text btn-sm btn-primary'
                              onClick={() => smartmarking(xid)}
                            >
                              Present
                            </button>
                          );
                        }
                        this.leavearr.map(({ student, leavereason }, index) => {
                          if (this.leavearr[index].student == _id) {
                            btn = (
                              <button
                                className='btn card-text btn-sm btn-danger'
                                onClick={() => undoleaving(student)}
                              >
                                Delete IL
                              </button>
                            );

                            btn2 = (
                              <button className='btn card-text btn-sm btn-warning'>
                                {" "}
                                Left because of :<br></br>
                                {this.leavearr[index].leavereason}
                              </button>
                            );
                          }
                        });
                        return (
                          <tr>
                            <td>{name}</td>
                            <td>
                              <div>{btn}</div> <div>{btn2}</div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={2}>No student found !</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                <Button variant='success' onClick={this.confirmtt}>
                  Submit Attendance
                </Button>
              </Col>
            </Card>
          </Col>
          {/* Starting modal logic */}
          <Modal
            show={this.state.show}
            onHide={() => {
              this.handleshow();
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title>State reason for leave</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Col>
                <Form.Group>
                  <Form.Label>Leave reason*</Form.Label>
                  <Form.Control
                    onChange={this.onChange}
                    value={this.state.leavereason}
                    id='leavereason'
                    as='textarea'
                  />
                </Form.Group>
              </Col>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant='secondary'
                onClick={() => {
                  this.handleshow();
                }}
              >
                Close
              </Button>
              <Button
                variant='primary'
                onClick={() =>
                  smartleaving(
                    this.state.selectedleaveid,
                    this.state.leavereason
                  )
                }
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Row>
      </Aux>
    );
  }
}
Batch.propTypes = {
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
  get_batches,
  registerBatch,
  deleteBatch,
  viewalltt,
  viewbatchstudents,
  saveatt,
})(withRouter(Batch));
