import React, { Component } from 'react';
import {
    Row, Col, Table, Tabs, Tab, Form,
    Button,
    FormControl
} from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import Card from "../../App/components/MainCard";
import DEMO from "../../store/constant";

import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';


import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerBranch, get_branches, deleteBranch, get_batches, registerBatch, admissionProc } from "../actions/branchActions";
import { get_coach_view2_axios } from "../actions/coach2actions";
import { setleave, get_leaves } from "../actions/coach2actions";
import classnames from "classnames";

import { ToastContainer, toast } from "react-toastify";
class CLeave extends Component {
    constructor(props) {
        super(props);
        this.state = {

            fromdate: "",
            todate: "",
            reason: "",
            errors: {},
            succeserret: {},
            toggel: ""
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
        //Get leaves 
        const leaveposter = {
            coachid: this.props.auth.user.id
        };
        this.props.get_leaves(leaveposter);
    }
    componentWillReceiveProps(nextProps) {
        console.log("props are below =========>")
        console.log(nextProps);
        console.log("props are above =========>")
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
    onSubmit = e => {
        e.preventDefault();
        if(this.state.reason == "" || this.state.fromdate =="" || this.state.todate ==""){
            console.log("failed submission ",this.state.reason,
            this.state.fromdate,
            this.state.todate);
            
            toast.error("Please fill complete form  !", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        }else if(this.state.fromdate  > this.state.todate ){
            toast.error('"From date" cannot be greaterthan "To date"  !', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        }else{
            console.log("firing on submit")
        const newUser = {
            coachid: this.props.auth.user.id,
            reason: this.state.reason,
            fromdate: this.state.fromdate,
            todate: this.state.todate
        };

        this.props.setleave(newUser, this.props.history);
        
        toast.success("Leave added successfully !", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        const leaveposter = {
            coachid: this.props.auth.user.id
        };
        setInterval(this.props.get_leaves(leaveposter), 1000);
        this.props.get_leaves(leaveposter);
        }
        

    };
    render() {
        const { leavelist } = this.props.coach2;
        const { errors } = this.state;
        const { succeserret } = this.state;
        return (
            <Aux>
                <Row>
                <ToastContainer />
                    <Col>
                        <Card title='Leave application form' isOption>
                            <Col md={12}>
                                <Form noValidate onSubmit={this.onSubmit}>
                                    <Row>
                                        <Col md={4}>
                                            <Form.Group >
                                                <Form.Label>From date</Form.Label>
                                                <Form.Control
                                                    onChange={this.onChange}
                                                    value={this.state.fromdate}
                                                    error={errors.fromdate}
                                                    id="fromdate"
                                                    type="date"
                                                    className="mb-3">
                                                </Form.Control>
                                            </Form.Group>
                                            <div style={{ color: "red" }}>{this.state.errors.fromdate}</div>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group >
                                                <Form.Label>From date</Form.Label>
                                                <Form.Control
                                                    onChange={this.onChange}
                                                    value={this.state.todate}
                                                    error={errors.todate}
                                                    id="todate"
                                                    type="date"
                                                    className="mb-3">
                                                </Form.Control>
                                            </Form.Group>
                                            <div style={{ color: "red" }}>{this.state.errors.todate}</div>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group >
                                                <Form.Label>Reason (Minimum 100 Letters)</Form.Label>
                                                <Form.Control
                                                    onChange={this.onChange}
                                                    value={this.state.reason}
                                                    error={errors.reason}
                                                    id="reason"
                                                    as="textarea" className="mb-3"
                                                    style={{ height: 250 }}>
                                                </Form.Control>
                                            </Form.Group>
                                            <span style={{ color: "red" }}>{this.state.errors.reason}</span>
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
                <Row>
                    <Col>
                        <Card title='Leave History' isOption>
                            <Table responsive hover>
                                <thead>
                                    <th>#</th>
                                    <th>Status </th>
                                    <th>From </th>
                                    <th>To</th>
                                </thead>
                                <tbody>

                                    {

                                        leavelist.map(
                                            ({ status, ref_coachid, reason, fromdate, todate, posted_on }, index) => {
                                                var stat = "";
                                                if (status == "false") {
                                                    stat = <span className="float-right d-flex  align-items-center"><i className="fa fa-circle  f-10 m-r-15 text-c-red" />Pending</span>
                                                } else {
                                                    stat = <span className="float-right d-flex  align-items-center"><i className="fa fa-circle  f-10 m-r-15 text-c-green" />Approved</span>
                                                }
                                                var d = new Date(fromdate);
                                                var date = d.getDate();
                                                var month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12.
                                                var year = d.getFullYear();
                                                var dateStr = date + "/" + month + "/" + year;

                                                var d = new Date(todate);
                                                var date = d.getDate();
                                                var month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12.
                                                var year = d.getFullYear();
                                                var dateStr2 = date + "/" + month + "/" + year;
                                                return (<tr>
                                                    <td>

                                                        {(index + 1)}
                                                    </td>
                                                    <td>
                                                        <h6 className="mb-1">
                                                            {stat}
                                                        </h6>
                                                    </td>
                                                    <td>{dateStr}</td>
                                                    <td>
                                                        {dateStr2}
                                                    </td>

                                                </tr>)
                                            })}


                                </tbody>
                            </Table>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

CLeave.propTypes = {
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
    { registerBranch, get_branches, get_coach_view2_axios, get_batches, registerBatch, admissionProc, setleave, get_leaves }
)(withRouter(CLeave));