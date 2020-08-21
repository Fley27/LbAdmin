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

import {
  settt,
  viewtt,
  viewalltt,
  togglecoachbatch,
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
      newtoggle: true,
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
    this.props.get_batches();
    this.props.viewalltt();
    this.props.get_coach_view2_axios();
  }
  componentWillReceiveProps(nextProps) {
    console.log("nextprop");
    console.log(nextProps);

    if (nextProps.branch.coachbatch && this.state.newtoggle == false) {
      this.props.history.push("/dashboard/takeattendance");
    }
  }
  handleClick = (value) => () => {
    const selectedId = {
      delId: value._id,
    };
    this.props.togglecoachbatch(selectedId, this.props.history);
  };

  resetform() {
    this.setState({ errors: {} });
    this.setState({ batchname: "" });
    this.setState({ coachid: "" });
    this.setState({ standardfee: "" });
  }
  render() {
    const { errors } = this.state;
    const { succeserret } = this.state;
    const { batchlist } = this.props.branch;
    const { coachlist } = this.props.coach2;
    const { timetable } = this.props.branch;

    const sayHello = (x, y) => {
      const selectedId = {
        selectedId: x,
        selectedSession: y,
      };
      console.log("selectedId", selectedId);

      this.props.togglecoachbatch(selectedId, this.props.history);
      this.setState({ newtoggle: false });
    };

    return (
      <Aux>
        <Row>
          <Col>
            <Card title="Today's Schedule" isOption>
              <Col md={12}>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>Batch</th>
                      <th>Timing</th>
                      <th>Attendance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coachlist.map(({ name, _id, userbatches }, index) => {
                      var batches = [];
                      var timetablearr = [];
                      var d = new Date();
                      var day = d.getDay();
                      var ret = "";
                      var sessionbatch = [];
                      var sessionbatchid = [];
                      var sessiontimestart = [];
                      var sessiontimeend = [];
                      var colours = [];

                      if (_id == this.props.auth.user.id) {
                        coachlist[index].userbatches.forEach((element) => {
                          return batches.push(element + "  |  ");
                        });
                        if (timetable) {
                          timetable.forEach((element) => {
                            if (element.ref_batchid != null) {
                              var findthisbatch = element.ref_batchid._id;
                              console.log("timetablearr", element);
                              if (
                                coachlist[index].userbatches.includes(
                                  findthisbatch
                                )
                              ) {
                                //return todays schedule with sessions
                                ret = <h4>Hello {findthisbatch}</h4>;
                              }
                              let obj = {};

                              if (element.tt[0]) {
                                sessionbatch.push(
                                  element.ref_batchid.batchname
                                );
                                colours.push(element.isUpdate);
                                sessiontimestart.push(element.tt[0].time1);
                                sessiontimeend.push(element.tt[0].time2);
                                sessionbatchid.push(element.ref_batchid._id);
                              }
                              if (element.tt[1]) {
                                sessionbatch.push(
                                  element.ref_batchid.batchname
                                );
                                sessiontimestart.push(element.tt[1].time1);
                                sessiontimeend.push(element.tt[1].time2);
                                sessionbatchid.push(element.ref_batchid._id);
                              }
                            }
                          });
                        }

                        /* return (<span><h6>{_id}</h6><h6>||{index} || {batches} || {timetablearr} || finally {ret} || { sessiontimestart }
                                                        </h6></span>) */
                        var final = [];
                        for (
                          let index = 0;
                          index < sessionbatch.length;
                          index++
                        ) {
                          final.push(
                            <tr>
                              <td>
                                <h6 className='text-muted card-text'>
                                  {sessionbatch[index]}{" "}
                                </h6>
                              </td>
                              <td>
                                <h6 className='text-muted card-text'>
                                  {sessiontimestart[index]} to{" "}
                                  {sessiontimeend[index]}{" "}
                                </h6>
                              </td>
                              <td>
                                <button
                                  className={`btn card-text btn-sm ${
                                    colours[index]
                                      ? `btn-warning`
                                      : `btn-success`
                                  }`}
                                  onClick={() =>
                                    sayHello(
                                      sessionbatchid[index],
                                      sessiontimestart[index]
                                    )
                                  }
                                >
                                  {colours[index] ? `Update` : `Attendance`}
                                </button>
                              </td>
                            </tr>
                          );
                        }
                        if (sessionbatch.length == 0) {
                          final.push(
                            <tr>
                              <td colSpan={3}>
                                <h6 className=' text-danger text-center card-text'>
                                  {" "}
                                  No classes assigned !{" "}
                                </h6>
                              </td>
                            </tr>
                          );
                        }

                        return final;
                      }
                    })}
                  </tbody>
                </Table>
              </Col>
            </Card>
          </Col>
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
  togglecoachbatch,
})(withRouter(Batch));
