import React, { Component } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import "./user.scss";

import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadChallenge, selectChallenge, deleteChallenge } from "../../redux/actions/challenge";

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
    this.props.loadChallenge();
  }

  componentWillReceiveProps(nextProps) {
    const { deleted } = nextProps.challenge;
    if (deleted) {
      console.log(`${deleted}`);
      this.setState({ deleted: deleted });
      this.props.loadChallenge();
    }
  }

  deleteShow() {
    this.setState({ deleteShow: !this.state.deleteShow });
  }


  render() {
    const {challenges} = this.props.challenge;
    console.log(challenges);
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
                      onClick={() => {
                        this.props.selectChallenge(null)
                        this.props.history.push("/dashboard/addchallenge")
                      }}
                      variant='danger text-center'
                    >
                      Crear
                    </Button>
                  </Col>
                  {
                    challenges ? (
                      <Col>
                    <div className='table-responsive'>
                      <table className='table table-hover'>
                        <thead>
                          <tr>
                            <th>Título</th>
                            <th>Categoría</th>
                            <th>Tipología</th>
                            <th>Coste</th>
                            <th>Temporizador</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {challenges.map((item, index) =>
                            index < 15 ? (
                              <tr key={index}>
                                <td>{item.title}</td>
                                <td>{item.category.name}</td>
                                <td>
                                  {
                                    item.type.name
                                  }
                                </td>
                                <td>{item.cost}</td>
                                <td>{item.DurationHours}</td>
                                <td className='td-actions text-right'>
                                  <Tooltip title='Borrar'>
                                    <button
                                      onClick={() => {
                                        this.deleteShow();
                                        this.props.selectChallenge(item);
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
                    ):(
                      <Col className='text-center'>
                        <p><strong>The challenge's list is empty</strong></p>
                      </Col>
                    )
                  }
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
                <h5 className='subTile'>El reto ha sido borrado</h5>
              </Col>
            ) : (
              <Col md={12} className='text-center'>
                <h4 className='title'>
                  ¿Estas seguro de que quieres borrar este reto?
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
                    const { challenge } = this.props.challenge;
                    this.props.deleteChallenge(challenge);
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
      </div>
    );
  }
}

Challenge.propTypes = {
  challenge: PropTypes.object.isRequired,
  loadChallenge: PropTypes.func.isRequired,
  selectChallenge: PropTypes.func.isRequired,
  deleteChallenge:PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  challenge: state.challenge,
});
export default connect(mapStateToProps, {
  loadChallenge,
  selectChallenge,deleteChallenge
})(withRouter(Challenge));
