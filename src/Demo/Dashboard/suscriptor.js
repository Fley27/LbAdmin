import React from "react";
import Aux from "../../hoc/_Aux";
import axios from "axios";

import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Row, Col, Card } from "react-bootstrap";
import Cards from "../../App/components/MainCard";

class Subscriptor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      branches: [],
    };
  }
  componentDidMount() {
    axios
      .get(`http://localhost:5000/api/branch/city/${this.props.auth.user.city}`)
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.branches);
          this.setState({ branches: response.data.branches });
        } else {
          alert("Couldnt get blog`s lists");
        }
      });
  }

  render() {
    function onclickhref(x) {
      return (window.location.href = x);
    }
    const branches = this.state.branches;
    return (
      <Aux>
        <Cards
          title={`All branches inside ${this.props.auth.user.city}`}
          isOption
        >
          <Row md={12}>
            {branches.map((branch) => (
              <Col
                md={6}
                key={branch._id}
                style={{ width: "100% !important", marginBottom: 15 }}
              >
                <Card
                  style={{
                    padding: 15,
                    heigth: 100,
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 15,
                  }}
                  onClick={() => {
                    onclickhref(
                      `/dashboard/sportbybranch/${branch._id}/${branch.branchname}`
                    );
                  }}
                >
                  <h3>Branch name : {branch.branchname}</h3>
                  <h4>Contact : {branch.branchcontact}</h4>
                </Card>
              </Col>
            ))}
          </Row>
        </Cards>
      </Aux>
    );
  }
}

Subscriptor.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(withRouter(Subscriptor));
