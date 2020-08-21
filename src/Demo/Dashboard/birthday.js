import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { withRouter } from "react-router";
import Aux from "../../hoc/_Aux";
import Card from "../../App/components/MainCard";
import DEMO from "../../store/constant";
import axios from "axios";

import Avatar1 from "../../assets/images/user/avatar-1.jpg";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Table } from "react-bootstrap";

class Birthday extends Component {
  constructor(props) {
    super(props);
    this.state = {
      birthday: [],
    };
  }

  onLogoutClick = (e) => {
    console.log("clicked logout");
    e.preventDefault();
    this.props.logoutUser();
    this.props.history.push("../../auth/signin-1");
  };

  componentDidMount() {
    axios.get(`http://localhost:5000/api/birthday`).then((response) => {
      if (response.data.success) {
        this.setState({ birthday: response.data.birthday });
        console.log(this.state.notifications);
      } else {
        alert("Couldnt get blog`s lists");
      }
    });
  }

  render() {
    return (
      <Aux>
        <Card title='Birthday List' isOption>
          <Table responsive hover>
            {this.state.birthday.map((item) => (
              <tr
                key={item.ref_userid._id}
                style={{ height: 50 }}
                className='notification'
              >
                <a
                  href={`/dashboard/wishes/${item.ref_userid._id}`}
                  style={{
                    with: "100%",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  <td className='media'>
                    <img
                      className='img-radius'
                      src={Avatar1}
                      alt='Generic placeholder'
                    />
                  </td>
                  <td className='media-body'>
                    <h6 style={{ margin: 20 }}>
                      <h5>{`Today is ${item.ref_userid.name}'s birthday`}</h5>
                      <h6>{`Click here to wish >>`}</h6>
                    </h6>
                  </td>
                </a>
              </tr>
            ))}
          </Table>
        </Card>
      </Aux>
    );
  }
}
Birthday.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default withRouter(connect(mapStateToProps)(Birthday));
