import React, { Component } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import "./user.scss";

import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadUsers, selectUser } from "../../redux/actions/user";

import { Button, Modal, Col } from "react-bootstrap";
class Challenge extends Component {
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
                  <h4 className='card-title '>Listado de Retos</h4>
                  <p className='card-category'>
                    Seleccione un campo para editar
                  </p>
                </div>
                <div className='card-body'>
                  <Col md={12}>
                    <Button
                      onClick={() => this.props.history.push("/dashboard/user")}
                      style={{ float: "right", height: 40 }}
                      variant='danger text-center'
                    >
                      Crear
                    </Button>
                  </Col>
                  <Col>
                    <div className='table-responsive'>
                      <table className='table table-hover'>
                        <thead>
                          <tr>
                            <th>Título</th>
                            <th>Categoría</th>
                            <th>Tipología</th>
                            <th>Coste</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.users.map((item, index) =>
                            index < 15 ? (
                              <tr key={index}>
                                <td>{item.profile.name}</td>
                                <td>{item.profile.orientation}</td>
                                <td>
                                  {dateformat(
                                    item.profile.birthdate,
                                    "dd/mm/yy"
                                  )}
                                </td>
                                <td>{item.profile.coins}</td>
                                <td className='td-actions text-right'>
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
                                      <i className='material-icons warning'>
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
                                      <i className='material-icons danger'>
                                        block
                                      </i>
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
                                      <i className='material-icons danger'>
                                        close
                                      </i>
                                    </button>
                                  </Tooltip>
                                </td>
                              </tr>
                            ) : null
                          )}
                        </tbody>
                      </table>
                    </div>
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

Challenge.propTypes = {
  auth: PropTypes.object.isRequired,
  loadUsers: PropTypes.func.isRequired,
  selectUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});
export default connect(mapStateToProps, {
  loadUsers,
  selectUser,
})(withRouter(Challenge));
