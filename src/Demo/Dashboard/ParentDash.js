import React from 'react';
import { Row, Col, Card, Table, Tabs, Tab } from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";

import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerBranch, get_branches, deleteBranch, get_batches, registerBatch, admissionProc } from "../actions/branchActions";
import { get_coach_view2_axios } from "../actions/coach2actions";
import { getchildren , togglewards} from "../actions/parentActions";
import classnames from "classnames";

class ParentDash extends React.Component {
    componentDidMount() {
        /* this._isMounted = true; */
        console.log("On coach page this is state " + this.props.auth.isAuthenticated);

        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push("../auth/signin-1");
        }
        // fire functon to get branch & caoch list 
        const parent = {
            parent_Id: this.props.auth.user.id,
        };
        this.props.getchildren(parent);
    }
   
    render() {
        const { childrenlist } = this.props.parent;
        const tabContent = (
            <Aux>
                <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                    <div className="m-r-10 photo-table">
                        <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" /></a>
                    </div>
                    <div className="media-body">
                        <h6 className="m-0 d-inline">Silje Larsen</h6>
                        <span className="float-right d-flex  align-items-center"><i className="fa fa-circle f-22 m-r-10 text-c-yellow" />Not marked</span>
                    </div>
                </div>
                <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                    <div className="m-r-10 photo-table">
                        <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{ width: '40px' }} src={avatar2} alt="activity-user" /></a>
                    </div>
                    <div className="media-body">
                        <h6 className="m-0 d-inline">Julie Vad</h6>
                        <span className="float-right d-flex  align-items-center"><i className="fa fa-circle f-22 m-r-10 text-c-green" />Present today</span>
                    </div>
                </div>

            </Aux>
        );

        return (
            <Aux>
                <Row>
                    <Col md={6} xl={8}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Recent Feedbacks</Card.Title>
                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                                <Table responsive hover>
                                    <tbody>
                                        <tr className="unread">
                                            <td><img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" /></td>
                                            <td>
                                                <h6 className="mb-1">Isabella Christensen</h6>
                                                <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                                <p> <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />Posted on : 11 MAY </h6></p>
                                            </td>
                                            <td>

                                            </td>

                                        </tr>
                                        <tr className="unread">
                                            <td><img className="rounded-circle" style={{ width: '40px' }} src={avatar2} alt="activity-user" /></td>
                                            <td>
                                                <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                                <p> <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />Posted on : 11 MAY </h6></p>

                                            </td>


                                        </tr>
                                        <tr className="unread">
                                            <td><img className="rounded-circle" style={{ width: '40px' }} src={avatar3} alt="activity-user" /></td>
                                            <td>
                                                <h6 className="mb-1">Karla Sorensen</h6>
                                                <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                                <p> <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />Posted on : 11 MAY </h6></p>


                                            </td>

                                        </tr>


                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} xl={8}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Student Attendance</Card.Title>
                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                                <Col md={6} xl={8}>
                                    {console.log("children list",childrenlist),
                                    
                                        childrenlist.map(
                                            ({ _id, studententity }) =>
                                            studententity.map(
                                                ({ _id, name }) =>
                                                <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                                                    <div className="m-r-10 photo-table">
                                                        <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" /></a>
                                                    </div>
                                                    <div className="media-body">
                                                        <h6 className="m-0 d-inline">{name}</h6>
                                                        <span className="float-right d-flex  align-items-center"><i className="fa fa-circle f-22 m-r-10 text-c-yellow" />Not marked</span>
                                                    </div>
                                                </div>
                                                
                                                )
                                                


                                        )}
                                  
                                </Col>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}
ParentDash.propTypes = {
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
    parent: state.parent
});
export default connect(
    mapStateToProps,
    { registerBranch, get_branches, get_coach_view2_axios, get_batches, registerBatch, admissionProc, getchildren }
)(withRouter(ParentDash));