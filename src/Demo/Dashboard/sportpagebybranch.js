import React from "react";
import Aux from "../../hoc/_Aux";
import axios from "axios";

import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Col, Card } from "react-bootstrap";
import Cards from "../../App/components/MainCard";
import FootBall from "../../assets/images/Foot-Ball.jpg";
import BasketBall from "../../assets/images/Basket-Ball.jpg";
import Tennis from "../../assets/images/tenis.jpg";
import Cricket from "../../assets/images/cricket.jpg";
import Hockey from "../../assets/images/hockey.jpg";

class SportBranch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sports: [],
    };
  }
  componentDidMount() {
    axios
      .get(
        `http://localhost:5000/api/branch/viewsportbybranch/${this.props.match.params.id}`
      )
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.sports);
          this.setState({ sports: response.data.sports });
        } else {
          alert("Couldnt get blog`s lists");
        }
      });
  }

  render() {
    function onclickhref(x) {
      return (window.location.href = x);
    }
    const sports = this.state.sports;
    return (
      <Aux>
        <Cards
          title={`You are browsing ${this.props.match.params.name} `}
          isOption
        >
          <Col
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {sports.map((sport) => (
              <Card
                key={sport._id}
                style={{
                  padding: 15,
                  margin: "20px",
                  width: "45% ",
                  minWidth: "300px",
                  height: "150px",
                  backgroundColor: "#d6d6d6",
                  border: 0,
                  borderRadius: 10,
                  background: `linear-gradient(to left top, rgb(0, 0, 0, 0.7), rgba(202, 72, 72, 0.5)), url(${
                    sport.sport === "Foot-Ball"
                      ? FootBall
                      : sport.sport === "Basket-Ball"
                      ? BasketBall
                      : sport.sport === "Tennis"
                      ? Tennis
                      : sport.sport === "Cricket"
                      ? Cricket
                      : Hockey
                  })`,
                  backgroundSize: "cover",
                }}
                className='text-center '
                onClick={() => {
                  onclickhref(
                    `/dashboard/batch-sports/${sport.ref_branchid}/${sport.sport}`
                  );
                }}
              >
                <h3
                  style={{
                    lineHeight: "150px",
                    color: "#ffffff",
                    fontSize: "22px",
                    letterSpacing: "3px",
                    margin: "auto",
                  }}
                >
                  {sport.sport}
                </h3>
              </Card>
            ))}
          </Col>
        </Cards>
      </Aux>
    );
  }
}

SportBranch.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(withRouter(SportBranch));
