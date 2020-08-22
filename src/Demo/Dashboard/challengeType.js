import React, { Component } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import "./user.scss";

import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  loadChallengeType,
  selectChallengeType,
  deleteChallengeType,
} from "../../redux/actions/challengeType";

import { Button, Modal, Col } from "react-bootstrap";
class ChallengeType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteShow: false,
      deleted: false,
    };
  }
  componentDidMount() {
    this.props.loadChallengeType();
  }

  componentWillReceiveProps(nextProps) {
    const { deleted } = nextProps.challengeType;
    if (deleted) {
      console.log(`${deleted}`);
      this.setState({ deleted: deleted });
    }
  }

  deleteShow() {
    this.setState({ deleteShow: !this.state.deleteShow });
  }

  render() {
    const { challengeTypes } = this.props.challengeType;
    console.log(this.props.challengeType);
    return (
      <div className='main-content'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='card'>
                <div className='card-header card-header-danger'>
                  <h4 className='card-title '>Listado de Tipo de Retos</h4>
                  <p className='card-category'>
                    Seleccione un campo para editar
                  </p>
                </div>
                <div className='card-body'>
                  <Col md={12}>
                    <Button
                      onClick={() => {
                        this.props.history.push("/challenge/addchallengetype");
                      }}
                      className='btn-danger text-center'
                    >
                      Crear
                    </Button>
                  </Col>
                  <Col>
                    <div className='table-responsive'>
                      <table className='table table-hover'>
                        <thead>
                          <tr>
                            <th>Identificador</th>
                            <th>Título</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {challengeTypes.map((item, index) =>
                            index < 5 ? (
                              <tr key={index}>
                                <td>{item.identifier}</td>
                                <td>{item.name}</td>
                                <td className='td-actions text-right'>
                                  <Tooltip title='editar'>
                                    <button
                                      aria-label='Editar'
                                      onClick={() => {
                                        this.props.selectChallengeType(item);
                                        this.props.history.push(
                                          "/challenge/editchallengetype"
                                        );
                                      }}
                                    >
                                      <i className='material-icons warning'>
                                        edit
                                      </i>
                                    </button>
                                  </Tooltip>
                                  <Tooltip title='Borrar'>
                                    <button
                                      onClick={() => {
                                        this.props.selectChallengeType(item);
                                        this.deleteShow();
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
                <h5 className='subTile'>Ese tipo de reto ha sido borrado</h5>
              </Col>
            ) : (
              <Col md={12} className='text-center'>
                <h4 className='title'>
                  ¿Estas seguro de que quieres borrar este tipo de reto?
                </h4>
                <h5 className='subTitle'>
                  No podrá recuperar los datos borrados
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
                    const { challengeType } = this.props.challengeType;
                    this.props.deleteChallengeType(challengeType);
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

ChallengeType.propTypes = {
  loadChallengeType: PropTypes.func.isRequired,
  selectChallengeType: PropTypes.func.isRequired,
  deleteChallengeType: PropTypes.func.isRequired,
  challengeType: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  challengeType: state.challengeType,
});
export default connect(mapStateToProps, {
  loadChallengeType,
  selectChallengeType,
  deleteChallengeType,
})(withRouter(ChallengeType));
