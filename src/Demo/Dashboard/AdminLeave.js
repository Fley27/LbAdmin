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
import { setleave, get_leaves,get_all_leaves } from "../actions/coach2actions";
import classnames from "classnames";
import Axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
class AdminLeave extends Component {
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
        this.props.get_all_leaves(leaveposter);
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

        console.log("firing on submit")
        const newUser = {
            coachid: this.props.auth.user.id,
            reason: this.state.reason,
            fromdate: this.state.fromdate,
            todate: this.state.todate
        };

        this.props.setleave(newUser, this.props.history);
        const leaveposter = {
            coachid: this.props.auth.user.id
        };
        this.props.get_all_leaves(leaveposter);

    };
    handleClick = value => () => {
        console.log(value._id);

        const deleteId = {
            delId: value._id,
        };
        if (window.confirm("Are you sure to delete this batch ?")) {
            this.props.deleteBatch(deleteId, this.props.history);/* 
            this.props.approveleave(deleteId, this.props.history); */
            this.props.get_batches();
        }
        this.props.get_batches();
    };
    handleClick2 = async (x) => {
        const formData = new FormData();
        formData.append('selectedId', x._id)
        console.log(x._id);

        if (x == "") {
            //it will never be empty
        } else {
            console.log("Sending for approval ");

            if (this.state.file != "") {
                try {
                    const res = await Axios.post('https://mighty-ridge-28744.herokuapp.com/api/users/approveleave', formData);
                    //print success here 
                    toast.success("Leave Approved !", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                    this.setState({ toggle: !this.state.toggle })
                    this.props.get_all_leaves();
                } catch (error) {
                    if (error.response.status === 500) {
                        console.log("there was a server error !");
                        this.setState({ errstr: "A server error occured !"});

                    }
                }
            }
        }
    }
    render() {
        const { leavelist } = this.props.coach2;
        const { errors } = this.state;
        const { succeserret } = this.state;
        const { coachlist } = this.props.coach2;
        return (
            <Aux>
                
                <Row>
                <ToastContainer />
                    <Col>
                        <Card title='Leave History' isOption>
                            <Table responsive hover>
                                <thead>
                                    <th>#</th>
                                    <th>Status </th>
                                    <th>Name </th>
                                    <th>Reason </th>
                                    <th>From </th>
                                    <th>To</th>
                                    <th>Action</th>
                                </thead>
                                <tbody>

                                    {

                                        leavelist.map(
                                            ({ _id,status, ref_coachid, reason, fromdate, todate, posted_on }, index) => {
                                                var stat = "";
                                                if (status == "false") {
                                                    stat = <span className="float-right d-flex  align-items-center"><i className="fa fa-circle  f-10 m-r-15 text-c-yellow" />Pending</span>
                                                    var actionbtn = <a onClick={() => this.handleClick2({ _id })} className="label theme-bg text-white f-12">Approve</a>

                                                }else if(status == "rejected"){
                                                    stat = <span className="float-right d-flex  align-items-center"><i className="fa fa-circle  f-10 m-r-15 text-c-red" />Rejected</span>
                                                    var actionbtn = "Rejected"

                                                }
                                                 else {
                                                    stat = <span className="float-right d-flex  align-items-center"><i className="fa fa-circle  f-10 m-r-15 text-c-green" />Approved</span>
                                                    var actionbtn = "Approved"
                                                }
                                                var coachname = "";
                                                var coachermatchid  = ref_coachid;
                                                coachlist.map(
                                                    ({ _id,name }, index) => {
                                                        if(_id == coachermatchid){
                                                             coachname = name;
                                                        }
                                                    })
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
                                                    <td>{coachname}</td>
                                                    <td>{reason}</td>
                                                    <td>{dateStr}</td>
                                                    <td>
                                                        {dateStr2}
                                                    </td>
                                                    <td>
                                                        {/* <a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12">Edit</a> */}
                                                        {actionbtn} 
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

AdminLeave.propTypes = {
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
    { registerBranch, get_branches, get_coach_view2_axios, get_batches, registerBatch, admissionProc, setleave,get_all_leaves, get_leaves }
)(withRouter(AdminLeave));