import React, { useEffect, useState } from "react";
import Aux from "../../hoc/_Aux";
import axios from "axios";

import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Row, Col, Card } from "react-bootstrap";

class ArticleBottom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      likeCount: 0,
      commentCount: 0,
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:5000/api/comment/${this.props.articleId}`)
      .then((response) => {
        if (response.data.success) {
          this.setState({ likeCount: response.data.likeCount });
          this.setState({ commentCount: response.data.commentCount });
        } else {
          alert("Couldnt get blog`s lists");
        }
      });
  }

  render() {
    return (
      <Row
        style={{
          marginTop: 45,
          width: "100%",
          display: "flex",
          flexDirection: "row",
          height: 20,
        }}
      >
        <Col style={{ maxWidth: 100, fontSize: 22, color: "blue" }}>
          {this.state.likeCount}
          {"     "}
          <i className='fa fa-heart'></i>
        </Col>
        <Col style={{ maxWidth: 100, fontSize: 22, color: "blue" }}>
          {this.state.commentCount}
          {"     "}
          <i className='fa fa-comment'></i>
        </Col>
      </Row>
    );
  }
}
ArticleBottom.propTypes = {
  getArticle: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
});
export default connect(mapStateToProps)(withRouter(ArticleBottom));
