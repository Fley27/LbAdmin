import React, { Component } from "react";

import { Col, Button, Form, Row } from "react-bootstrap";

import "./user.scss";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editChallengeCategory,  } from "../../redux/actions/challengeCategory";
import { loadChallengeType } from "../../redux/actions/challengeType";
import { uploadImage } from "../../redux/actions/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./input.css";

class EditChallengeCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: "",
      name: "",
      type: "",
      icon: "",
      text: "",
      file: null,
      filename: "",
      isEdited: false
    };
  }

  componentDidMount() {
    this.props.loadChallengeType();
    const {challengeCategory} = this.props.challengeCategory;
    if(!challengeCategory) return this.props.history.push("/dashboard");
    const {identifier, name } = challengeCategory;
    this.setState({identifier, name});
    if(challengeCategory.categoryType){
      const {categoryType} = challengeCategory;
      const {type, text, icon} = categoryType;
      this.setState({type,text, icon});
    }
  }

  componentWillReceiveProps(nextProps) {
    const { challengeCategory } = nextProps.challengeCategory;
    const { upload } = nextProps.image;
    if(challengeCategory.success){
        if (challengeCategory) {
            console.log(`${challengeCategory}`);
            this.setState({
              identifier: "",
              name: "",
              type: "",
              icon: "",
              text: "",
              file: null,
              filename: "",
              isEdited: false
            });
            this.props.history.push("/dashboard/challengeCategory")
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
        this.setState({isEdited : false});
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
    if (upload) {
      this.setState({ icon: upload.filepath, filename: upload.filename  });
    }
  }

  handlefileclick = (e) => {
    this.setState({ icon: null });
    console.log("just logging", e.target.files[0]);
    this.setState({ file: e.target.files[0] });
    console.log(this.state.file);
    const formData = new FormData();
    formData.append("file", e.target.files[0] );
    this.props.uploadImage(formData);
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { challengeCategory} = this.props.challengeCategory;
   let  challengeCategoryData = {}, challengeCategoryTypeData = {};

   challengeCategoryData.identifier = this.state.identifier;
   challengeCategoryData.name = this.state.name;

   challengeCategoryTypeData.icon = this.state.icon;
   challengeCategoryTypeData.text = this.state.text;
   challengeCategoryTypeData.type = this.state.type;

   let obj = {};
   obj.id = challengeCategory._id;
   obj.challengeCategoryData = challengeCategoryData;
   obj.challengeCategoryTypeData = challengeCategoryTypeData ;
     this.props.editChallengeCategory(obj);
     this.setState({isEdited: true})
  };

  render() {
    const { challengeTypes } = this.props.challengeType;
    return (
      <div className='main-content w-80'>
        <ToastContainer />
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='card'>
                <div className='card-header card-header-danger'>
                  <h4 className='card-title '>Actualizar categoria de reto</h4>
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
                      <Row>
                        <Col mb={4}>
                          <Form.Group>
                            <Form.Label>Tipologia*</Form.Label>
                            <Form.Control
                              onChange={this.handleChange}
                              value={this.state.type}
                              id='type'
                              as='select'
                            >
                              <option value=''>
                                Seleccionar un tipo de reto
                              </option>
                              {challengeTypes.map(({ _id, name }) => (
                                <option value={_id}>{name}</option>
                              ))}
                            </Form.Control>
                          </Form.Group>
                        </Col>
                        <Col className='w-40'>
                          <Row>
                            <Col>
                            <Form.Group>
                            <Form.Label>
                              {this.state.filename
                                ? this.state.filename
                                : "Imagen del reto"}
                            </Form.Label>
                            <label
                              htmlFor='icon'
                              className='custom-file-upload'
                            >
                              <i className='material-icons '>attach_file</i>
                            </label>
                            <input
                              onChange={this.handlefileclick}
                              id='icon'
                              type='file'
                            />
                          </Form.Group>
                            </Col>
                            <Col>
                            <div style = {{height : 50, width: 50, borderRadius: 5, marginTop: 0, boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"}}>
                                <div style = {{overflow: "hidden" , height : 50, width: 50}} className='image-container w-auto'>
                                  <img src={this.state.icon} alt='' style = {{height : 50, width: 50}} />
                                </div>
                            </div>
                            </Col>
                          </Row>
                          </Col>
                      </Row>
                      <Row className='textarea '>
                        <Col>
                          <Form.Group>
                            <Form.Label>Texto*</Form.Label>
                            <Form.Control
                              id='text'
                              onChange={this.handleChange}
                              value={this.state.text}
                              as = "textarea"
                              rows='8'
                              cols='50'
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
    );
  }
}

EditChallengeCategory.propTypes = {
  editChallengeCategory: PropTypes.func.isRequired,
  loadChallengeType: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  challengeCategory: PropTypes.object.isRequired,
  challengeType: PropTypes.object.isRequired,
  alert: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  challengeCategory: state.challengeCategory,
  challengeType: state.challengeType,
  image: state.image,
  alert: state.alert
});

export default connect(mapStateToProps, {
  editChallengeCategory,
  loadChallengeType,
  uploadImage,
})(withRouter(EditChallengeCategory));
