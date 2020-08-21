import React from "react";
import { Row, Col, Card, Table, Tabs, Tab } from "react-bootstrap";

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";

import avatar1 from "../../assets/images/user/avatar-1.jpg";
import Avatar1 from "../../assets/images/user/avatar-2.jpg";
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
import { get_coach_view2_axios } from "../actions/coach2actions";
import {
  getchildren,
  togglewards,
  getstudprofile,
} from "../actions/parentActions";
import classnames from "classnames";

class Batchdetails extends React.Component {
  componentDidMount() {
    console.log("on student profile");
    /* this._isMounted = true; */
    console.log(
      "On coach page this is state " + this.props.auth.isAuthenticated
    );
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("../auth/signin-1");
    }
    /* if (!this.props.parent.selectedchild) {
            this.props.history.push("/dashboard/wards");
        } */
    // fire functon to get branch & caoch list
    const student = {
      student_Id: this.props.parent.selectedchild,
    };
    this.props.getstudprofile(student);
    this.props.get_batches();
  }
  componentWillReceiveProps(nextProps) {}
  handleClick = (value) => () => {
    console.log(value._id);

    const selectedId = {
      selectedId: value._id,
    };
    /* this.props.togglewards(selectedId, this.props.history); */
  };
  render() {
    const { childrenlist } = this.props.parent;
    const { batchlist } = this.props.branch;
    var batches = [];
    return (
      <Aux>
        <Row>
          <Col md={6} xl={8}>
            <Card className='Recent-Users'>
              <Card.Body className='px-0 py-2'>
                <Col md={6} xl={8}>
                  {childrenlist.map(({ _id, studententity, contact, name }) => {
                    const pname = name;
                    return studententity.map(({ _id, name, userbatches }) => (
                      <div>
                        <span style={{ display: "none" }}>
                          {" "}
                          {
                            (console.log("user batches", userbatches),
                            (batches = userbatches))
                          }
                        </span>

                        <div alignRight className='profile-notification'>
                          <div className='pro-head'>
                            <img
                              src={Avatar1}
                              className='img-radius'
                              alt='User Profile'
                            />
                            <span style={{ color: "black" }}>{name}</span>
                          </div>
                          <ul className='pro-body'></ul>
                          <hr></hr>
                        </div>
                        <div>
                          <p>Parent name : {pname}</p>
                          <p> Parent contact : {contact}</p>
                        </div>
                      </div>
                    ));
                  })}
                </Col>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={8}>
            <Card className='Recent-Users'>
              <Card.Header>
                <Card.Title as='h5'>Assosiated Batches</Card.Title>
              </Card.Header>
              <Card.Body className='px-0 py-2'>
                <Table responsive hover>
                  <tbody>
                    {batches.map(function (name, index) {
                      for (var i in batchlist) {
                        if (batchlist[i]._id == name) {
                          return (
                            <tr className='unread'>
                              <td>
                                <h6 className='text-muted'>
                                  {batchlist[i].batchname}
                                </h6>
                              </td>
                              <td>
                                <h6 className='text-muted'>
                                  <i className='fa fa-circle text-c-green f-10 m-r-15' />
                                  Subscribed
                                </h6>
                              </td>
                              <td>
                                <a className='text-primary mb-1 card-text'>
                                  details{" "}
                                  <i class=' feather icon-chevrons-right'></i>
                                </a>
                              </td>
                            </tr>
                          );
                        }
                      }
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Aux>
    );
  }
}
Batchdetails.propTypes = {
  admissionProc: PropTypes.func.isRequired,
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
  parent: state.parent,
});
export default connect(mapStateToProps, {
  registerBranch,
  get_branches,
  get_coach_view2_axios,
  get_batches,
  registerBatch,
  admissionProc,
  getstudprofile,
  getchildren,
})(withRouter(Batchdetails));
