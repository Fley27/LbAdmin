import React, { Component } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import "./user.scss";

import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  loadUsers,
  selectUser,
  blockUser,
  deleteUser,
} from "../../redux/actions/user";

import { Button, Modal, Col } from "react-bootstrap";
class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blockShow: false,
      deleteShow: false,
      blocked: false,
      deleted: false,
    };
  }
  componentDidMount() {
    this.props.loadUsers();
  }
  onSubmit = (e) => {
    e.preventDefault();
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.deleted) {
      console.log(`${this.props.user}`);
      this.setState({ deleted: nextProps.user.deleted });
    }
    if (nextProps.user.blocked) {
      console.log(`${this.props.user}`);
      this.setState({ blocked: nextProps.user.blocked });
    }
  }

  handleshow() {
    this.setState({ blockShow: !this.state.blockShow });
  }

  deleteShow() {
    this.setState({ deleteShow: !this.state.deleteShow });
  }

  render() {
    const users = this.props.user;
    console.log(users);
    var dateformat = require("dateformat");
    return (
      <div className='main-content'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='card'>
                <div className='card-header card-header-danger'>
                  <h4 className='card-title '>Listado de Usuarios</h4>
                  <p className='card-category'>
                    Seleccione un campo para editar
                  </p>
                </div>
                <div className='card-body'>
                  <div className='table-responsive'>
                    <table className='table table-hover'>
                      <thead>
                        <th>Usuario</th>
                        <th>Genero</th>
                        <th>Orientacion</th>
                        <th>F. Nacimiento</th>
                        <th>Número de Monedas</th>
                        <th></th>
                      </thead>
                      <tbody>
                        {users.users.map((item, index) =>
                          index < 15 ? (
                            <tr key={index}>
                              <td>{item.profile.name}</td>
                              <td>{item.profile.genre}</td>
                              <td>{item.profile.orientation}</td>
                              <td>
                                {dateformat(item.profile.birthdate, "dd/mm/yy")}
                              </td>
                              <td>{item.profile.coins}</td>
                              <td class='td-actions text-right'>
                                <Tooltip title='Añadir/Sustraer monedas'>
                                  <button
                                    onClick={() => {
                                      this.props.selectUser(item);
                                      this.props.history.push(
                                        "/dashboard/addcoins"
                                      );
                                      // onclickhref("/dashboard/addcoins");
                                    }}
                                    aria-label='Añadir/Sustraer monedas'
                                  >
                                    <i class='material-icons warning'>
                                      account_balance_wallet
                                    </i>
                                  </button>
                                </Tooltip>
                                <Tooltip title='Bloquear  '>
                                  <button
                                    aria-label='Bloquear'
                                    onClick={() => {
                                      this.handleshow();
                                      this.props.selectUser(item);
                                    }}
                                  >
                                    <i class='material-icons danger'>block</i>
                                  </button>
                                </Tooltip>
                                <Tooltip title='Bloquear'>
                                  <button
                                    onClick={() => {
                                      this.deleteShow();
                                      this.props.selectUser(item);
                                    }}
                                    aria-label='Borrar'
                                  >
                                    <i class='material-icons danger'>close</i>
                                  </button>
                                </Tooltip>
                              </td>
                            </tr>
                          ) : null
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          show={this.state.blockShow}
          onHide={() => {
            this.handleshow();
          }}
        >
          <Modal.Header className='border'>
            <Col md={12} className='text-center'>
              {this.state.deleted ? (
                <i className='material-icons error-outline'>check_circle</i>
              ) : (
                <i className='material-icons error-outline'>error</i>
              )}
            </Col>
          </Modal.Header>
          <Modal.Body className='border'>
            <Col md={12} className='text-center'></Col>
            {this.state.blocked ? (
              <Col md={12} className='text-center'>
                <h4 className='title'>Bloqueado</h4>
                <h5 className='subTile'>El usuario ha sido bloqueado</h5>
              </Col>
            ) : (
              <Col md={12} className='text-center'>
                <h4 className='title'>¿Desea bloquear el usuario?</h4>
              </Col>
            )}
          </Modal.Body>
          <Modal.Footer className='border'>
            {this.state.blocked ? (
              <div className='container-footer'>
                <Button
                  onClick={() => {
                    this.handleshow();
                  }}
                  className='bottom-danger'
                >
                  Ok
                </Button>
              </div>
            ) : (
              <div className='container-footer'>
                <Button
                  className='bottom-primary'
                  onClick={() => {
                    this.handleshow();
                  }}
                >
                  No Bloquear
                </Button>
                <Button
                  onClick={() => {
                    const { user } = this.props.user;
                    this.props.blockUser(user);
                  }}
                  className='bottom-danger'
                >
                  Bloquear
                </Button>
              </div>
            )}
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.deleteShow}
          onHide={() => {
            this.deleteShow();
          }}
        >
          <Modal.Header className='border'>
            <Col md={12} className='text-center'>
              {this.state.deleted ? (
                <i className='material-icons error-outline'>check_circle</i>
              ) : (
                <i className='material-icons error-outline'>error</i>
              )}
            </Col>
          </Modal.Header>
          <Modal.Body className='border'>
            {this.state.deleted ? (
              <Col md={12} className='text-center'>
                <h4 className='title'>Borrado</h4>
                <h5 className='subTile'>El usuario ha sido borrado</h5>
              </Col>
            ) : (
              <Col md={12} className='text-center'>
                <h4 className='title'>
                  ¿Estas seguro de que quieres borrar este usuario?
                </h4>
                <h5 className='subTitle'>
                  No podrá recuperar los usuarios borrados
                </h5>
              </Col>
            )}
          </Modal.Body>
          <Modal.Footer className='border'>
            {this.state.deleted ? (
              <div className='container-footer'>
                <Button
                  onClick={() => {
                    this.deleteShow();
                  }}
                  className='bottom-danger'
                >
                  Ok
                </Button>
              </div>
            ) : (
              <div className='container-footer'>
                <Button
                  className='bottom-primary'
                  onClick={() => {
                    this.deleteShow();
                  }}
                >
                  No Borrar
                </Button>
                <Button
                  onClick={() => {
                    const { user } = this.props.user;
                    this.props.deleteUser(user);
                  }}
                  className='bottom-danger'
                >
                  Borrar
                </Button>
              </div>
            )}
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

User.propTypes = {
  auth: PropTypes.object.isRequired,
  loadUsers: PropTypes.func.isRequired,
  selectUser: PropTypes.func.isRequired,
  blockUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});
export default connect(mapStateToProps, {
  loadUsers,
  selectUser,
  blockUser,
  deleteUser,
})(withRouter(User));
