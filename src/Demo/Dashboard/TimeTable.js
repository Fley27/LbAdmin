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
import { settt } from "../actions/branchActions";
import classnames from "classnames";
class TimeTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            check: true,
            batch: "",
            effecttt : ""
        }
        this.submitandcheck = this.submitandcheck.bind(this)
        this.confirmtt = this.confirmtt.bind(this)
        this.tableJSON = {
            "Monday": [],
            "Tuesday": [],
            "Wednesday": [],
            "Thursday": [],
            "Friday": [],
            "Saturday": [],
            "Sunday": []
        }
    }
    componentDidMount() {
        /* this._isMounted = true; */
        console.log("On coach page this is state " + this.props.auth.isAuthenticated);

        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push("../auth/signin-1");
        }/* 
        if (!this.props.auth.selectedbranch) {
            this.props.history.push("../auth/branchselector");
        } */
        // fire functon to get branch & caoch list 
        this.props.get_batches();
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    submitandcheck(e) {
        e.preventDefault();

        console.log("this is value ",this.selectedDay.options[this.selectedDay.selectedIndex].value);
        if (this.selectedDay.textContent.length > 1) {
            this.tableJSON[this.selectedDay.options[this.selectedDay.selectedIndex].value].push({
                "startTime": this.startTime.value,
                "endTime": this.endTime.value
            })
        }

        this.setState({ check: !this.state.check })
    }
    renderTableData() {
        var tableRows = 0;
        var tableData = [];
        (Object.keys(this.tableJSON)).map((key) => {
            if (this.tableJSON[key].length > tableRows) {
                tableRows = this.tableJSON[key].length
            }
        }, this)
        for (var i = 0; i < tableRows; i++) {
            tableData.push(<tr key={i}>{(Object.keys(this.tableJSON)).map((key) => {
                if (this.tableJSON[key][i] === undefined) {
                    return <td align="left">-</td>
                } else {
                    return <td align="left">{this.tableJSON[key][i].startTime + " to " + this.tableJSON[key][i].endTime}</td>
                }
            }, this)}</tr>)
        }
        return tableData
    }
    confirmtt(){
        console.log(this.tableJSON);
        const dataset = {
            ttdata : this.tableJSON,
            batch : this.state.batch,
            effecttt : this.state.effecttt
        }
        this.props.settt(dataset , this.props.history)
    }
    render() {
        const flexContainer = {
            display: 'flex',
            flexDirection: 'row',
        };
        const { batchlist } = this.props.branch;
        const { errors } = this.state;
        const { succeserret } = this.state;
        return (
            <div>
                <Row>
                    <Col>
                        <Card title='Create New TimeTable' isOption>
                            <Col md={12}>
                                <Form>
                                    <Row>
                                        <Col md={4}>
                                            <Form.Group controlId="formBasicPassword">
                                                <Form.Label>Batch</Form.Label>
                                                <Form.Control
                                                    onChange={this.onChange}
                                                    value={this.state.batch}
                                                    id="batch"
                                                    as="select"
                                                    className="mb-3">
                                                    <option value="" >Select a batch</option>
                                                    {batchlist.map(
                                                        ({ _id, batchname }) => <option value={_id} >{batchname}</option>)
                                                    }
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group controlId="formBasicPassword">
                                                <Form.Label>Effective from </Form.Label>
                                                <Form.Control
                                                    onChange={this.onChange}
                                                    value={this.state.effecttt}
                                                    id="effecttt"
                                                    type="date"
                                                    className="mb-3">
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col item md={4} >
                                            <Form.Label>Day</Form.Label>
                                            <Form.Group >
                                                <Form.Control as="select" defaultValue="" id="grouped-select" ref={(selectedDay) => { this.selectedDay = selectedDay }}>
                                                    {(Object.keys(this.tableJSON)).map((key) => { return <option value={key}>{key}</option> })}
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col item md={4} >
                                            <Form.Label>Start time</Form.Label>
                                            <Form.Group >
                                                <Form.Control
                                                    id="time"
                                                    type="time"
                                                    defaultValue="12:00"
                                                    ref={(startTime) => { this.startTime = startTime }}

                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col item md={4}  >
                                            <Form.Label>End time</Form.Label>
                                            <Form.Group >
                                                <Form.Control
                                                    id="time"
                                                    type="time"
                                                    defaultValue="12:00"
                                                    ref={(endTime) => { this.endTime = endTime }}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>

                                            <Button variant="primary" onClick={this.submitandcheck}>
                                                Add session
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
                        <Card title='Time Table' isOption>
                            <Row>
                                <Col>
                                    <Table responsive hover>
                                        <thead>
                                            <tr>
                                                {(Object.keys(this.tableJSON)).map((key) => { return <td><b>{key}</b></td> })}
                                            </tr>
                                        </thead>
                                        <tbody> {this.renderTableData()} </tbody>
                                    </Table>
                                </Col>
                                <Col md={4}>
                                    <Button variant="primary" onClick={this.confirmtt}>
                                       Confirm time-table
                                     </Button>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </div>
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
    { registerBranch, get_branches, get_coach_view2_axios, get_batches, registerBatch, admissionProc ,settt}
)(withRouter(TimeTable));