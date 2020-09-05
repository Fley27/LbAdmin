import React from "react";

import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../../redux/actions/auth";
import classnames from "classnames";
import logo from "../../../assets/images/logo/libidoon.png";

class BranchSelector extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      if (this.props.auth.user) {
        if (this.props.auth.user.userType.toLowerCase() === "admin") {
         // this.props.history.push("/dashboard");
          console.log("states changed");
        }
      }
    }
    
  }
  componentWillReceiveProps(nextProps) {
    console.log( nextProps.auth);
    if (nextProps.auth.isAuthenticated) {
      const {user} = nextProps.auth;
       if(user){
        const {userType} = user;
        console.log(user);
        console.log(`${userType}`);
        if (userType.toLowerCase() === "admin") {
          this.props.history.push("/dashboard/");
        }
       }
    }
    console.log("THis is after login response gets in nextprop and state is");
  }
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    

    const { email, password } = this.state;
    console.log("inptus to be sent are" + this.state.email);

    this.props.login({ email, password });
  };

  render() {
    const { errors } = this.state;
    return (
      <Aux>
        <div className='auth-wrapper'>
          <div className='auth-content'>
            <div className='auth-bg'>
              <span className='r' />
              <span className='r s' />
              <span className='r s' />
              <span className='r' />
            </div>
            <div className='card'>
              <div className='card-body text-center'>
                <form noValidate onSubmit={this.onSubmit}>
                  <div className='mb-4'>
                    <img
                      style={{ width: "100", height: "100" }}
                      src={logo}
                      alt='Logo'
                    />
                  </div>
                  <div className='input-group mb-3'>
                    <input
                      onChange={this.onChange}
                      value={this.state.email}
                      error={errors.email}
                      className={classnames("form-control", {
                        invalid: errors.email || errors.emailnotfound,
                      })}
                      id='email'
                      type='email'
                      placeholder='Email...'
                    />
                  </div>
                  <div style={{ color: "red" }}>
                    {this.state.errors.email || this.state.errors.emailnotfound}
                  </div>
                  <div className='input-group mb-4'>
                    <input
                      onChange={this.onChange}
                      value={this.state.password}
                      error={errors.password}
                      id='password'
                      type='password'
                      placeholder='Password...'
                      className={classnames("form-control", {
                        invalid: errors.password || errors.passwordincorrect,
                      })}
                    />
                  </div>
                  <div style={{ color: "red" }}>
                    {this.state.errors.password ||
                      this.state.errors.passwordincorrect}
                  </div>
                  <div className='form-group text-left'>
                    <div className='checkbox checkbox-fill d-inline'>
                      <input
                        type='checkbox'
                        name='checkbox-fill-1'
                        id='checkbox-fill-a1'
                      />
                      <label htmlFor='checkbox-fill-a1' className='cr'>
                        {" "}
                        Keep me logged in
                      </label>
                    </div>
                  </div>
                  <button
                    className='btn btn-danger btn-lg btn-block '
                    type='submit'
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Aux>
    );
  }
}
BranchSelector.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { login })(BranchSelector);
