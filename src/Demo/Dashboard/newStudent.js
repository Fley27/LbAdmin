import React, { Component } from "react";
import axios from "axios";
import {
  Row,
  Col,
  Table,
  Tabs,
  Tab,
  Form,
  Button,
  FormControl,
} from "react-bootstrap";
import Aux from "../../hoc/_Aux";
import Card from "../../App/components/MainCard";

import avatar2 from "../../assets/images/user/avatar-2.jpg";

import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classnames from "classnames";

class NewStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      dbo: "",
      heigth: "",
      weigth: "",
      errors: {},
      succeserret: {},
      user: {},
      search: "",
      toggel: "",
      children: [],
    };
  }

  componentDidMount() {
    axios
      .get(
        `http://localhost:5000/api/users/children/${this.props.auth.user.id}`
      )
      .then((response) => {
        if (response.data.success) {
          this.setState({ children: response.data.children });
        } else {
          alert("Couldnt get blog`s lists");
        }
      });
  }

  onChange = (e) => {
    console.log(
      "targeting state " + e.target.id + " with value " + e.target.value
    );

    this.setState({ [e.target.id]: e.target.value });
  };

  setNotifications = () => {
    let obj = {},
      notifications = [];
    obj.notification_title = "Welcome";
    obj.notification_msg = `You have a new member in your team.`;
    obj.fromid = this.props.auth.user.id;
    obj.toid = this.props.coach;
    obj.severity = "blue";
    notifications.push(obj);

    obj = {};
    obj.notifications = notifications;

    axios
      .post("http://localhost:5000/api/notification", obj)
      .then((response) => {
        if (response.success) {
          console.log("ok");
        }
      });
  };

  onSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    let find = false;

    if (!this.state.name) {
      errors.name = "Branch name is required";
      find = true;
    }

    if (!this.state.dbo) {
      errors.dbo = "Branch dbo is required";
      find = true;
    }

    // Email checks
    if (!this.state.heigth) {
      errors.heigth = "Branch heigth is required";
      find = true;
    }

    if (!this.state.weigth) {
      errors.weigth = "Branch weigth is required";
      find = true;
    }

    if (find) {
      this.setState({ errors: errors });
      return 0;
    }

    let obj = {};
    obj.name = this.state.name;
    obj.dbo = this.state.dbo;
    obj.heigth = this.state.heigth;
    obj.weigth = this.state.weigth;

    axios
      .post(
        `http://localhost:5000/api/users/children/${this.props.parent}/${this.props.batch}`,
        obj
      )
      .then((response) => {
        if (response.data.success) {
          toast.success(" Save with succes!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          this.setNotifications();
          this.setState({ children: response.data.children });
        }
      })
      .then(() => {});
  };

  render() {
    function onclickhref(x) {
      return (window.location.href = x);
    }
    const { errors } = this.state;
    return (
      <Aux>
        <ToastContainer />
        <Row>
          <Col>
            <Card title='Admission form' isOption>
              <Col md={12}>
                <Form noValidate onSubmit={this.onSubmit}>
                  <Row>
                    <Col md={12}>
                      <Form.Group>
                        <Form.Label>Student Name*</Form.Label>
                        <Form.Control
                          onChange={this.onChange}
                          value={this.state.name}
                          error={errors.name}
                          id='name'
                          type='text'
                          placeholder='Student Name'
                        />
                        <div style={{ color: "red" }}>
                          {this.state.errors.name}
                        </div>
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group>
                        <Form.Label>Date Of birth*</Form.Label>
                        <Form.Control
                          onChange={this.onChange}
                          value={this.state.dbo}
                          error={errors.dbo}
                          id='dbo'
                          type='date'
                          placeholder='Date of Birth'
                        />
                        <div style={{ color: "red" }}>
                          {this.state.errors.dbo}
                        </div>
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group>
                        <Form.Label>Heigth*</Form.Label>
                        <Form.Control
                          onChange={this.onChange}
                          value={this.state.heigth}
                          error={errors.heigth}
                          id='heigth'
                          type='number'
                          placeholder='Heigth'
                        />
                        <div style={{ color: "red" }}>
                          {this.state.errors.heigth}
                        </div>
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group>
                        <Form.Label>Weigth*</Form.Label>
                        <Form.Control
                          onChange={this.onChange}
                          value={this.state.weigth}
                          error={errors.weigth}
                          id='weigth'
                          type='number'
                          placeholder='weigth'
                        />
                        <div style={{ color: "red" }}>
                          {this.state.errors.weigth}
                        </div>
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Button variant='primary' type='submit'>
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
            <Card title='Registered Student' isOption>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.children
                    ? this.state.children.map((item) => (
                        <tr key={item._id}>
                          <td>
                            <img
                              className='rounded-circle'
                              style={{ width: "40px" }}
                              src={avatar2}
                              alt='activity-user'
                            />
                          </td>
                          <td>
                            <h6 className='mb-1'>{item.name}</h6>
                          </td>
                          <td>
                            <a
                              href={`/dashboard/guest-payment/${this.props.batch}/${this.props.fees}/${item._id}`}
                              className='label theme-bg text-white f-12'
                            >
                              Select
                            </a>
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Aux>
    );
  }
}
NewStudent.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(withRouter(NewStudent));
