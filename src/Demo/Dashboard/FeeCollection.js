import React, { Component } from "react";
import { Row, Col, Tabs, Tab, Nav, Form, Table } from "react-bootstrap";
import axios from "axios";
import Aux from "../../hoc/_Aux";
import Card from "../../App/components/MainCard";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import DEMO from "../../store/constant";
class FeeCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subscriptionduration: "",
      results: [],
      search: "",
      batch: "",
      date: "",
      month: [
        "January",
        "Febrary",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      batchlist: [],
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  componentDidMount() {
    console.log("adkskdksdmks" + this.props.auth.user.id);
    if (this.props.auth.user.usertype === "admin") {
      this.GetByAdmin();
    } else {
      this.GetByCoach();
    }
    this.GetBatches();
  }

  GetBatches() {
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

  GetByCoach() {
    axios
      .get(
        `http://localhost:5000/api/branch/bacthbycoach/${this.props.auth.user.id}`
      )
      .then((response) => {
        if (response.data.success) {
          this.setState({ results: response.data.resutls });
        }
      });
  }

  GetByAdmin() {
    axios
      .get(`http://localhost:5000/api/branch/bacthbyadmin/`)
      .then((response) => {
        if (response.data.success) {
          this.setState({ results: response.data.resutls });
        }
      });
  }
  render() {
    let i = 1;
    const batchlist = this.state.batchlist;
    let filteredList = this.state.results;

    filteredList = filteredList.filter((element) =>
      element.student.student.name
        .toLowerCase()
        .includes(this.state.search.toLowerCase())
    );

    if (this.state.date != "") {
      console.log("" + this.state.date + " & " + this.state.date2);
      filteredList = filteredList.filter((element) =>
        element.fee.payformonth
          .toLowerCase()
          .includes(this.state.date.toLowerCase())
      );
    }

    if (this.state.batch != "") {
      filteredList = filteredList.filter((element) =>
        element.student.batchname
          .toLowerCase()
          .includes(this.state.batch.toLowerCase())
      );
    }

    return (
      <Aux>
        <Row md={12}>
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
                    <option value={batchname}>{batchname}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Month*</Form.Label>
                <Form.Control
                  onChange={this.onChange}
                  as='select'
                  className='mb-3'
                  id='date'
                  type='text'
                  placeholder='Month'
                >
                  {this.state.month.map((name) => (
                    <option value={name}>{name}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Col>
        </Row>
        <Tabs variant='pills' defaultActiveKey='home' className='mb-3'>
          <Tab eventKey='home' title='All'>
            <Row>
              <Card title='Fee Status - ALL' isOption>
                <Table responsive hover>
                  <thead>
                    <th>#</th>
                    <th>Month</th>
                    <th>Student Name</th>
                    <th>Parent Name</th>
                    <th>Contact</th>
                    <th>Status</th>
                  </thead>
                  <tbody>
                    {filteredList.map((result) => (
                      <tr className='unread'>
                        <td>
                          <h6 className='mb-1'>{i++}</h6>
                        </td>
                        <td>
                          <h6 className='mb-1'>{result.fee.payformonth}</h6>
                        </td>
                        <td>
                          <h6 className='mb-1'>
                            {result.student.student.name}
                          </h6>
                        </td>
                        <td>
                          <h6 className='mb-1'>{result.parent.name}</h6>
                        </td>
                        <td>
                          <h6 className='mb-1'>{result.parent.contact}</h6>
                        </td>
                        <td>
                          <h6 className='text-muted'>
                            {result.fee.status == "paid" ? (
                              <i className='fa fa-circle text-c-green f-10 m-r-15' />
                            ) : (
                              <i className='fa fa-circle text-c-red f-10 m-r-15' />
                            )}
                            {result.fee.status}
                          </h6>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card>
            </Row>
          </Tab>
          <Tab eventKey='profile' title='Paid'>
            <Row>
              <Card title='Fee Status - Paid' isOption>
                <Table responsive hover>
                  <thead>
                    <th>#</th>
                    <th>Month</th>
                    <th>Student Name</th>
                    <th>Parent Name</th>
                    <th>Contact</th>
                    <th>Status</th>
                  </thead>
                  <tbody>
                    {filteredList.map((result) =>
                      result.fee.status === "paid" ? (
                        <tr className='unread'>
                          <td>
                            <h6 className='mb-1'>{i++}</h6>
                          </td>
                          <td>
                            <h6 className='mb-1'>{result.fee.payformonth}</h6>
                          </td>
                          <td>
                            <h6 className='mb-1'>
                              {result.student.student.name}
                            </h6>
                          </td>
                          <td>
                            <h6 className='mb-1'>{result.parent.name}</h6>
                          </td>
                          <td>
                            <h6 className='mb-1'>{result.parent.contact}</h6>
                          </td>
                          <td>
                            <h6 className='text-muted'>
                              {result.fee.status == "paid" ? (
                                <i className='fa fa-circle text-c-green f-10 m-r-15' />
                              ) : (
                                <i className='fa fa-circle text-c-red f-10 m-r-15' />
                              )}
                              {result.fee.status}
                            </h6>
                          </td>
                        </tr>
                      ) : null
                    )}
                  </tbody>
                </Table>
              </Card>
            </Row>
          </Tab>
          <Tab eventKey='contact' title='Pending'>
            <Row>
              <Card title='Fee Status - Pending' isOption>
                <Table responsive hover>
                  <thead>
                    <th>#</th>
                    <th>Month</th>
                    <th>Student Name</th>
                    <th>Parent Name</th>
                    <th>Contact</th>
                    <th>Status</th>
                  </thead>
                  <tbody>
                    {filteredList.map((result) =>
                      result.fee.status != "paid" ? (
                        <tr className='unread'>
                          <td>
                            <h6 className='mb-1'>{i++}</h6>
                          </td>
                          <td>
                            <h6 className='mb-1'>{result.fee.payformonth}</h6>
                          </td>
                          <td>
                            <h6 className='mb-1'>
                              {result.student.student.name}
                            </h6>
                          </td>
                          <td>
                            <h6 className='mb-1'>{result.parent.name}</h6>
                          </td>
                          <td>
                            <h6 className='mb-1'>{result.parent.contact}</h6>
                          </td>
                          <td>
                            <h6 className='text-muted'>
                              {result.fee.status == "paid" ? (
                                <i className='fa fa-circle text-c-green f-10 m-r-15' />
                              ) : (
                                <i className='fa fa-circle text-c-red f-10 m-r-15' />
                              )}
                              {result.fee.status}
                            </h6>
                          </td>
                        </tr>
                      ) : null
                    )}
                  </tbody>
                </Table>
              </Card>
            </Row>
          </Tab>
        </Tabs>
      </Aux>
    );
  }
}

FeeCollection.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(withRouter(FeeCollection));
