import React, { Component } from "react";
import { Col, Button, Form, Row } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editChallenge } from "../../redux/actions/challenge";
import { loadChallengeCategory } from "../../redux/actions/challengeCategory";
import { loadChallengeType } from "../../redux/actions/challengeType";
import { uploadImage } from "../../redux/actions/image";
import Multi from "../Forms/multiSelect";
import { Orientation, Pair } from "../data/data";
import AddChallengeAnswer from "./addChallengeAnswer";
import "./user.scss";


class EditChallenge extends Component {
  constructor(props) {
    super(props);
    this.state = {
        title: "",
        description: "",
        cost: "",
        category: "",
        type: "",
        appUsage: "Citas Reales",
        profileType: "",
        senderSex: "",
        receiverSex: "",
        answers: [{ index: Math.random(), image: "", description: "", placeholder : "" }],
        senderOrientation: [],
        receiverOrientation: [],
        senderPair: [],
        receiverPair: [],
        answerType: "Texto",
        filename: "",
        DurationHours: "",
    };
  }

  componentDidMount() {
    this.props.loadChallengeType();
    this.props.loadChallengeCategory();
    const { challenge} = this.props.challenge;

    if (!challenge) return this.props.history.push("/dashboard/default");
    else {
      let { title,description, cost , category, type ,appUsage,answers
        ,DurationHours, profileType, answerType } = challenge;

    
        if(profileType === "Soltero"){
            const {challengeIndividual} = challenge;
            let {senderSex,receiverSex} = challengeIndividual;
            this.setState({senderSex,receiverSex});
        }

        this.setState({category: category._id, type: type._id});

        this.setState({ title,description, cost ,profileType,appUsage,DurationHours, answerType});
        let tempAnswer = [];

        answers.map((answer, index) =>{
            let obj = {};
            obj.index = index;
            obj.image = answer.image;
            obj.description = "";
            obj.placeholder = answer.description;
            tempAnswer.push(obj);
        })

        this.setState({answers: tempAnswer});
    }
  }

  componentWillReceiveProps(nextProps) {
    const { challenge } = nextProps.challenge;
    if (challenge.success) {
      console.log(`${challenge}`);
      if(challenge){
        this.setState({
            description: "",
            cost: "",
            category: "",
            type: "",
            appUsage: "Citas Reales",
            profileType: "",
            senderSex: "",
            receiverSex: "",
            answers: [{ index: Math.random(), id: "", image: "", description: "" }],
            senderOrientation: [],
            receiverOrientation: [],
            senderPair: [],
            receiverPair: [],
            answerType: "Texto",
            filename: "",
            DurationHours: "",
          });

          this.props.history.push("/dashboard/challenge")
      }
    }
    const { upload } = nextProps.image;
    if (upload) {
      this.setState({  filename: upload.filename  });
    }
  }

  

  handleChange = (e) => {
    console.log(
      "targeting state " + e.target.id + " with value " + e.target.value
    );
    this.setState({ [e.target.id]: e.target.value });
  };

  HandleChange = (newValue = null, actionMeta = null) => {
    console.group("Value Changed");
    this.setState({ [actionMeta.name]: newValue});
    console.groupEnd();
  };

  onSubmit = (e) => {
    e.preventDefault();

    const {challenge} = this.props.challenge;
    var RO = [], SO = [], SP = [], RP = [];

    let challengeAnswerData = this.state.answers;
    let obj   = {};
    obj.title = this.state.title;
    obj.cost = this.state.cost;
    obj.description = this.state.description;
    obj.appUsage = this.state.appUsage;
    obj.profileType = this.state.profileType;
    obj.answerType = this.state.answerType;
    obj.DurationHours = this.state.DurationHours;
    obj.category = this.state.category;
    obj.type = this.state.type;

    let challengeData = obj;

    obj = {};

    obj.senderSex = this.state.senderSex;
    obj.receiverSex = this.state.receiverSex;

    this.state.senderOrientation.map(item=>{
      SO.push(item.value);
    })

    this.state.receiverOrientation.map(item=>{
      RO.push(item.value);
      console.log(item);
    })

    obj.senderOrientation = SO;
    obj.receiverOrientation = RO;

    let challengeIndividualData = obj;

    obj = {};
    this.state.senderPair.map(item=>{
      SP.push(item.value);
      console.log(item);
    })
    this.state.receiverPair.map(item=>{
      SP.push(item.value);
      console.log(item);
    })
    obj.senderPair = SP;
    obj.receiverPair = RP;

    let challengePairData = obj;

    obj = {};
    obj.id = challenge._id;
    obj.challengeData = challengeData;
    obj.challengeAnswerData = challengeAnswerData;
    obj.challengeIndividualData = challengeIndividualData;
    obj.challengePairData = challengePairData;

    this.props.editChallenge(obj);
  };



  Change = (e) => {
    if ([ "description"].includes(e.target.name)) {
      let answers = [...this.state.answers];
      console.log("just logging");
      answers[e.target.dataset.id][e.target.name] = e.target.value;
    } else if (["image"].includes(e.target.name)) {
      console.log("just logging");
      const formData = new FormData();
      formData.append("file", e.target.files[0] );
      this.props.uploadImage(formData);
    console.log(`https://libidoonbackend.herokuapp.com/${e.target.files[0].name}`);
      let answers = [...this.state.answers];
      answers[e.target.dataset.id][e.target.name] = `https://libidoonbackend.herokuapp.com/${e.target.files[0].name}`;
    } 
  }

  addNewRow = (e) => {
    if (this.state.answers.length < 6) {
      this.setState((prevState) => ({
        answers: [
          ...prevState.answers,
          {
            index: Math.random(),
            image: "",
            description: "",
          },
        ],
      }));
    }
  };

  deteteRow = (index) => {
    this.setState({
      answers: this.state.answers.filter((s, sindex) => index !== sindex),
    });
  };

  clickOnDelete(record) {
    this.setState({
      answers: this.state.answers.filter((r) => r !== record),
    });
  }

  render() {
    const { challengeTypes } = this.props.challengeType;
    const { challengeCategories } = this.props.challengeCategory;
    const {challenge} = this.props.challenge;
    console.log(challenge);
    console.log(challengeCategories)
    console.log(this.state.answers.map(item=>item.description));
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
                              {challengeCategories ? (
                                challengeCategories.map((item, index) => (
                                  <option value={item._id}>{item.name}</option>
                                ))
                              ): null}
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
                              {challengeTypes ? (
                                challengeTypes.map((item , index) => (
                                  <option value={item._id}>{item.name}</option>
                                ))
                              ): null}
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
                              <option value='Citas Reales'>Citas Reales</option>
                              <option value='Ciber Sexo'>Ciber Sexo</option>
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
                                Seleccionar un tipo de prefil
                              </option>
                              <option value='Soltero'>Soltero</option>
                              <option value='Pareja'>Pareja</option>
                            </Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                    {this.state.profileType === "Soltero" ? (
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
                              <option value=''>
                              Selecciona
                            </option>
                                <option value='Hombre'>Hombre</option>
                                <option value='Mujer'>Mujer</option>
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
                                <option value=''>
                                   Selecciona
                                </option>
                                <option value='Hombre'>Hombre</option>
                                <option value='Mujer'>Mujer</option>
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
                    ) : this.state.profileType === "Pareja" ? (
                      <Col className='w-80'>
                        <Row>
                          <Col className='w-40'>
                            <Multi
                              name='senderPair'
                              label='Pareja Remitante'
                              items={Pair}
                              HandleChange={this.HandleChange}
                            />
                          </Col>
                          <Col className='w-40'>
                            <Multi
                              name='receiverPair'
                              label='Pareja Destinatario'
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
                            <Form.Label>Temporizador*</Form.Label>
                            <Form.Control
                              onChange={this.handleChange}
                              value={this.state.DurationHours}
                              id='DurationHours'
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
                                <option value='Texto'>Texto</option>
                                <option value='Imagen'>Imagen</option>
                              </Form.Control>
                            </Form.Group>
                          </Col>
                        )}
                      </Row>
                    </Col>
                    <Col>
                      <Row className='textarea '>
                        <Col>
                          <Form.Group>
                            <Form.Label>Descripcion  del reto*</Form.Label>
                            <Form.Control
                              id='description'
                              onChange={this.handleChange}
                              value={this.state.description}
                              as = "textarea"
                              rows='8'
                              cols='50'
                           />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                    {
                     challengeTypes.map(item=> {
                         if(this.state.type === item._id){
                             if(item.name === "Tipo Pregunta"){
                                return(
                              <Col>
                                <Col>
                                  <h4><strong>Agrega las respuestas del reto</strong></h4>
                                </Col>
                              <Col>
                                  <AddChallengeAnswer
                                     add={this.addNewRow.bind(this)}
                                     delete={this.clickOnDelete.bind(this)}
                                     HandleChange={this.Change}
                                     type = {this.state.answers}
                                     answers={this.state.answers}
                                  />
                              </Col>
                              </Col>
                                )
                             }
                         }
                     })
                    }
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

EditChallenge.propTypes = {
  challengeType: PropTypes.object.isRequired,
  challengeCategory: PropTypes.object.isRequired,
  challenge: PropTypes.object.isRequired,
  image: PropTypes.object.isRequired,
  uploadImage: PropTypes.func.isRequired,
  editChallenge: PropTypes.func.isRequired,
  loadChallengeCategory: PropTypes.func.isRequired,
  loadChallengeType: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  challengeType: state.challengeType,
  challengeCategory: state.challengeCategory,
  image: state.image,
  challenge: state.challenge
});
export default connect(mapStateToProps, { editChallenge, loadChallengeCategory, loadChallengeType, uploadImage, })(
  withRouter(EditChallenge)
);