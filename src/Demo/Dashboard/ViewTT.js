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
import { settt, viewtt } from "../actions/branchActions";
import classnames from "classnames";
class ViewTT extends Component {

    constructor(props) {
        super(props);
        this.state = {
            check: true,
            batch: "",
            effecttt: ""
        }
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
        console.log("On coach page this is state " + this.props.auth.isAuthenticated);

        if (!this.props.auth.isAuthenticated) {
            this.props.history.push("../auth/signin-1");
        }
        this.props.get_batches();
    }
    componentWillReceiveProps(nextProps) {
        console.log("props are below =========>")
        console.log(nextProps);
        console.log("props are above =========>")
        console.log(nextProps.branch.timetable);
        if (nextProps.branch.timetable != null) {
            if (nextProps.branch.timetable.length != 0) {
                if (typeof nextProps.branch.timetable[0].tt !== undefined || typeof nextProps.branch.timetable[0].tt !== null) {
                    console.log("null value of tt is ", nextProps.branch.timetable,);

                    /*  this.tableJSON = nextProps.branch.timetable[0].tt */
                    nextProps.branch.timetable[0].tt.d1.map(
                        ({ time1, time2 }) => {
                            this.tableJSON["Monday"].push({
                                "startTime": time1,
                                "endTime": time2
                            })
                        }
                    )
                    nextProps.branch.timetable[0].tt.d2.map(
                        ({ time1, time2 }) => {
                            this.tableJSON["Tuesday"].push({
                                "startTime": time1,
                                "endTime": time2
                            })
                        }
                    )
                    nextProps.branch.timetable[0].tt.d3.map(
                        ({ time1, time2 }) => {
                            this.tableJSON["Wednesday"].push({
                                "startTime": time1,
                                "endTime": time2
                            })
                        }
                    )
                    nextProps.branch.timetable[0].tt.d4.map(
                        ({ time1, time2 }) => {
                            this.tableJSON["Thursday"].push({
                                "startTime": time1,
                                "endTime": time2
                            })
                        }
                    )
                    nextProps.branch.timetable[0].tt.d5.map(
                        ({ time1, time2 }) => {
                            this.tableJSON["Friday"].push({
                                "startTime": time1,
                                "endTime": time2
                            })
                        }
                    )
                    nextProps.branch.timetable[0].tt.d6.map(
                        ({ time1, time2 }) => {
                            this.tableJSON["Saturday"].push({
                                "startTime": time1,
                                "endTime": time2
                            })
                        }
                    )
                    nextProps.branch.timetable[0].tt.d7.map(
                        ({ time1, time2 }) => {
                            this.tableJSON["Sunday"].push({
                                "startTime": time1,
                                "endTime": time2
                            })
                        }
                    )

                }
            }
        }

    }
    onChange = e => {
        this.tableJSON = {
            "Monday": [],
            "Tuesday": [],
            "Wednesday": [],
            "Thursday": [],
            "Friday": [],
            "Saturday": [],
            "Sunday": []
        }
        this.setState({ [e.target.id]: e.target.value }, () => {
            const postdata = {
                batch: this.state.batch
            }
            console.log("hello here ?");
            this.props.viewtt(postdata);
            console.log(this.props.branch);

            /* this.tableJSON =  */
            this.setState({ check: !this.state.check })

        });

    };
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

    render() {
        const flexContainer = {
            display: 'flex',
            flexDirection: 'row',
        };
        const { batchlist } = this.props.branch;
        const { timetable } = this.props.branch;
        const { errors } = this.state;
        const { succeserret } = this.state;
        return (
            <div>
                <Row>
                    <Col>
                        <Card title='Select Batch' isOption>
                            <Col md={12}>
                                <Form>
                                    <Row>
                                        <Col md={4}>
                                            <Form.Group>
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
                                        </Col>{/* 
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
                                        </Col> */}
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

                            </Row>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}
ViewTT.propTypes = {
    viewtt: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    coach2: state.coach2,
    branch: state.branch,
});
export default connect(
    mapStateToProps,
    { registerBranch, get_branches, get_coach_view2_axios, get_batches, viewtt }
)(withRouter(ViewTT));