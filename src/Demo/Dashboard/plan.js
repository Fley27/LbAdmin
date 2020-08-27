import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadPlan, addPlan, selectPlan, deletePlan,editPlan } from "../../redux/actions/plan";

import Aux from "../../hoc/_Aux";
import './card.scss'
import './user.scss'


import { Button, Modal, Row, Form, Col } from "react-bootstrap";
class Plan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteShow: false,
      deleted: false,
      edited: false,
      editShow: false,
      addShow: false,
      added: false,
      title: "",
      duration: "",
      price: "",
      discount: ""
    };
  }

  componentDidMount() {
    this.props.loadPlan();
  }

  componentWillReceiveProps(nextProps) {
    const { deleted, added, edited, card  } = nextProps.plan;
    if (deleted) {
      console.log(`${deleted}`);
      this.setState({ deleted, added, edited, });
      
    }else if (added) {
        console.log(`${added}`);
        this.setState({ deleted, added, edited, });
    }else if (edited) {
        console.log(`${edited}`);
        this.setState({ deleted, added, edited, });
    }else if(card){
      let {discount ,price , duration , title} = card;
      this.setState({discount, price , duration , title});
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addPlan(this.state);
  };

  onEditSubmit = (e) => {
    e.preventDefault();
    const obj = {};
    const {card} = this.props.plan;
    obj.title = this.state.title;
    obj.discount = this.state.discount;
    obj.duration = this.state.duration;
    obj.price = this.state.price;
    obj.id = card._id;
    this.props.editPlan(obj);
  };

  deleteShow() {
    this.setState({ deleteShow: !this.state.deleteShow });
  }

  addShow() {
    this.setState({ addShow: !this.state.addShow });
    console.log("ok")
  }

  editShow() {
    this.setState({editShow: !this.state.editShow });
  }

  show = () =>{
    this.setState({
        deleteShow: false,
        deleted: false,
        edited: false,
        editShow: false,
        addShow: false,
        added: false,
        title: "",
        duration: "",
        price: "",
        discount: ""
      })
  }
  render() {
    const {cards} = this.props.plan;
    console.log(cards);
    return (
      <Aux>
        <Row>
            <Col md = {12}>
                 < Button variant = "danger" onClick = {()=> this.addShow()}  style = {{width: 120, height: 40, borderRadius: 35}} >CREAR</ Button>
            </Col>
            <Col style = {{ margin: "0 auto" , marginTop: 50}} md = {8}>
                {
                    !cards ? (
                        <Col className = 'text-center'>
                            <h4>No hay membresia registradas</h4>
                            <h5>Por favor, de su primer paso</h5>
                        </Col>
                    ):(
                        <div className = "main-content" style = {{display : "flex", flexDirection : "row", flexWrap : "wrap"}}>
                            {
                                cards.map((item, index) => (
                                  <Col key = {index} md = {6} style = {{marginBottom: 15}}>
                                    <div className = "container">
                                      <div className = "header">
                                        <div className = "title">
                                          <h2>{item.title}</h2>
                                        </div>
                                      </div>
                                    <div className = "body">
                                        {
                                          item.discount > 0 ? (
                                            <div className = "info">
                                              <div className = "coins"><h3>{item.duration} {item.duration > 1 ? "Meses" : "Mes" } </h3></div>
                                              <div className = "price">
                                                <span className = "before"><h3>€ {item.price} / mes</h3></span>
                                                <span className = "now"><h3>€ {item.price  -  Math.round(item.price * item.discount / 100) } / mes</h3></span>
                                              </div>
                                            </div>
                                          ): (
                                            <div className = "info">
                                              <div className = "coins"><h3 >{item.duration} {item.duration > 1 ? "Meses" : "Mes" }</h3></div>
                                              <div className = "price">
                                                <span className = "now"><h3>€ {item.price} / mes</h3></span>
                                              </div>
                                            </div>
                                          )
                              }
            
                            </div>
                              <div className = "footer text-center">
                               <Button onClick = {()=> {
                                 this.props.selectPlan(item);
                                 this.deleteShow();
                                 }} variant = "primary">DELETE</Button>
                                <Button onClick = {()=> {
                                  this.props.selectPlan(item)
                                  this.editShow();
                                  }}  variant = "danger">ACTUALIZAR</Button>
                              </div>
                            </div>
                                  </Col>
                                ))
                            }
                        </div>
                    )
                }
            </Col>
        </Row>
        <Modal
          show={this.state.deleteShow}
          onHide={() => {
            this.deleteShow();
          }}
        >
          <Modal.Header className='border'>
            <Col md={12} className='text-center'>
              {this.props.plan.deleted ? (
                <i className='material-icons error-outline'>check_circle</i>
              ) : (
                <i className='material-icons error-outline'>error</i>
              )}
            </Col>
          </Modal.Header>
          <Modal.Body className='border'>
            {this.props.deleted ? (
              <Col md={12} className='text-center'>
                <h4 className='title'>Borrado</h4>
                <h5 className='subTile'>El paquete ha sido borrado</h5>
              </Col>
            ) : (
              <Col md={12} className='text-center'>
                <h4 className='title'>
                  ¿Estas seguro de que quieres borrar este paquete?
                </h4>
                <h5 className='subTitle'>
                  No podrá recuperar los datos borrados
                </h5>
              </Col>
            )}
          </Modal.Body>
          <Modal.Footer className='border'>
            {this.props.plan.deleted ? (
              <div className='container-footer'>
                <Button
                  onClick={() => {
                    this.show();
                    this.props.loadPlan();
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
                    const { card } = this.props.plan;
                    this.props.deletePlan(card);
                  }}
                  className='bottom-danger'
                >
                  Borrar
                </Button>
              </div>
            )}
          </Modal.Footer>
        </Modal>
        <Modal
          show={this.state.editShow}
          onHide={() => {
            this.editShow();
          }}
        >
          <Modal.Header className='border'>
            <Col md={12} className='text-center'>
              <h4>Actualizar ese paquete</h4>
            </Col>
          </Modal.Header>
          <Modal.Body className='border'>
            {this.props.plan.edited ? (
              <Col md={12} className='text-center'>
                <h4 className='title'>Actualizar</h4>
                <h5 className='subTile'>El reto ha sido actualizar</h5>
              </Col>
            ) : (
              <Form onSubmit = {this.onEditSubmit}>
                  <Row> 
                  <Col mb={4}>
                          <Form.Group>
                            <Form.Label>Título*</Form.Label>
                            <Form.Control
                              onChange={this.handleChange}
                              value={this.state.title}
                              id='title'
                              type='text'
                              placeholder='Título...'
                            />
                          </Form.Group>
                        </Col>
                        <Col mb={4}>
                          <Form.Group>
                            <Form.Label>Percentaje de descuento*</Form.Label>
                            <Form.Control
                              onChange={this.handleChange}
                              value={this.state.discount}
                              id='discount'
                              type='number'
                              placeholder='Percentaje de descuento...'
                            />
                          </Form.Group>
                        </Col>
                  </Row>
                  <Row> 
                     <Col>
                         <Form.Group>
                            <Form.Label>Duracion*</Form.Label>
                            <Form.Control
                              onChange={this.handleChange}
                              value={this.state.duration}
                              id='duration'
                              type='number'
                              placeholder='Duracion...'
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                         <Form.Group>
                            <Form.Label>Precio*</Form.Label>
                            <Form.Control
                              onChange={this.handleChange}
                              value={this.state.price}
                              id='price'
                              type='number'
                              placeholder='Precio...'
                            />
                          </Form.Group>
                        </Col>
                  </Row>
                  <Row>
                      <Col md = {12}><Button md = {8} type = "sumit" variant = 'danger'>Actualizar</Button></Col>
                  </Row>
              </Form>
            )}
          </Modal.Body>
          <Modal.Footer className='border'>
            {this.props.plan.edited ? (
              <div className='container-footer'>
                <Button
                  onClick={() => {
                    this.show();
                    this.props.loadPlan();
                  }}
                  className='bottom-danger'
                >
                  Ok
                </Button>
              </div>
            ) : null}
          </Modal.Footer>
        </Modal>
        <Modal
          show={this.state.addShow}
          onHide={() => {
            this.addShow();
          }}
        >
          <Modal.Header className='border'>
            <Col md={12} className='text-center'>
              <h4>Guardar nuevo paquete</h4>
            </Col>
          </Modal.Header>
          <Modal.Body className='border'>
            {this.props.plan.added ? (
              <Col md={12} className='text-center'>
                <h4 className='title'>Guardado</h4>
                <h5 className='subTile'>El reto ha sido guardado</h5>
              </Col>
            ) : (
              <Form onSubmit = {this.onSubmit}>
                  <Row> 
                  <Col mb={4}>
                          <Form.Group>
                            <Form.Label>Título*</Form.Label>
                            <Form.Control
                              onChange={this.handleChange}
                              value={this.state.title}
                              id='title'
                              type='text'
                              placeholder='Título...'
                            />
                          </Form.Group>
                        </Col>
                  </Row>
                  <Row> 
                     <Col>
                         <Form.Group>
                            <Form.Label>Duracion*</Form.Label>
                            <Form.Control
                              onChange={this.handleChange}
                              value={this.state.duration}
                              id='duration'
                              type='number'
                              placeholder='Duracion...'
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                         <Form.Group>
                            <Form.Label>Precio*</Form.Label>
                            <Form.Control
                              onChange={this.handleChange}
                              value={this.state.price}
                              id='price'
                              type='number'
                              placeholder='Precio...'
                            />
                          </Form.Group>
                        </Col>
                  </Row>
                  <Row>
                      <Col md = {12}><Button md = {8} type = "sumit" variant = 'danger'>Guardar</Button></Col>
                  </Row>
              </Form>
            )}
          </Modal.Body>
          <Modal.Footer className='border'>
            {this.props.plan.added ? (
              <div className='container-footer'>
                <Button
                  onClick={() => {
                    this.show();
                    this.props.loadPlan();
                  }}
                  className='bottom-danger'
                >
                  Ok
                </Button>
              </div>
            ) : null}
          </Modal.Footer>
        </Modal>
      </Aux>
    )
}

}

Plan.propTypes = {
  plan: PropTypes.object.isRequired,
  loadPlan: PropTypes.func.isRequired,
  selectPlan: PropTypes.func.isRequired,
  deletePlan:PropTypes.func.isRequired,
  editPlan: PropTypes.func.isRequired,
  addPlan: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  plan: state.plan,
});
export default connect(mapStateToProps, {
  loadPlan,
  selectPlan,addPlan,deletePlan,editPlan
})(withRouter(Plan));


