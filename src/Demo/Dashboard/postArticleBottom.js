import React from "react";
import axios from "axios";

import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Row, Col, Form, Card, Button, Table } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./wishes.css";
import Aux from "../../hoc/_Aux";
import Cards from "../../App/components/MainCard";
class PostArticleBottom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLiked: false,
      comments: [],
      message: "",
      newCommnentHide: true,
    };
  }

  handleNewComment = () => {
    this.setState({ newCommnentHide: !this.state.newCommnentHide });
  };

  handleLikeClick = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:5000/api/comment/like/${this.props.articleId}/${this.props.auth.user.id}`
      )
      .then((response) => {
        if (response.data.success) {
          this.setState({ isLiked: !response.data.delete });
          toast.success(`${response.data.msg}`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          alert("Couldnt get blog`s lists");
        }
      });
  };

  componentDidMount() {
    console.log("auth: " + this.props.auth.user.id);
    console.log("article: " + this.props.articleId);
    axios
      .get(
        `http://localhost:5000/api/comment/isLiked/${this.props.articleId}/${this.props.auth.user.id}`
      )
      .then((response) => {
        if (response.data.success) {
          this.setState({ isLiked: response.data.liked });
          this.setState({ comments: response.data.comments });
        } else {
          alert("Couldnt get blog`s lists");
        }
      });
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    let obj = {};
    obj.comment = this.state.message;

    if (!this.state.message) return 0;

    axios
      .post(
        `http://localhost:5000/api/comment/${this.props.articleId}/${this.props.auth.user.id}`,
        obj
      )
      .then((respone) => {
        if (respone.data.success) {
          toast.success(`${respone.data.msg}`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          this.setState({ comments: respone.data.comments });
          this.setState({ message: "" });
          this.setState({ newCommnentHide: !this.state.newCommnentHide });
        } else {
          toast.error("Error !! Didn't send", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <Aux>
        <Card
          style={{
            backgroundColor: "none",
            marginTop: -15,
            paddingLeft: 20,
            width: "100%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <ToastContainer />
          <Form
            noValidate
            onSubmit={this.handleLikeClick}
            onClick={this.handleLikeClick}
            style={{
              cursor: "pointer",
              maxWidth: 100,
              fontSize: 17,
              color: "blue",
            }}
          >
            {this.state.isLiked ? (
              <i className='fa fa-heart'></i>
            ) : (
              <i style={{ color: "#DCDCDC" }} className='fa fa-heart'></i>
            )}
          </Form>
          <Button
            onClick={this.handleNewComment}
            variant={this.state.newCommnentHide ? "dark" : "danger"}
            style={{
              fontSize: 17,
              color: "white",
              marginLeft: 20,
              height: 50,
            }}
          >
            {this.state.newCommnentHide ? "New Comment" : "Cancel"}
            {"     "}
          </Button>
          {this.state.newCommnentHide ? null : (
            <Card
              style={{ width: "100%", marginTop: 60, marginLeft: -100 }}
              title={`Make a comment`}
              isOption
            >
              <Form noValidate onSubmit={this.onSubmit}>
                <Row className='textarea'>
                  <textarea
                    id='message'
                    onChange={this.onChange}
                    value={this.state.message}
                    rows='8'
                    cols='50'
                  ></textarea>
                  <Col md={12}>
                    <Button variant='primary' type='submit'>
                      Send your comment
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card>
          )}
        </Card>
        {this.state.comments.length ? (
          <Cards title='Comment List' isOption>
            <Table responsive>
              <tbody>
                {this.state.comments
                  ? this.state.comments.map((item) => (
                      <tr
                        key={item._id}
                        style={{ overflow: "hidden" }}
                        className='notification'
                      >
                        <td className='media'>
                          <img
                            style={{ height: 50, width: 50 }}
                            className='img-radius'
                            src={item.fromid.filepath}
                            alt='Generic placeholder'
                          />
                        </td>
                        <td className='media-body'>
                          <p style={{ margin: 20, fontSize: 17 }}>
                            {item.comment}
                          </p>
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </Table>
          </Cards>
        ) : null}
      </Aux>
    );
  }
}
PostArticleBottom.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(withRouter(PostArticleBottom));
