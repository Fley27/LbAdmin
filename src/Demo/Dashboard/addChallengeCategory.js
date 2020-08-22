import React, { Component } from "react";

import { Col, Button, Form, Row } from "react-bootstrap";

import "./user.scss";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addChallengeCategory } from "../../redux/actions/challengeCategory";
import { loadChallengeType } from "../../redux/actions/challengeType";
import { uploadImage } from "../../redux/actions/image";
import "./input.css";

class AddChallengeCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: "",
      name: "",
      type: "",
      icon: "",
      text: "",
      file: "",
    };
  }

  componentDidMount() {
    this.props.loadChallengeType();
  }

  componentWillReceiveProps(nextProps) {
    const { challengeCategory } = nextProps.challengeCategory;
    const { upload } = nextProps.image;
    if (!challengeCategory) {
      console.log(`${challengeCategory}`);
      this.setState({
        identifier: "",
        name: "",
        type: "",
        icon: "",
        text: "",
        file: "",
      });
    }
    if (upload) {
      this.setState({ icon: upload.filepath });
    }
  }

  handlefileclick = (e) => {
    this.setState({ icon: null });
    console.log("just logging", e.target.files[0]);
    this.setState({ file: e.target.files[0] });
  };
  handleChange = (e) => {
    console.log(
      "targeting state " + e.target.id + " with value " + e.target.value
    );
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    //  this.props.addChallengeType(this.state);
    console.log(this.state.file);
    const formData = new FormData();
    formData.append("file", this.state.file);
    this.props.uploadImage(formData);
  };

  render() {
    const { challengeTypes } = this.props.challengeType;

    return (
      <div className='main-content w-80'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='card'>
                <div className='card-header card-header-danger'>
                  <h4 className='card-title '>Guadar categoria de reto</h4>
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
                          <Form.Group>
                            <Form.Label>
                              {this.state.icon
                                ? this.state.icon
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
                            <div className='col-auto pl-0'>
                              <div className='question-image-container w-100'>
                                <img
                                  src={this.state.icon}
                                  alt=''
                                  className='question-image'
                                />
                              </div>
                            </div>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className='textarea '>
                        <Col>
                          <Form.Group>
                            <Form.Label>Texto*</Form.Label>
                            <textarea
                              id='text'
                              onChange={this.handleChange}
                              value={this.state.text}
                              rows='8'
                              cols='50'
                            ></textarea>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Col md={8}>
                        <Button variant='danger' type='submit'>
                          GUARDAR
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

AddChallengeCategory.propTypes = {
  addChallengeCategory: PropTypes.func.isRequired,
  loadChallengeType: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  challengeCategory: PropTypes.object.isRequired,
  challengeType: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  challengeCategory: state.challengeCategory,
  challengeType: state.challengeType,
  image: state.image,
});
export default connect(mapStateToProps, {
  addChallengeCategory,
  loadChallengeType,
  uploadImage,
})(withRouter(AddChallengeCategory));
