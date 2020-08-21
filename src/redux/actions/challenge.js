import axios from "axios";
import { setAlert } from "./alert";
import {
  FETCH_CHALLENGE_REQUEST,
  FETCH_CHALLENGE_SUCCESS,
  FETCH_CHALLENGE_FAIL,
  ADD_CHALLENGE_REQUEST,
  ADD_CHALLENGE_SUCCESS,
  ADD_CHALLENGE_FAIL,
  EDIT_CHALLENGE_REQUEST,
  EDIT_CHALLENGE_SUCCESS,
  EDIT_CHALLENGE_FAIL,
  DELETE_CHALLENGE_REQUEST,
  DELETE_CHALLENGE_SUCCESS,
  DELETE_CHALLENGE_FAIL,
} from "../const";

import React, { Component } from "react";

import { Col, Button, Form, Card, Row } from "react-bootstrap";

import "./user.scss";

import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editCoinsUser } from "../../redux/actions/user";
class AddCoins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numero: "",
      accion: "",
    };
  }

  handleChange = (e) => {
    console.log(
      "targeting state " + e.target.id + " with value " + e.target.value
    );
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <Row md={12}>
        <Col md={8}>
          <div className='main-content'>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='card'>
                    <div className='card-header card-header-danger'>
                      <h4 className='card-title '>
                        Editar monedas del Usuario
                      </h4>
                    </div>
                    <div className='card-body'>
                      <Col>
                        <Form onSubmit={this.onSubmit} md={12}>
                          <Row>
                            <Form.Group>
                              <Form.Label>Elige una acción*</Form.Label>
                              <Form.Control
                                onChange={this.handleChange}
                                value={this.state.accion}
                                id='accion'
                                as='select'
                                className='mb-3'
                              >
                                <option value='add'>Anadir monedas</option>
                                <option value='minus'>Sustraer monedas</option>
                              </Form.Control>
                            </Form.Group>
                            <Form.Group>
                              <Form.Label>Número*</Form.Label>
                              <Form.Control
                                onChange={this.handleChange}
                                value={this.state.numero}
                                id='numero'
                                type='number'
                                placeholder='Cantidad de monedas'
                              />
                            </Form.Group>
                          </Row>
                          <Col md={8}>
                            <Button variant='danger' type='submit'>
                              ACTUALIZAR
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
        </Col>
      </Row>
    );
  }
}

AddCoins.propTypes = {
  auth: PropTypes.object.isRequired,
  editCoinsUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});
export default connect(mapStateToProps, { editCoinsUser })(
  withRouter(AddCoins)
);
