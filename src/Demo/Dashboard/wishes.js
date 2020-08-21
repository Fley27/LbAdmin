import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { withRouter } from "react-router";
import Aux from "../../hoc/_Aux";
import Card from "../../App/components/MainCard";
import DEMO from "../../store/constant";
import axios from "axios";

import Avatar1 from "../../assets/images/user/avatar-1.jpg";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Table, Form, Col, Row, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./wishes.css";

class Wishes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      wishes: [],
      message: "",
      fromid: "",
      toid: "",
    };
  }
  componentDidMount() {
    axios
      .get(
        `http://localhost:5000/api/birthday/wishes/${this.props.match.params.id}`
      )
      .then((response) => {
        if (response.data.success) {
          this.setState({ wishes: response.data.wishes });
        } else {
          alert("Couldnt get blog`s lists");
        }
      });
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    let obj = {};
    obj.message = this.state.message;
    obj.fromid = this.props.auth.user.id;
    obj.toid = this.props.match.params.id;

    if (!this.state.message) return 0;

    axios
      .post("http://localhost:5000/api/birthday", obj)
      .then((respone) => {
        if (respone.data.success) {
          toast.success("Message sended!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error("Error !! Didn't send", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    console.log(this.state.wishes);
    return (
      <Aux>
        <ToastContainer />
        <Card title={`Make a wish`} isOption>
          <Form noValidate onSubmit={this.onSubmit}>
            <Row className='textarea'>
              <textarea
                id='message'
                onChange={
                  this.state.message.length < 151 ? this.onChange : null
                }
                value={this.state.message}
                rows='8'
                cols='50'
              ></textarea>
              <Col md={12}>
                <Button variant='primary' type='submit'>
                  Save your wish
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title='Wishes List' isOption>
          <Table responsive hover>
            <tbody>
              {this.state.wishes
                ? this.state.wishes.map((item) => (
                    <tr
                      key={item._id}
                      style={{ height: 50 }}
                      className='notification'
                    >
                      <td className='media'>
                        <img
                          style={{ height: 50, width: 50 }}
                          className='img-radius'
                          src={item.fromid.filepath}
                          alt='Generic placeholder'
                        />
                      </td>
                      <td className='media-body'>
                        <h6 style={{ margin: 20 }}>{item.message}</h6>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </Table>
        </Card>
      </Aux>
    );
  }
}
Wishes.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default withRouter(connect(mapStateToProps)(Wishes));
