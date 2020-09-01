import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Col, Button, Form, Row } from "react-bootstrap";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addChallengeSettings, loadChallengeSettings } from "../../redux/actions/challengeSettings";
import Aux from "../../hoc/_Aux";
import Card from "../../App/components/MainCard";

class ChallengeSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moreTimeCost: "",
      otherChallengeCost: "",
      cancelChallengeCost: "",
      isEdited: false
    };
  }

  editShow(){
      const { challengeSettings } = this.props.challengeSettings;
      this.setState({isEdited: !this.state.isEdited})
      if(challengeSettings){
          const { moreTimeCost, otherChallengeCost, cancelChallengeCost} = challengeSettings;
          this.setState({moreTimeCost, otherChallengeCost, cancelChallengeCost})
      }
  }

  componentDidMount(){
    this.props.loadChallengeSettings();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.challengeSettings.added) {
      this.props.history.push("/dashboard/settings");
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
    this.props.addChallengeSettings(this.state);
  };
  render() {
    const { challengeSettings } = this.props.challengeSettings;
   
    console.log(challengeSettings);

    var card = ""; 
    if(challengeSettings !== null && this.state.isEdited === false){
        card = (
          challengeSettings ? (
            <Card title = "Cancelar || Prolongar || Cambiar , Costos" isOption>
              
            <Col md = {12}>
                <Row>
                    <Col md = {6}><h3>Costo de prolongacion de reto</h3></Col>
                    <Col md = {4}><h4>:{"     "}{challengeSettings.moreTimeCost} Libcoins</h4></Col>
                </Row>
            </Col>
            <Col md = {12}>
                <Row>
                    <Col md = {6}><h3>Costo de cancelacion de reto</h3></Col>
                    <Col md = {4}><h4>:{"     "}{challengeSettings.cancelChallengeCost} Libcoins</h4></Col>
                </Row>
            </Col>
            <Col md = {12}>
                <Row>
                    <Col md = {6}><h3>Costo para cambiar de reto</h3></Col>
                    <Col md = {4}><h4>:{"     "}{challengeSettings.otherChallengeCost} Libcoins</h4></Col>
                </Row>
            </Col>
        </Card>
          ): (
              <Col className = 'text-center' md = {12}> 
                <h4>No hay configuarion registrada</h4>
              </Col>
          )
        )
    }else{
      card =  (
          <Card title = "Guadar || Actualizar" isOption>
              <Col className='w-80'>
              <Form onSubmit={this.onSubmit} md={12}>
                <Row>
                  <Col mb={4}>
                    <Form.Group>
                      <Form.Label>Costo para prolongar un reto*</Form.Label>
                      <Form.Control
                        onChange={this.handleChange}
                        value={this.state.moreTimeCost}
                        id='moreTimeCost'
                        type='number'
                        placeholder='Costo para prologar un reto'
                      />
                    </Form.Group>
                  </Col>
                  <Col mb={4}>
                    <Form.Group>
                      <Form.Label>Costo para cambiar reto*</Form.Label>
                      <Form.Control
                        onChange={this.handleChange}
                        value={this.state.otherChallengeCost}
                        id='otherChallengeCost'
                        type='number'
                        placeholder='Costo para pedir otro reto'
                      />
                    </Form.Group>
                  </Col>
                  <Col mb={4}>
                    <Form.Group>
                      <Form.Label>Costo para cancelar reto*</Form.Label>
                      <Form.Control
                        onChange={this.handleChange}
                        value={this.state.cancelChallengeCost}
                        id='cancelChallengeCost'
                        type='number'
                        placeholder='Costo para cancelar reto'
                      />
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
          </Card>
        )
    }
    return (
      <Aux>
          <Col md = {12} >
                <Button onClick = {()=> this.editShow()} style = {{margin: "10px 0"}} variant = "danger"> 
                Change</Button>
         </Col>
          <Col md = {12}>
              {
                  card
              }
          </Col>
      </Aux>
    );
  }
}

ChallengeSettings.propTypes = {
  addChallengeSettings: PropTypes.func.isRequired,
  loadChallengeSettings: PropTypes.func.isRequired,
  challengeSettings: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  challengeSettings: state.challengeSettings,
});
export default connect(mapStateToProps, { addChallengeSettings, loadChallengeSettings })(withRouter(ChallengeSettings));
