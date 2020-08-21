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

  componentDidMount() {
    const { users } = this.props.user;
    console.log(`${users}`);
    if (!users) {
      this.props.history.push("/dashboard/default");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.user.user) {
      console.log(`${this.props.user.user}`);
      this.props.history.push("/dashboard/default");
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
    const { user } = this.props.user;
    let coins = user.profile.coins;
    if (this.state.accion === "minus") coins -= this.state.numero;
    else {
      coins = coins * -1;
      let number = this.state.numero * -1;
      coins += number;
      coins = coins * -1;
    }
    console.log(coins);
    const obj = {
      coins: coins,
      params: user._id,
    };
    this.props.editCoinsUser(obj);
  };
  render() {
    const { user } = this.props.user;
    return (
      <Row md={12}>
        <Col md={4}>
          <Card className='left-card'>
            <Col md={12}>{user ? user.profile.name : ""}</Col>
            <Col md={12}>{user ? user.profile.coins : ""}</Col>
          </Card>
        </Col>
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
                      <Col md={12}>
                        <Col md={12}>
                          <h4>
                            Número de monedas: {user ? user.profile.coins : ""}
                          </h4>
                        </Col>
                        <Form onSubmit={this.onSubmit} md={12}>
                          <Row>
                            <Col mb={4}>
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
                                  <option value='minus'>
                                    Sustraer monedas
                                  </option>
                                </Form.Control>
                              </Form.Group>
                            </Col>
                            <Col mb={4}>
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
                            </Col>
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
