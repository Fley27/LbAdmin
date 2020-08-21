import React, { useEffect, useState } from "react";
import Aux from "../../hoc/_Aux";
import axios from "axios";

import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./listArticles.css";
import { getArticle } from "../actions/articleActions";

import { Row, Col, Card } from "react-bootstrap";
import ArticleBottom from "./articlesbottomComponent";

function ListArticles() {
  useEffect(() => {
    axios
      .get("https://mighty-ridge-28744.herokuapp.com/api/blog/getBlogs")
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.blogs);
          setBlogs(response.data.blogs);
        } else {
          alert("Couldnt get blog`s lists");
        }
      });
  }, []);

  const [blogs, setBlogs] = useState([]);
  function onclickhref(x) {
    return (window.location.href = x);
  }
  return (
    <Aux>
      <Row
        className='container-card'
        /* style={{ width: "85%", margin: " auto" }} */
      >
        {blogs.map((blog) => (
          <Col
            /* className='container' */ sm={12}
            key={blog._id}
            style={{ width: "100% !important", marginBottom: 15 }}
          >
            {/*  <Link to={`/postPage/${blog._id}`} style={{color : "black !important"}}>
             */}
            <Card
              style={{ padding: 15 }}
              onClick={() => {
                onclickhref(`/postPage/${blog._id}`);
              }}
            >
              <div
                dangerouslySetInnerHTML={{ __html: blog.content }}
                style={{
                  maxHeight: 450,
                  overflowY: "hidden",
                }}
              />
              <ArticleBottom articleId={blog._id} />
            </Card>
          </Col>
        ))}
      </Row>
    </Aux>
  );
}

ListArticles.propTypes = {
  getArticle: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
});
const mapDispatchToProps = (dispatch) => ({
  getArticle: (formData) => getArticle(formData),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ListArticles));
