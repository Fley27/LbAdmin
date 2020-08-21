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
import classnames from "classnames";

class Batch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      batchname: "",
      ref_branchid: "",
      coachid: "",
      batchactivestatus: false,
      sport: "",
      standardfee: "",
      batchdescription: "",
      errors: {},
      succeserret: {},
    };
  }
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("../auth/signin-1");
    }
    if (!this.props.auth.selectedbranch) {
      this.props.history.push("../auth/branchselector");
    }
    // fire functon to get branch & caoch list
    this.props.get_batches();
    this.props.get_coach_view2_axios();
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
  onSubmit = (e) => {
    e.preventDefault();

    console.log("value of state ");
    const newUser = {
      batchname: this.state.batchname,
      ref_branchid: this.props.auth.selectedbranch,
      coachid: this.state.coachid,
      batchactivestatus: this.state.batchactivestatus,
      standardfee: this.state.standardfee,
      sport: this.state.sport,
      batchdescription: this.state.batchdescription,
    };
    /*    console.log("value of ref_branchid is "+newUser.ref_branchid);
           console.log(newUser); */
    console.log(newUser);
    this.props.get_batches();
    this.props.registerBatch(newUser, this.props.history);
    this.props.get_batches();
  };
  handleClick = (value) => () => {
    console.log(value._id);

    const deleteId = {
      delId: value._id,
    };
    if (window.confirm("Are you sure to delete this batch ?")) {
      this.props.deleteBatch(deleteId, this.props.history);
      this.props.get_batches();
    }
    this.props.get_batches();
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
    return (
      <Aux>
        <Row>
          <Col>
            <Card title='Batch creation form' isOption>
              <Col md={12}>
                <form noValidate onSubmit={this.onSubmit}>
                  <Row>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Batch Name</Form.Label>
                        <Form.Control
                          type='text'
                          id='batchname'
                          onChange={this.onChange}
                          value={this.state.batchname}
                          placeholder='Batch name'
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Standard fees</Form.Label>
                        <Form.Control
                          type='test'
                          id='standardfee'
                          onChange={this.onChange}
                          value={this.state.standardfee}
                          placeholder='Monthly feees'
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
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
                    </Col>
                    <Col md={12}>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Sport*</Form.Label>
                          <select
                            onChange={this.onChange}
                            value={this.state.sport}
                            error={errors.sport}
                            id='sport'
                            className='form-control mb-3'
                          >
                            <option value=''>Select a sport</option>
                            <option value='Foot-Ball'>Foot-Ball</option>
                            <option value='Basket-Ball'>Basket-Ball</option>
                            <option value='Hockey'>Hockey</option>
                            <option value='Tennis'>Tennis</option>
                            <option value='Cricket'>Cricket</option>
                          </select>
                        </Form.Group>
                      </Col>
                      <Col md={8}>
                        <Form.Group>
                          <Form.Label>Description Batch*</Form.Label>
                          <Form.Control
                            type='text'
                            id='batchdescription'
                            as='textarea'
                            onChange={this.onChange}
                            value={this.state.batchdescription}
                            placeholder='Batch Description'
                          />
                        </Form.Group>
                      </Col>
                    </Col>

                    <Col md={12}>
                      <Button variant='primary' type='submit'>
                        Submit
                      </Button>
                    </Col>
                    <Col md={12}>
                      <span style={{ color: "#cc0000" }}>
                        {" "}
                        {this.state.errors.batchdescription ||
                          this.state.errors.sport ||
                          this.state.errors.batchname ||
                          this.state.errors.ref_branchid ||
                          this.state.errors.coachid ||
                          this.state.errors.standardfee}
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
            <Card title='Batches'>
              <Table responsive hover>
                <thead>
                  <th>Batch Name</th>
                  <th>Created</th>
                  <th>Action</th>
                </thead>
                <tbody>
                  {batchlist.map(({ _id, batchname, batchcreatedon }) => (
                    <tr className='unread'>
                      <td>
                        <h6 className='mb-1'>{batchname} </h6>
                      </td>
                      <td>
                        <h6 className='text-muted'>
                          <i className='fa fa-circle text-c-green f-10 m-r-15' />
                          {batchcreatedon}
                        </h6>
                      </td>
                      <td>
                        {/* <a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12">Edit</a> */}
                        <a
                          onClick={() => this.handleClick({ _id })}
                          className='label theme-bg text-white f-12'
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
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
})(withRouter(Batch));
