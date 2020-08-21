import React from "react";
import Aux from "../../hoc/_Aux";
import axios from "axios";

import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NewStudent from "./newStudent";

import { Col, Modal, Button } from "react-bootstrap";
import Cards from "../../App/components/MainCard";
import Avatar1 from "../../assets/images/user/avatar-1.jpg";
import "./selectStudent.css";

class SelectStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      children: [],
      isHide: true,
    };
  }
  componentDidMount() {
    this.Get();
  }

  Get = () => {
    axios
      .get(
        `http://localhost:5000/api/users/children/${this.props.auth.user.id}`
      )
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.children);
          this.setState({ children: response.data.children });
        } else {
          alert("Couldnt get blog`s lists");
        }
      });
  };

  handleClick = () => {
    this.setState({
      isHide: !this.state.isHide,
    });
    this.Get();
  };

  render() {
    function onclickhref(x) {
      return (window.location.href = x);
    }
    const children = this.state.children;
    return (
      <Aux>
        <Cards title={`Select || Add student `} isOption className='body'>
          <div
            className='add-button'
            onClick={() => {
              this.handleClick();
            }}
          >
            <h3>
              {" "}
              <i class='fa fa-plus'></i>Add new child
            </h3>
          </div>
          <Col className='container'>
            {children.map((child) => (
              <div
                className='profile'
                key={child._id}
                onClick={() => {
                  onclickhref(
                    `/dashboard/pbatchdetails/${child._id}/${this.props.match.params.batch}`
                  );
                }}
              >
                <img
                  className='img-radius'
                  src={Avatar1}
                  alt='Generic placeholder'
                />

                <div className='info'>
                  <h3>{child.name}</h3>
                </div>
              </div>
            ))}
          </Col>
          <Modal
            show={!this.state.isHide}
            onHide={() => {
              this.handleClick();
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title>Greetings</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <NewStudent
                batch={this.props.match.params.batch}
                fees={this.props.match.params.fees}
                coach={this.props.match.params.coach}
                parent={this.props.auth.user.id}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant='secondary'
                onClick={() => {
                  this.handleClick();
                }}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Cards>
      </Aux>
    );
  }
}

SelectStudent.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(withRouter(SelectStudent));
