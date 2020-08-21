import React, { Component } from 'react';
import {
    Row, Col, Table, Tabs, Tab, Form,
    Button,
    FormControl
} from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import Card from "../../App/components/MainCard";
import DEMO from "../../store/constant";

import Axios from 'axios';
import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';

import { ToastContainer, toast } from "react-toastify"; 

import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerBranch, get_branches, deleteBranch, get_batches, registerBatch, admissionProc } from "../actions/branchActions";
import { get_coach_view2_axios } from "../actions/coach2actions";
import classnames from "classnames";
import "react-toastify/dist/ReactToastify.css";
class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {

            batchid: "",
            feedback: "",
            rating: "",
            errors: {},
            succeserret: {},
            toggel: "",
            errstr: null
        };
    }
    componentDidMount() {
        /* this._isMounted = true; */
        console.log("On coach page this is state " + this.props.auth.isAuthenticated);

        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push("../auth/signin-1");
        }
        // fire functon to get branch & caoch list 
        this.props.get_batches();
        this.props.get_coach_view2_axios();
    }
    componentWillReceiveProps(nextProps) {
        /* console.log("props are below =========>")
        console.log(nextProps);
        console.log("props are above =========>") */
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            }, () => {
                console.log(this.state.errors, 'dealersOverallTotal1')
            });

        } else {
            this.setState({
                errors: {}
            }, () => {
                console.log(this.state.errors, 'dealersOverallTotal1')
            });
        }
        if (nextProps.succeserret) {
            this.setState({
                succeserret: nextProps.succeserret
            }, () => {
                console.log(this.state.succeserret, 'dealersOverallTotal1')
            });

        }
    }
    onChange = e => {
        console.log("targeting state " + e.target.id + " with value " + e.target.value);

        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = async e => {
        e.preventDefault();
        console.log("User state", this.props.auth);
        const formData = new FormData();
        formData.append('batchid', this.state.batchid)
        formData.append('parentid', this.props.auth.user.id)
        formData.append('rating', this.state.rating)
        formData.append('feedback', this.state.feedback)
        if (this.state.rating == "" || this.state.batchid == "" || this.state.rating == "" ) {
            toast.error("Please fill complete form!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              console.log("Here we are");
              
        } else {
            
                try {
                    const res = await Axios.post('https://mighty-ridge-28744.herokuapp.com/api/users/submitfeeback', formData, {
                    });
                    toast.success("Your feedback is registred successfully !", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                   
                    /* this.setState({ type: res.data.filepath }); */

                } catch (error) {
                    if (error.response.status === 500) {
                        toast.error(" A server error occured ! Please try again !", {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                          });
                    } else {
                        toast.error(error.response.data.msg, {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                          });
                    }
                }
            
        }
    }
    render() {
        const { batchlist } = this.props.branch;
        const { errors } = this.state;
        const { succeserret } = this.state;
        return (
            <Aux>
                <Row><ToastContainer />
                    <Col>
                        <Card title='Feedback form' isOption>
                            <Col md={12}>
                                <Form noValidate onSubmit={this.onSubmit}>
                                    <Row>
                                        <Col md={4}>
                                            <Form.Group >
                                                <Form.Label>Batch*</Form.Label>
                                                <Form.Control
                                                    onChange={this.onChange}
                                                    value={this.state.studentbatch}
                                                    error={errors.studentbatch}
                                                    id="batchid"
                                                    as="select" className="mb-3">
                                                    <option value="" >Select A Batch</option>
                                                    {console.log(batchlist)
                                                    }
                                                    {batchlist.map(
                                                        ({ _id, batchname, ref_branchid }) => <option value={_id}  >{ref_branchid.branchname} - {batchname}</option>)
                                                    }
                                                </Form.Control>
                                            </Form.Group>
                                            <div style={{ color: "red" }}>{this.state.errors.studentbatch}</div>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group >
                                                <Form.Label>Ratings</Form.Label>
                                                <Form.Control
                                                    onChange={this.onChange}
                                                    value={this.state.studentbatch}
                                                    error={errors.studentbatch}
                                                    id="rating"
                                                    as="select" className="mb-3">
                                                    <option value="" >Select Rating</option>
                                                    <option value="1" >1 Star</option>
                                                    <option value="2" >2 Star</option>
                                                    <option value="3" >3 Star</option>
                                                    <option value="5" >4 Star</option>
                                                    <option value="4" >5 Star</option>

                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group >
                                                <Form.Label>Feedback</Form.Label>
                                                <Form.Control
                                                    onChange={this.onChange}
                                                    value={this.state.feedback}
                                                    error={errors.feedback}
                                                    id="feedback"
                                                    as="textarea" className="mb-3"
                                                    style={{ height: 250 }}>
                                                </Form.Control>
                                            </Form.Group>
                                            <span style={{ color: "red" }}>{this.state.errors.subscriptionduration}</span>
                                        </Col>


                                        <Col md={12}>
                                            <Button variant="primary" type="submit">
                                                Submit
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

Feedback.propTypes = {
    admissionProc: PropTypes.func.isRequired,
    registerBranch: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    coach2: PropTypes.object.isRequired,
    branch: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    coach2: state.coach2,
    branch: state.branch,
});
export default connect(
    mapStateToProps,
    { registerBranch, get_branches, get_coach_view2_axios, get_batches, registerBatch, admissionProc }
)(withRouter(Feedback));