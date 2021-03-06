import React, { Component } from "react";
import { Col, Button, Form, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./user.scss";

import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addChallengeType } from "../../redux/actions/challengeType";
class AddChallengeType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: "",
      name: "",
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.challengeType.challengeType) {
      console.log(`${this.props.challengeType}`);
      this.setState({ identifier: "", name: "" });
      if(nextProps.alert.msg){
        toast.success( `${nextProps.alert.msg}`, {
          position: "top-center",
          autoClose: 3500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    }else{
      if(nextProps.alert.msg){
        toast.error( `${nextProps.alert.msg}`, {
          position: "top-center",
          autoClose: 3500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    }
  }

  handleChange = (e) => {
    console.log(
      "targeting state " + e.target.id + " with value " + e.target.value
    );
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addChallengeType(this.state);
  };
  
  render() {
    const { challengeType } = this.props.challengeType;
    console.log(challengeType);

    return (
      <div className='main-content w-80'>
        <ToastContainer />
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='card'>
                <div className='card-header card-header-danger'>
                  <h4 className='card-title '>Guadar tipo de reto</h4>
                </div>
                <div className='card-body'>
                  <Col className='w-80'>
                    <Form onSubmit={this.onSubmit} md={12}>
                      <Row>
                        <Col mb={4}>
                          <Form.Group>
                            <Form.Label>Identificador*</Form.Label>
                            <Form.Control
                              onChange={this.handleChange}
                              value={this.state.identifier}
                              id='identifier'
                              type='text'
                              placeholder='Identificador'
                            />
                          </Form.Group>
                        </Col>
                        <Col mb={4}>
                          <Form.Group>
                            <Form.Label>Título*</Form.Label>
                            <Form.Control
                              onChange={this.handleChange}
                              value={this.state.name}
                              id='name'
                              type='text'
                              placeholder='Título...'
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Col md={8}>
                        <Button variant='danger' type='submit'>
                          GUARDAR
                        </Button>
                      </Col>
                    </Form>
                  </Col>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddChallengeType.propTypes = {
  addChallengeType: PropTypes.func.isRequired,
  challengeType: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  challengeType: state.challengeType,
});
export default connect(mapStateToProps, { addChallengeType })(
  withRouter(AddChallengeType)
);
