import React, { Component } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import "./user.scss";

import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  loadChallengeCategory,
  selectChallengeCategory,
  deleteChallengeCategory,
} from "../../redux/actions/challengeCategory";

import { Button, Modal, Col } from "react-bootstrap";
class ChallengeCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteShow: false,
      deleted: false,
    };
  }
  componentDidMount() {
    this.props.loadChallengeCategory();
  }

  componentWillReceiveProps(nextProps) {
    const { deleted } = nextProps.challengeCategory;
    if (deleted) {
      console.log(`${deleted}`);
      this.setState({ deleted: deleted });
    }
  }

  deleteShow() {
    this.setState({ deleteShow: !this.state.deleteShow });
  }

  render() {
    const { challengeCategories } = this.props.challengeCategory;
    console.log(this.props.challengeCategory);
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
                        this.props.history.push("/challenge/addchallengecategoria");
                      }}
                      className='btn-danger text-center'
                    >
                      Crear
                    </Button>
                  </Col>
                  <Col>
                    {challengeCategories ? (
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
                            {challengeCategories.map((item, index) =>
                              index < 5 ? (
                                <tr key={index}>
                                  <td>{item.identifier}</td>
                                  <td>{item.name}</td>
                                  <td className='td-actions text-right'>
                                    <Tooltip title='Borrar'>
                                      <button
                                        onClick={() => {
                                          this.props.selectChallengeCategory(
                                            item
                                          );
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
                    ) : (
                      <Col className='text-center'>
                        <p>
                          <strong>Challenge Category's list is empty</strong>
                        </p>
                      </Col>
                    )}
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
                <h5 className='subTile'>Ha sido borrado</h5>
              </Col>
            ) : (
              <Col md={12} className='text-center'>
                <h4 className='title'>
                  ¿Estas seguro de que quieres borrar esta categoria?
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
                    const { challengeCategory } = this.props.challengeCategory;
                    this.props.deleteChallengeCategory(challengeCategory);
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

ChallengeCategory.propTypes = {
  loadChallengeCategory: PropTypes.func.isRequired,
  selectChallengeCategory: PropTypes.func.isRequired,
  deleteChallengeCategory: PropTypes.func.isRequired,
  challengeCategory: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  challengeCategory: state.challengeCategory,
});
export default connect(mapStateToProps, {
  loadChallengeCategory,
  selectChallengeCategory,
  deleteChallengeCategory,
})(withRouter(ChallengeCategory));
