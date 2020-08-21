import React, { Component } from 'react';
import {
    Row, Col, Table, Tabs, Tab, Form,
    Button,
    FormControl,
    Collapse
} from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import Card from "../../App/components/MainCard";
import DEMO from "../../store/constant";

import Axios from 'axios';
import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';

import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerBranch, get_branches, deleteBranch, get_batches, registerBatch, deleteBatch, viewallfeedback } from "../actions/branchActions";
import { get_coach_view2_axios } from "../actions/coach2actions";
import classnames from "classnames";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class Batch extends Component {
    constructor(props) {
        super(props);
        this.state = {

            batchname: "",
            ref_branchid: "",
            coachid: "",
            batchactivestatus: false,
            standardfee: "",
            errors: {},
            succeserret: {}, 
            toggle : false
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
        this.props.viewallfeedback();
        this.props.get_coach_view2_axios();
        /* if(empty(this.props.coach2.coachlist)){
            alert("No coach found in app , PLease register a coach first");
            this.props.history.push("/coach");
        } */
    }
    onChange = e => {
        console.log("targeting state " + e.target.id + " with value " + e.target.value);
        this.setState({ [e.target.id]: e.target.value });
    };
    render() {
        const { feedbacklist } = this.props.branch;
        const sayHello = async (x) => {
            const formData = new FormData();
            formData.append('selectedId', x._id)
            console.log(x._id);

            if (x == "") {
                //it will never be empty
            } else {
                console.log("HELLLOOOOO ");

                if (this.state.file != "") {
                    try {
                        const res = await Axios.post('https://mighty-ridge-28744.herokuapp.com/api/users/publishfeedback', formData);
                        //print success here 
                        toast.success("Feedback is Published !", {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                          });
                          this.setState({toggle : !this.state.toggle})
                          this.props.viewallfeedback();
                    } catch (error) {
                        if (error.response.status === 500) {
                            console.log("there was a server error !");
                            this.setState({ errstr: "Check selected file, A server error occured ! Please try again" });

                        }
                    }
                }
            }
        }
        return (
            <Aux>

                <Row>
                <ToastContainer />
                    <Col sm={12}>
                        <Card title='Feedbacks' isOption>
                            <Col sm={12}>
                                <Table responsive >
                                    <thead>
                                        <th>#</th>
                                        <th>Submitted on</th>
                                        <th>Rating</th>
                                        <th>Feedback</th>
                                        <th>Action</th>
                                    </thead>
                                    <tbody>
                                        {
                                            feedbacklist.map(
                                                ({ _id, parentname, submitted_on, batchname, rating, feedback, publishflag }, index) => {
                                                    var actionbtn = <a onClick={() => sayHello({ _id })} className="label theme-bg text-white f-12">Publish</a>
                                                    if (publishflag == true) {
                                                        actionbtn = "Published"
                                                    }
                                                    const f = feedback+"<br>";
                                                   
                                                    var stringer = f.split(" ")
                                                    for(var i =0 ; i < stringer.length ; i++){
                                                        if( i != 0){
                                                            if( i  % 5 === 0 ){
                                                            
                                                                stringer[i] = stringer[i]+"<br/>"
                                                                }
                                                        }
                                                        
                                                        feedback = stringer.join(" ")
                                                    }
                                                    return (
                                                        <tr className="unread">
                                                            <td style={{textAlign : "center"}}>
                                                                <h6 className="mb-1">{(index + 1)} </h6>
                                                            </td>

                                                            <td>
                                                                <h6 className="text-muted">{new Date(submitted_on).toLocaleDateString()}</h6>
                                                            </td>
                                                            <td>
                                                                <h6 className="text-muted"><i className="fa fa-star text-c-yellow f-10 m-r-15" />{rating}</h6>
                                                            </td> <td  dangerouslySetInnerHTML={{ __html: feedback }}>
                                                                {}
                                                                
                                                            </td>
                                                            <td>
                                                                {actionbtn}
                                                            </td>
                                                        </tr>)
                                                })
                                        }
                                    </tbody>
                                </Table></Col>
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

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    coach2: state.coach2,
    branch: state.branch,
});
export default connect(
    mapStateToProps,
    { registerBranch, get_branches, get_coach_view2_axios, get_batches, registerBatch, deleteBatch, viewallfeedback }
)(withRouter(Batch));