import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { withRouter } from "react-router";
import ChatList from "./ChatList";
import Aux from "../../../../../hoc/_Aux";
import DEMO from "../../../../../store/constant";
import axios from "axios";

import Avatar1 from "../../../../../assets/images/user/avatar-1.jpg";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../../../Demo/actions/authActions";

class NavRight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false,
      notifications: [],
      birthday: [],
    };
  }

  onLogoutClick = (e) => {
    console.log("clicked logout");
    e.preventDefault();
    this.props.logoutUser();
    this.props.history.push("../../auth/signin-1");
  };

  componentDidMount() {}

  render() {
    var dateformat = require("dateformat");
    return (
      <Aux>
        <ul className='navbar-nav ml-auto'>
          <li>
            <h6>Welcome {}</h6>
          </li>
          <li>
            <Dropdown alignRight={!this.props.rtlLayout}>
              <Dropdown.Toggle variant={"link"} id='dropdown-basic'>
                {this.state.birthday ? (
                  <i style={{ color: "red" }} className='fa fa-gift'></i>
                ) : null}
              </Dropdown.Toggle>
              <Dropdown.Menu alignRight className='notification'>
                <div className='noti-head'>
                  <h6 className='d-inline-block m-b-0'>Today Birthday</h6>
                </div>
                <ul className='noti-body'>
                  {this.state.birthday.length
                    ? this.state.birthday.map((item) => (
                        <li
                          key={item.ref_userid._id}
                          style={{ height: 70 }}
                          className='notification'
                        >
                          <div className='media'>
                            <img
                              className='img-radius'
                              src={Avatar1}
                              alt='Generic placeholder'
                            />
                            <div className='media-body'>
                              <a
                                href={`/dashboard/wishes/${item.ref_userid._id}`}
                              >
                                <p>
                                  <strong>
                                    {"Today is" +
                                      item.ref_userid.name +
                                      "'s Birthday"}{" "}
                                  </strong>
                                  <p
                                    style={{ textAlign: "center" }}
                                  >{`Click here to wish >>`}</p>
                                </p>
                              </a>
                            </div>
                          </div>
                        </li>
                      ))
                    : null}
                </ul>
                <div className='noti-footer'>
                  <a href='/dashboard/birthday'>show all</a>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li>
            <Dropdown alignRight={!this.props.rtlLayout}>
              <Dropdown.Toggle variant={"link"} id='dropdown-basic'>
                <i className='icon feather icon-bell' />
              </Dropdown.Toggle>
              <Dropdown.Menu alignRight className='notification'>
                <div className='noti-head'>
                  <h6 className='d-inline-block m-b-0'>Notifications</h6>
                  <div className='float-right'>
                    <a href={DEMO.BLANK_LINK} className='m-r-10'>
                      mark as read
                    </a>
                    <a href={DEMO.BLANK_LINK}>clear all</a>
                  </div>
                </div>
                <ul
                  className='noti-body'
                  style={{ overflowY: "scroll", overflowX: "hidden" }}
                >
                  {this.state.notifications.length ? (
                    this.state.notifications.map((item) => (
                      <li className='notification'>
                        <div className='media'>
                          <img
                            className='img-radius'
                            src={Avatar1}
                            alt='Generic placeholder'
                          />
                          <div className='media-body'>
                            <p>
                              <strong>{item.fromid.name}</strong>
                              <span className='n-time text-muted'>
                                <i className='icon feather icon-clock m-r-10' />
                                {dateformat(item.posted, "dd / mm / yyyy")}
                              </span>
                            </p>
                            <p>{item.notification_title}</p>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className='notification'>
                      <p style={{ textAlign: "center" }}>
                        You have seen it all! no new notification
                      </p>
                    </li>
                  )}
                </ul>
                <div className='noti-footer'>
                  <a href={DEMO.BLANK_LINK}>show all</a>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </li>

          <li>
            <Dropdown alignRight={!this.props.rtlLayout} className='drp-user'>
              <Dropdown.Toggle variant={"link"} id='dropdown-basic'>
                <i className='icon feather icon-settings' />
              </Dropdown.Toggle>
              <Dropdown.Menu alignRight className='profile-notification'>
                <div className='pro-head'>
                  <img
                    src={Avatar1}
                    className='img-radius'
                    alt='User Profile'
                  />
                  <span></span>
                  {/* <a href={DEMO.BLANK_LINK} className="dud-logout" title="Logout">
                                        <i className="feather icon-log-out"/>
                                    </a> */}
                </div>
                <ul className='pro-body'>
                  <li>
                    <a href='' className='dropdown-item'>
                      <i className='feather icon-user' /> Profile
                    </a>
                  </li>
                  <li>
                    <a onClick={this.onLogoutClick} className='dropdown-item'>
                      <i className='feather icon-log-out' /> Logout{" "}
                    </a>
                  </li>
                </ul>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
        {/*  <ChatList listOpen={this.state.listOpen} closed={() => {this.setState({listOpen: false});}} /> */}
      </Aux>
    );
  }
}
NavRight.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default withRouter(connect(mapStateToProps, { logoutUser })(NavRight));
