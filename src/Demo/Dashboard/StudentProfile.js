import React from "react";
import axios from "axios";
import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Tabs,
  Tab,
  Form,
} from "react-bootstrap";

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";
import Avatar1 from "../../assets/images/user/avatar-2.jpg";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  toggleparentbatch,
} from "../actions/parentActions";

class PStudents extends React.Component {
  constructor() {
    super();
    this.state = {
      newtoggle: true,
      detail: null,
      isHide: true,
      errors: null,
      age: 0,
      heigth: 0,
      weigth: 0,
      dbo: null,
    };
  }
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
    if (!this.props.parent.selectedchild) {
      this.props.history.push("/dashboard/wards");
    }
    // fire functon to get branch & caoch list
    const student = {
      student_Id: this.props.parent.selectedchild,
    };
    this.props.getstudprofile(student);
    this.props.get_batches();

    axios
      .get(
        `http://localhost:5000/api/users/userdetails/${this.props.parent.selectedchild}`
      )
      .then((response) => {
        if (response.data.success) {
          this.setState({ detail: response.data.detail });
        } else {
          alert("Couldnt get blog`s lists");
        }
      });
  }
  componentWillReceiveProps(nextProps) {
    console.log("nextprop");
    console.log(nextProps);

    if (nextProps.parent.selectedbatch && this.state.newtoggle == false) {
      this.props.history.push("/dashboard/pbatchdetails");
    }
  }
  handleClick = (value) => () => {
    console.log(value._id);

    const selectedId = {
      selectedId: value._id,
    };
    /* this.props.togglewards(selectedId, this.props.history); */
  };

  handleHideClick = () => {
    this.setState({
      isHide: !this.state.isHide,
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    let errors = {};
    let find = false;

    if (!this.state.dbo) {
      errors.dbo = "Branch name is required";
      find = true;
    }

    // Email checks
    if (!this.state.heigth) {
      errors.heigth = "Branch heigth is required";
      find = true;
    }

    if (!this.state.weigth) {
      errors.weigth = "Branch weigth is required";
      find = true;
    }

    if (find) {
      this.setState({ errors: errors });
      return 0;
    }

    const formData = new FormData();
    formData.append("file", this.state.file);

    let obj = {};
    obj.dbo = this.state.dbo;
    obj.heigth = this.state.heigth;
    obj.weigth = this.state.weigth;
    axios
      .post(
        `http://localhost:5000/api/users/userdetails/${this.props.parent.selectedchild}`,
        obj
      )
      .then((response) => {
        if (response.data.success) {
          this.setState({ detail: response.data.detail });
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
      isHide: !this.state.isHide,
    });
  };

  render() {
    var dateformat = require("dateformat");
    const { childrenlist } = this.props.parent;
    const { batchlist } = this.props.branch;
    var batches = [];
    const sayHello = (x) => {
      alert("Hello Propping ! " + x);
      this.setState({ selectedbatch: x });

      const selectedId = {
        selectedId: x,
      };
      this.props.toggleparentbatch(selectedId, this.props.history);
      this.setState({ newtoggle: false });
    };
    const errors = this.state;
    return (
      <Aux>
        <ToastContainer />
        <Row>
          <Col md={6} xl={8}>
            <Card className='Recent-Users'>
              <Card.Body className='px-0 py-2'>
                <Col md={6} xl={8}>
                  {childrenlist.map(({ _id, studententity, contact, name }) => {
                    const pname = name;
                    return studententity.map(({ _id, name, userbatches }) => {
                      if (_id == this.props.parent.selectedchild) {
                        return (
                          <div>
                            <span style={{ display: "none" }}>
                              {" "}
                              {
                                (console.log("user batches", userbatches),
                                (batches = userbatches))
                              }
                            </span>

                            <div alignRight className='profile-notification'>
                              <Row className='pro-head'>
                                <Col>
                                  <img
                                    src={Avatar1}
                                    className='img-radius'
                                    alt='User Profile'
                                  />
                                  <span style={{ color: "black" }}>{name}</span>
                                </Col>
                                <Col
                                  style={{ marginTop: 20 }}
                                  className='col-md-2'
                                >
                                  <Button
                                    onClick={this.handleHideClick}
                                    variant={
                                      this.state.isHide ? "dark" : "danger"
                                    }
                                  >
                                    {this.state.isHide ? "Edit" : "Cancel"}
                                  </Button>
                                </Col>
                              </Row>

                              {this.state.isHide ? (
                                <ul className='pro-body'>
                                  <p>
                                    Date of Birth:{" "}
                                    {this.state.detail
                                      ? dateformat(
                                          this.state.detail.dbo,
                                          "dd / mm / yyyy"
                                        )
                                      : "______"}
                                  </p>
                                  <p>
                                    Heigth :{" "}
                                    {this.state.detail
                                      ? this.state.detail.heigth
                                      : "______"}
                                  </p>
                                  <p>
                                    Weigth :{" "}
                                    {this.state.detail
                                      ? this.state.detail.weigth
                                      : "______"}
                                  </p>
                                </ul>
                              ) : (
                                <Form noValidate onSubmit={this.onSubmit}>
                                  <Row>
                                    <Col>
                                      <Form.Group>
                                        <Form.Label>Date of birth*</Form.Label>
                                        <Form.Control
                                          onChange={this.onChange}
                                          value={this.state.dbo}
                                          error={errors.dbo}
                                          id='dbo'
                                          type='date'
                                        />
                                        <div style={{ color: "red" }}>
                                          {this.state.errors
                                            ? this.state.errors.dbo
                                            : ""}
                                        </div>
                                      </Form.Group>
                                    </Col>
                                    <Col>
                                      <Form.Group>
                                        <Form.Label>Height*</Form.Label>
                                        <Form.Control
                                          onChange={this.onChange}
                                          value={this.state.heigth}
                                          error={errors.heigth}
                                          id='heigth'
                                          type='number'
                                        />
                                        <div style={{ color: "red" }}>
                                          {this.state.errors
                                            ? this.state.errors.heigth
                                            : ""}
                                        </div>
                                      </Form.Group>
                                    </Col>
                                    <Col>
                                      <Form.Group>
                                        <Form.Label>Weigth*</Form.Label>
                                        <Form.Control
                                          onChange={this.onChange}
                                          value={this.state.weigth}
                                          error={errors.weigth}
                                          id='weigth'
                                          type='number'
                                        />
                                        <div style={{ color: "red" }}>
                                          {this.state.errors
                                            ? this.state.errors.weigth
                                            : ""}
                                        </div>
                                      </Form.Group>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col md={12}>
                                      <Button variant='primary' type='submit'>
                                        Change Profile
                                      </Button>
                                    </Col>
                                  </Row>
                                </Form>
                              )}

                              <hr></hr>
                            </div>
                            <div>
                              <p>Parent name : {pname}</p>
                              <p> Parent contact : {contact}</p>
                            </div>
                          </div>
                        );
                      }
                    });
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
                                <h6 className='text-muted card-text'>
                                  {batchlist[i].batchname}
                                </h6>
                              </td>
                              <td>
                                <h6 className='text-muted card-text'>
                                  <i className='fa fa-circle text-c-green f-10 m-r-15' />
                                  Subscribed
                                </h6>
                              </td>
                              <td>
                                <a
                                  className='text-primary mb-1 card-text '
                                  onClick={() => sayHello(batchlist[i]._id)}
                                >
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
PStudents.propTypes = {
  admissionProc: PropTypes.func.isRequired,
  toggleparentbatch: PropTypes.func.isRequired,
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
  toggleparentbatch,
})(withRouter(PStudents));
