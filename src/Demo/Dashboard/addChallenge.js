import React, { Component } from "react";

import { Col, Button, Form, Row } from "react-bootstrap";

import "./user.scss";
import "./input.css";

import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editCoinsUser } from "../../redux/actions/user";
import Tooltip from "@material-ui/core/Tooltip";
import Multi from "../Forms/multiSelect";
import { Orientation, Pair } from "../data/data";
class AddChallenge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      cost: "",
      category: "",
      type: "",
      appUsage: [],
      profileType: "",
      senderSex: "",
      receiverSex: "",
      image: "",
      senderOrientation: [],
      receiverOrientation: [],
      senderPair: [],
      receiverPair: [],
      answerType: "",
      duration: "",
    };
  }

  handleChange = (e) => {
    console.log(
      "targeting state " + e.target.id + " with value " + e.target.value
    );
    this.setState({ [e.target.id]: e.target.value });
  };

  HandleChange = (newValue = null, actionMeta = null) => {
    console.group("Value Changed");
    this.setState({ [actionMeta.name]: newValue });
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };

  onSubmit = (e) => {
    e.preventDefault();
  };
  render() {
    const { user } = this.props.user;
    return (
      <div className='main-content'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='card'>
                <div className='card-header card-header-danger'>
                  <h4 className='card-title '>Crear nuevos retos</h4>
                </div>
                <div className='card-body'>
                  <Form className='mb-form' onSubmit={this.onSubmit} md={12}>
                    <Col className='w-80'>
                      <Row>
                        <Col className='w-40 outline-none'>
                          <Form.Group>
                            <Form.Label>Titulo*</Form.Label>
                            <Form.Control
                              onChange={this.handleChange}
                              value={this.state.title}
                              id='title'
                              type='text'
                              placeholder='Titulo...'
                            />
                          </Form.Group>
                        </Col>
                        <Col className='w-40'>
                          <Form.Group>
                            <Form.Label>Coste*</Form.Label>
                            <Form.Control
                              onChange={this.handleChange}
                              value={this.state.cost}
                              id='cost'
                              type='number'
                              placeholder='Coste...'
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                    <Col className='w-80'>
                      <Row>
                        <Col className='w-40'>
                          <Form.Group>
                            <Form.Label>Categoria*</Form.Label>
                            <Form.Control
                              onChange={this.handleChange}
                              value={this.state.category}
                              id='category'
                              as='select'
                              className='mb-3'
                            >
                              <option value=''>
                                Seleccionar una categoria
                              </option>
                              <option value='add'>Anadir monedas</option>
                              <option value='minus'>Sustraer monedas</option>
                            </Form.Control>
                          </Form.Group>
                        </Col>
                        <Col className='w-40'>
                          <Form.Group>
                            <Form.Label>Tipologia*</Form.Label>
                            <Form.Control
                              onChange={this.handleChange}
                              value={this.state.type}
                              id='type'
                              as='select'
                              className='mb-3'
                            >
                              <option value=''>
                                Seleccionar una tipologia
                              </option>
                              <option value='add'>Anadir monedas</option>
                              <option value='minus'>Sustraer monedas</option>
                            </Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                    <Col className='w-80'>
                      <Row>
                        <Col className='w-40'>
                          <Form.Group>
                            <Form.Label>Uso de la App*</Form.Label>
                            <Form.Control
                              onChange={this.handleChange}
                              value={this.state.appUsage}
                              id='appUsage'
                              as='select'
                              className='mb-3'
                            >
                              <option value='add'>Citas Reales</option>
                              <option value='minus'>Ciber Sexo</option>
                            </Form.Control>
                          </Form.Group>
                        </Col>
                        <Col className='w-40'>
                          <Form.Group>
                            <Form.Label>Tipo de Perfil*</Form.Label>
                            <Form.Control
                              onChange={this.handleChange}
                              value={this.state.profileType}
                              id='profileType'
                              as='select'
                              className='mb-3'
                            >
                              <option value=''>
                                Seleccionar una tipologia
                              </option>
                              <option value='1'>Soltero</option>
                              <option value='2'>Pareja</option>
                            </Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                    <Col className='w-80'>
                      <Row style={{ height: 50 }}>
                        <Col className='w-40'>
                          <Form.Group>
                            <Form.Label>
                              {this.state.filepath
                                ? this.state.filepath
                                : "Imagen del reto"}
                            </Form.Label>
                            <label
                              htmlFor='image'
                              className='custom-file-upload'
                            >
                              <i className='material-icons '>attach_file</i>
                            </label>
                            <input id='image' type='file' />
                          </Form.Group>
                          <div className='col-auto pl-0'>
                            <div className='question-image-container w-100'>
                              <img src='' alt='' className='question-image' />
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    {this.state.profileType === "1" ? (
                      <Col className='w-80'>
                        <Row>
                          <Col className='w-40'>
                            <Form.Group>
                              <Form.Label>Sexo Remitante*</Form.Label>
                              <Form.Control
                                onChange={this.handleChange}
                                value={this.state.senderSex}
                                id='senderSex'
                                as='select'
                                className='mb-3'
                              >
                                <option value='add'>Hombre</option>
                                <option value='minus'>Mujer</option>
                              </Form.Control>
                            </Form.Group>
                          </Col>
                          <Col className='w-40'>
                            <Form.Group>
                              <Form.Label>Sexo Destinatario*</Form.Label>
                              <Form.Control
                                onChange={this.handleChange}
                                value={this.state.receiverSex}
                                id='receiverSex'
                                as='select'
                                className='mb-3'
                              >
                                <option value='add'>Hombre</option>
                                <option value='minus'>Mujer</option>
                              </Form.Control>
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col className='w-40'>
                            <Multi
                              name='senderOrientation'
                              label='Orientacion Remitante'
                              items={Orientation}
                              HandleChange={this.HandleChange}
                            />
                          </Col>
                          <Col className='w-40'>
                            <Multi
                              name='receiverOrientation'
                              label='Orientacion Destinatario'
                              items={Orientation}
                              HandleChange={this.HandleChange}
                            />
                          </Col>
                        </Row>
                      </Col>
                    ) : this.state.profileType === "2" ? (
                      <Col className='w-80'>
                        <Row>
                          <Col className='w-40'>
                            <Multi
                              name='senderPair'
                              label='Parte 1. Pareja Remitante'
                              items={Pair}
                              HandleChange={this.HandleChange}
                            />
                          </Col>
                          <Col className='w-40'>
                            <Multi
                              name='senderPair'
                              label='Parte 2. Pareja Remitante'
                              items={Pair}
                              HandleChange={this.HandleChange}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col className='w-40'>
                            <Multi
                              name='receiverPair'
                              label='Parte 1. Pareja Destinatario'
                              items={Pair}
                              HandleChange={this.HandleChange}
                            />
                          </Col>
                          <Col className='w-40'>
                            <Multi
                              name='receiverPair'
                              label='Parte 2. Pareja Destinatario'
                              items={Pair}
                              HandleChange={this.HandleChange}
                            />
                          </Col>
                        </Row>
                      </Col>
                    ) : null}

                    <Col className='w-80'>
                      <Row>
                        <Col className='w-40'>
                          <Form.Group>
                            <Form.Label>Duracion*</Form.Label>
                            <Form.Control
                              onChange={this.handleChange}
                              value={this.state.duration}
                              id='durationHours'
                              as='select'
                              placeholder='Tiempo de expiracion...'
                            >
                              <option value='24'>1 dia</option>
                              <option value='48'>2 dia </option>
                              <option value='72'>3 dia </option>
                              <option value='96'>4 dia </option>
                              <option value='120'>5 dia </option>
                            </Form.Control>
                          </Form.Group>
                        </Col>
                        {this.state.type == "imagen" ? null : (
                          <Col className='w-40'>
                            <Form.Group>
                              <Form.Label>Tipo de Respuesta*</Form.Label>
                              <Form.Control
                                onChange={this.handleChange}
                                value={this.state.answerType}
                                id='answerType'
                                as='select'
                                className='mb-3'
                              >
                                <option value='add'>Texto</option>
                                <option value='minus'>Imagen</option>
                              </Form.Control>
                            </Form.Group>
                          </Col>
                        )}
                      </Row>
                    </Col>
                    <Col md={8}>
                      <Button variant='danger' type='submit'>
                        ACTUALIZAR
                      </Button>
                    </Col>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddChallenge.propTypes = {
  auth: PropTypes.object.isRequired,
  editCoinsUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});
export default connect(mapStateToProps, { editCoinsUser })(
  withRouter(AddChallenge)
);
