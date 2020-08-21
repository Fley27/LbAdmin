import React from "react";
import Aux from "../../hoc/_Aux";
import axios from "axios";

import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Row, Col, Button, Form, Card } from "react-bootstrap";
import Cards from "../../App/components/MainCard";

class BatchDetailsSuscribe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      batches: [],
      user: {},
    };
  }
  componentDidMount() {
    axios
      .get(
        `http://localhost:5000/api/branch/batch/${this.props.match.params.id}`
      )
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.user);
          this.setState({ user: response.data.coach });
          this.setState({ batches: response.data.batch });
        } else {
          alert("Couldnt get blog`s lists");
        }
      });
  }

  render() {
    function onclickhref(x) {
      return (window.location.href = x);
    }
    const batch = this.state.batches;
    return (
      <Aux>
        <Cards title={`You browse ${this.state.batches.batchname}`}>
          <Col sm={12} style={{ width: "100% !important", marginBottom: 15 }}>
            <Card
              style={{
                padding: 15,
                heigth: 100,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Col
                style={{
                  padding: 15,
                  heigth: 100,
                  display: "flex",
                  flexDirection: "row",
                }}
                sm={8}
              >
                <h4
                  style={{
                    width: 220,
                  }}
                >
                  Sport{" "}
                </h4>
                <h4>{batch.sport}</h4>
              </Col>
              <Col
                style={{
                  padding: 15,
                  heigth: 100,
                  display: "flex",
                  flexDirection: "row",
                }}
                sm={8}
              >
                <h4
                  style={{
                    width: 220,
                  }}
                >
                  Coach{" "}
                </h4>
                <h4>{this.state.user.name}</h4>
              </Col>
              <Col
                style={{
                  padding: 15,
                  heigth: 100,
                  display: "flex",
                  flexDirection: "row",
                }}
                sm={8}
              >
                <h4
                  style={{
                    width: 220,
                  }}
                >
                  Fees{" "}
                </h4>
                <h4 sm={4}>{batch.standardfee}</h4>
              </Col>
              <Col
                style={{
                  padding: 15,
                  display: "flex",
                  flexDirection: "row",
                }}
                sm={8}
              >
                <h4
                  style={{
                    width: 220,
                  }}
                >
                  Description{" "}
                </h4>
                <h4>{batch.batchdescription}</h4>
              </Col>

              <Col md={12}>
                <Button
                  onClick={() => {
                    onclickhref(
                      `/dashboard/studentselect/${batch._id}/${batch.standardfee}/${this.state.user._id}`
                    );
                  }}
                  variant='dark'
                  md={6}
                >
                  Subscribe
                </Button>
              </Col>
            </Card>
          </Col>
        </Cards>
      </Aux>
    );
  }
}

BatchDetailsSuscribe.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(withRouter(BatchDetailsSuscribe));
