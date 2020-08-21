import React, { useEffect, useState } from "react";
import Aux from "../../hoc/_Aux";
import axios from "axios";

import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Row, Col, Card } from "react-bootstrap";
import Cards from "../../App/components/MainCard";

class BatchInBranch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      batches: [],
    };
  }
  componentDidMount() {
    axios
      .get(
        `http://localhost:5000/api/branch/viewbatchesbybrach/${this.props.match.params.id}/${this.props.match.params.name}`
      )
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.batches);
          this.setState({ batches: response.data.batches });
        } else {
          alert("Couldnt get blog`s lists");
        }
      });
  }

  render() {
    function onclickhref(x) {
      return (window.location.href = x);
    }
    const batches = this.state.batches;
    return (
      <Aux>
        <Cards title={`You are browsing ${this.props.match.params.name}`}>
          <Row md={12}>
            {batches.map((branch) => (
              <Col
                md={6}
                key={branch._id}
                style={{ width: "100% !important", marginBottom: 15 }}
              >
                <Card
                  className='text-center'
                  style={{
                    padding: 15,
                    heigth: 100,
                    display: "flex",
                    backgroundColor: "#d6d6d6",
                    justifyContent: "center",
                    borderRadius: 15,
                  }}
                  onClick={() => {
                    onclickhref(`/dashboard/detailssubscribe/${branch._id}`);
                  }}
                >
                  <h3>Batch name : {branch.batchname}</h3>
                </Card>
              </Col>
            ))}
          </Row>
        </Cards>
      </Aux>
    );
  }
}

BatchInBranch.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(withRouter(BatchInBranch));
