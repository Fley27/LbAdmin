import React, { useEffect, useState } from "react";
import Aux from "../../hoc/_Aux";
import axios from "axios";

import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getArticle, getGallery } from "../actions/articleActions";

import { Row, Col, Card } from "react-bootstrap";

function ListArticles() {
  useEffect(() => {
    axios
      .post("https://mighty-ridge-28744.herokuapp.com/api/users/viewallimages")
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
    return (window.location.href = x)
  }
  var imgsrc = "";
  return (
    <Aux>
      <Row><Col sm={12} style={{ width: "100% !important" }}><h3>Gallery</h3></Col></Row>
      <Row className='container-card'>
        {blogs.map((blog) => (
          console.log(blog.imagepath),

          imgsrc = "https://mighty-ridge-28744.herokuapp.com/" + blog.imagepath,
          <Col sm={12} key={blog._id} style={{ width: "100% !important",marginBottom:15 }}>

            <Card style={{ padding: 5 }}>
              <img src={imgsrc} style={{ width: "100%" }}></img>
              <Card.Footer ><h6>{blog.imagecaption}</h6></Card.Footer>
            </Card>
          </Col>

        ))}
      </Row>
    </Aux>
  );
}

ListArticles.propTypes = {
  getGallery: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
});
const mapDispatchToProps = (dispatch) => ({
  getGallery: (formData) => getGallery(formData),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ListArticles));
