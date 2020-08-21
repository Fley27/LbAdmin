import React, { Component } from "react";
import axios from "axios";
import { Row, Col, Table, Form, Button, FormControl } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Aux from "../../hoc/_Aux";
import Card from "../../App/components/MainCard";

import avatar2 from "../../assets/images/user/avatar-2.jpg";

import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { get_batches } from "../actions/branchActions";

class AttenanceReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      batch: "",
      date: "",
      date2: "",
      search: "",
      attendances: [],
      batchlist: [],
    };
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    this.props.get_batches();
    axios.get(`http://localhost:5000/api/ttnatt/report`).then((response) => {
      if (response.data.success) {
        this.setState({ attendances: response.data.attendance });
      } else {
        alert("Couldnt get blog`s lists");
      }
    });
    axios
      .post(`http://localhost:5000/api/branch/viewbatch`)
      .then((response) => {
        if (response.data) {
          this.setState({ batchlist: response.data });
        } else {
          alert("Couldnt get blog`s lists");
        }
      });
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    var dateformat = require("dateformat");
    const batchlist = this.state.batchlist;
    let filteredList = this.state.attendances;

    filteredList = filteredList.filter((student) =>
      student.student.name
        .toLowerCase()
        .includes(this.state.search.toLowerCase())
    );

    if (this.state.date != "" && this.state.date2 != "") {
      console.log("" + this.state.date + " & " + this.state.date2);
      filteredList = filteredList.filter(
        (student) =>
          student.createdtt >= dateformat(this.state.date, "yyyy  / mm / dd") &&
          student.createdtt <= dateformat(this.state.date2, "yyyy  / mm / dd")
      );
    }

    if (this.state.batch != "") {
      filteredList = filteredList.filter(
        (student) => student.ref_batchid._id === this.state.batch
      );
    }

    let attendances = [];
    for (let i = 31; i >= 0; i--) {
      let date = new Date();
      date.setDate(date.getDate() - i);
      let tempAttendance = [];

      let newDate = dateformat(date, "yyyy  / mm / dd");
      filteredList.map((item) => {
        if (item.createdtt == newDate) {
          tempAttendance.push(item);
        }
      });

      if (tempAttendance.length > 0) {
        let obj = {};
        let report = [];
        report.push(tempAttendance);
        obj.date = newDate;
        obj.report = report;
        attendances.push(obj);
      }
    }

    filteredList = attendances;

    return (
      <Aux>
        <Row>
          <Col md={12}>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Search by name*</Form.Label>
                <Form.Control
                  onChange={this.onChange}
                  value={this.state.search}
                  id='search'
                  type='search'
                  placeholder='Search'
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Search by Batch</Form.Label>
                <Form.Control
                  onChange={this.onChange}
                  value={this.state.batch}
                  id='batch'
                  as='select'
                  className='mb-3'
                >
                  <option value=''>Select a batch</option>
                  {batchlist.map(({ _id, batchname }) => (
                    <option value={_id}>{batchname}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Row md={8}>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>From date*</Form.Label>
                  <Form.Control
                    onChange={this.onChange}
                    id='date'
                    type='date'
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>To date*</Form.Label>
                  <Form.Control
                    onChange={this.onChange}
                    id='date2'
                    type='date'
                  />
                </Form.Group>
              </Col>
            </Row>
          </Col>
        </Row>
        {filteredList.length > 0
          ? filteredList.map((report) => (
              <Card title={`Reported : ${report.date}`}>
                {report.report.map((item) => (
                  <Table>
                    <thead>
                      <tr>
                        <th></th>
                        <th>STUDENT</th>
                        <th>BATCH</th>
                        <th>SESSION</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.map((student) => (
                        <tr key={student._id}>
                          <td>
                            <img
                              className='rounded-circle'
                              style={{ width: "40px" }}
                              src={avatar2}
                              alt='activity-user'
                            />
                          </td>
                          <td>
                            <h6 className='mb-1'>{student.student.name}</h6>
                          </td>
                          <td>
                            <h6 className='mb-1'>
                              {student.ref_batchid.batchname}
                            </h6>
                          </td>
                          <td>
                            <h6 className='mb-1'>{student.session}</h6>
                          </td>
                          <td>
                            <h6 className='mb-1'>{student.status}</h6>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ))}
              </Card>
            ))
          : null}
      </Aux>
    );
  }
}

AttenanceReport.propTypes = {
  get_batches: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  get_batches,
})(withRouter(AttenanceReport));
