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
import { registerCoach, get_coach_view2_axios, deleteCoach } from "../actions/coach2actions";
import classnames from "classnames";
class Coach extends Component {

    //States for coach form 

    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            contact: "",
            errors: {}
        };
    }
    /* _isMounted = false; */
    componentDidMount() {
        /* this._isMounted = true; */
        /*  console.log("On coach page this is state " + this.props.auth.isAuthenticated); */

        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push("../auth/signin-1");
        }
        // fire functon to get caoch list 
        this.props.get_coach_view2_axios();
    }
    /* componentWillUnmount() {
        this._isMounted = false;
      } */
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            }, () => {
                console.log(this.state.errors, 'dealersOverallTotal1')
            });

        }
    }

    onChange = e => {
        console.log("targeting state " + e.target.id + " with value " + e.target.value);

        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            contact: this.state.contact

        };

        this.props.registerCoach(newUser, this.props.history);
    };

    handleClick = value => () => {
        console.log(value._id);

        const deleteId = {
            coachid: value._id,
        };
        if (window.confirm("Are you sure to delete this account ?")) {
            this.props.deleteCoach(deleteId, this.props.history);
            this.props.get_coach_view2_axios();
        }


    };
    render() {
        const { errors } = this.state;
        const { coachlist } = this.props.coach2;
        return (
            <Aux>
                <Row>
                    <Col>
                        <Card title='Registration Form' isOption>
                            <Col md={12}>
                                <form noValidate onSubmit={this.onSubmit}>
                                    <Row>
                                        <Col md={4}>
                                            <Form.Group >
                                                <Form.Label>Email</Form.Label>
                                                <input
                                                    onChange={this.onChange}
                                                    value={this.state.email}
                                                    error={errors.email}
                                                    id="email"
                                                    type="email"
                                                    className={classnames("form-control", {
                                                        invalid: errors.email
                                                    })} placeholder="Email" />
                                            </Form.Group>
                                            <div style={{ color: "red" }}>{this.state.errors.email}</div>

                                        </Col>
                                        <Col md={4}>
                                            <Form.Group >
                                                <Form.Label>Contact</Form.Label>
                                                <input

                                                    onChange={this.onChange}
                                                    value={this.state.contact}
                                                    error={errors.contact}
                                                    id="contact"
                                                    type="email"
                                                    className={classnames("form-control", {
                                                        invalid: errors.contact
                                                    })} placeholder="Contact No." />
                                            </Form.Group>
                                            <div style={{ color: "red" }}>{this.state.errors.contact}</div>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group>
                                                <Form.Label>Name</Form.Label>
                                                <input onChange={this.onChange}
                                                    value={this.state.name}
                                                    error={errors.name}
                                                    id="name"
                                                    type="text"
                                                    className={classnames("form-control", {
                                                        invalid: errors.name
                                                    })}
                                                    placeholder="Full Name" />
                                            </Form.Group>
                                            <div style={{ color: "red" }}>{this.state.errors.name}</div>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group controlId="formBasicPassword">
                                                <Form.Label>Password</Form.Label>
                                                <input onChange={this.onChange}
                                                    value={this.state.password}
                                                    error={errors.password}
                                                    id="password"
                                                    type="password"
                                                    className={classnames("form-control", {
                                                        invalid: errors.password
                                                    })} placeholder="Password" />
                                            </Form.Group>
                                            <div>
                                                <span style={{ color: "#cc0000" }}> {this.state.errors.password}</span>
                                            </div>
                                        </Col>
                                        <Col md={12}>
                                            <Button variant="primary" type="submit">
                                                Submit
                                            </Button>
                                        </Col>

                                    </Row>
                                </form>
                            </Col>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card title='Registered Coaches' isOption>
                            <Table responsive hover>
                                <tbody>

                                    {coachlist.map(
                                        ({ _id, name, contact }) =>
                                            <tr>
                                                <td>
                                                    <img className="rounded-circle" style={{ width: '40px' }} src={avatar2} alt="activity-user" />
                                                    {/* {_id} */}
                                                </td>
                                                <td>
                                                    <h6 className="mb-1">{name}</h6>
                                                </td>
                                                <td><i className="fa fa-circle text-c-green f-10 m-r-15" />{contact}</td>
                                                <td>
                                                    {/* <a class="btn btn-small"><i class="material-icons left">edit</i>edit</a>
                                                     <a class="btn btn-small red"><i class="material-icons left">delete</i>delete</a> */}
                                                   {/*  <a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12">Edit</a> */}
                                                    <a className="label theme-bg2 text-white f-12" value={_id} onClick={this.handleClick({ _id })}>Delete</a>
                                                </td>

                                            </tr>
                                    )}

                                </tbody>
                            </Table>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

Coach.propTypes = {
    registerCoach: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    coach2: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    coach2: state.coach2,
});

export default connect(
    mapStateToProps,
    { registerCoach, get_coach_view2_axios, deleteCoach }
)(withRouter(Coach));
