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
import { registerBranch, get_branches,deleteBranch } from "../actions/branchActions";
import { get_coach_view2_axios } from "../actions/coach2actions";
import classnames from "classnames";
class Enquiry extends Component {
    componentDidMount() {
        /* this._isMounted = true; */
        console.log("On coach page this is state " + this.props.auth.isAuthenticated);

        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push("../auth/signin-1");
        }
        // fire functon to get branch & caoch list 
        this.props.get_branches();
        this.props.get_coach_view2_axios();
        
    }
    render() { const { coachlist } = this.props.coach2;
        return (
            <Aux>
                <Row>
                    <Col>
                        <Card title='Enquiry form' isOption>
                            <Col md={12}>
                                <Form>
                                    <Row>
                                        <Col md={4}>
                                            <Form.Group controlId="formBasicPassword">
                                                <Form.Label>Parent Name*</Form.Label>
                                                <Form.Control type="text" placeholder="Parent Name" />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group controlId="formBasicPassword">
                                                <Form.Label>Parent Contact*</Form.Label>
                                                <Form.Control type="text" placeholder="10 digit mobile no" />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group controlId="formBasicPassword">
                                                <Form.Label>Addresss*</Form.Label>
                                                <Form.Control type="text" placeholder="Addresss " />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group controlId="formBasicPassword">
                                                <Form.Label>Student Name*</Form.Label>
                                                <Form.Control type="text" placeholder="Student Name" />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group controlId="formBasicPassword">
                                                <Form.Label>Sports*</Form.Label>
                                                <Form.Control as="select" className="mb-3">
                                                    <option>Select a sport</option>
                                                    <option>BasketBall</option>
                                                    <option>Hockey</option>
                                                    <option>Football</option>
                                                    <option>Cricket</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group controlId="formBasicPassword">
                                                <Form.Label>Expected fees</Form.Label>
                                                <Form.Control type="test" placeholder="Expected fees" />
                                            </Form.Group>
                                        </Col>
                                         <Col md={4}>
                                            <Form.Group controlId="formBasicPassword">
                                                <Form.Label>Referance Coach</Form.Label>
                                                <Form.Control as="select" className="mb-3">
                                                <option value="" >Select a coach</option>
                                                {coachlist.map(
                                                        ({ _id, name, contact }) => <option value={_id} >{name}</option>)
                                                    }
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>

                                        <Col md={12}>
                                            <Button variant="primary">
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

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    coach2: state.coach2,
    branch: state.branch,
});
export default connect(
    mapStateToProps,
    { registerBranch, get_branches, get_coach_view2_axios ,deleteBranch}
)(withRouter(Enquiry));