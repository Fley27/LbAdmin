import React, { useEffect, useState } from "react";
import QuillEditor from "./quillEditor";
import Aux from "../../hoc/_Aux";
import Card from "../../App/components/MainCard";
import axios from "axios";

import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Articles.css";

import { Row, Form, Col, Button, FormControl } from "react-bootstrap";

function Articles() {
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);

  const onEditorChange = (value) => {
    setContent(value);
    console.log(content);
  };

  const onFilesChange = (files) => {
    setFiles(files);
  };

  const onSubmit = (event) => {
    const variables = {
      content: content,
    };
    if (content == null || content == "  " || content == "") {
      toast.error("You are posting empty content", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    } else {
      console.log("Contents are >>", content, "<<");

      event.preventDefault();
      axios
        .post("https://mighty-ridge-28744.herokuapp.com/api/blog/createPost", variables)
        .then((response) => {
          if (response.data.success) {
            toast.success("Blog added successfully !", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setContent("");
          } else {

            toast.error(" Warning, a thing is wrong !", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        });
    };
  }

  return (
    <Aux>
      <ToastContainer />
      <Form noValidate onSubmit={onSubmit}>
        <Card title='New Article' isOption>
          <QuillEditor
            placeholder={"Start Posting Something"}
            onEditorChange={onEditorChange}
            onFilesChange={onFilesChange}
          />
          <Row style={{ marginTop: 10 }}>
            <Col md={12}>
              <Button variant='primary' type='submit'>
                Submit
              </Button>
            </Col>
          </Row>
        </Card>
      </Form>
    </Aux>
  );
}

Articles.propTypes = {
  auth: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
});
export default connect(mapStateToProps)(withRouter(Articles));
