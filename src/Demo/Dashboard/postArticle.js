import React, { useEffect, useState } from "react";
import Aux from "../../hoc/_Aux";
import axios from "axios";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Row, Card } from "react-bootstrap";
import PostArticleBottom from "./postArticleBottom";

class PostArcticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
    };
  }
  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    console.log(id);
    axios
      .get(`https://mighty-ridge-28744.herokuapp.com/api/blog/getPost/${id}`)
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.post);
          this.setState({ post: response.data.post });
        } else {
          alert("Couldnt get the post");
        }
      });
  }

  render() {
    return (
      <Aux>
        <Row
          className='row'
          style={{
            margin: "0 auto",
            textAlign: "justify",
          }}
        >
          <Card>
            <div
              style={{ padding: 15 }}
              dangerouslySetInnerHTML={{ __html: this.state.post.content }}
            />
            <PostArticleBottom articleId={this.props.match.params.id} />
          </Card>
        </Row>
      </Aux>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
  articles: state.article,
});
export default connect(mapStateToProps)(withRouter(PostArcticle));
