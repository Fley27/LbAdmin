import React from "react";
import { Row, Col, Card, Table, Tabs, Tab } from "react-bootstrap";
import axios from "axios";

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";

import avatar1 from "../../assets/images/user/avatar-1.jpg";
import Avatar1 from "../../assets/images/user/avatar-2.jpg";
import avatar2 from "../../assets/images/user/avatar-2.jpg";
import avatar3 from "../../assets/images/user/avatar-3.jpg";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  registerBranch,
  get_branches,
  deleteBranch,
  get_batches,
  registerBatch,
  admissionProc,
} from "../actions/branchActions";
import { get_coach_view2_axios } from "../actions/coach2actions";
import {
  getchildren,
  togglewards,
  getstudprofile,
  toggleparentbatch,
  fetchbatchdetails,
  get_feesdetail,
} from "../actions/parentActions";
import classnames from "classnames";
import Batchdetails from "./Batchdetails";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const __DEV__ = document.domain === "localhost";
class PBatchDetails extends React.Component {
  componentDidMount() {
    console.log("on student profile");
    /* this._isMounted = true; */
    console.log(
      "On coach page this is state " + this.props.auth.isAuthenticated
    );
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("../auth/signin-1");
    }
    // fire functon to get branch & caoch list
    const student = {
      selectId: this.props.match.params.batch,
      selectedchild: this.props.match.params.child,
    };
    /* this.props.getstudprofile(student); */
    this.props.fetchbatchdetails(student);
    this.props.get_batches();
    this.props.get_feesdetail(student);
    this.props.get_coach_view2_axios();
  }
  componentWillReceiveProps(nextProps) {
    console.log("nextprop");
    console.log(nextProps);

    if (nextProps.parent.selectedbranch) {
      this.props.history.push("/dashboard/pbatchdetails");
    }
  }
  handleClick = (value) => () => {
    console.log(value._id);

    const selectedId = {
      selectedId: value._id,
    };
  };

  render() {
    //for paymenbt
    async function displayRazorpay(id, index, batch) {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      const data = await fetch(
        `http://localhost:5000/api/paymentsraz/razorpay/${batch}`,
        {
          method: "POST",
        }
      ).then((t) => t.json());
      const student = {
        selectId: id,
        index: index,
      };

      console.log(data);

      const options = {
        key: __DEV__ ? "rzp_test_yJX3rHu06JXDSH" : "rzp_live_AgYBEhL6xjcZYq",
        currency: data.currency,
        amount: data.amount.toString(),
        order_id: data.id,
        name: "Donation",
        description: "Thank you for nothing. Please give us some money",
        image: "http://localhost:5000/api/paymentsraz/logo.svg",
        handler: function (response) {
          if (
            response.razorpay_payment_id != null &&
            response.razorpay_order_id != null &&
            response.razorpay_signature != null
          ) {
            axios
              .post(`http://localhost:5000/api/users/payfeesdetail`, student)
              .then((response) => {
                if (response.data.success) {
                  toast.success(" Save with succes!", {
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
              .then(() => {
                const student = {
                  selectId: this.props.match.params.batch,
                  selectedchild: this.props.match.params.child,
                };
                this.props.get_feesdetail(student);
              });
          }
        },
        prefill: {
          name: `Jude`,
          email: `ch@gmail.com`,
          phone: `9999999999`,
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    }
    //end of payment script
    const { childrenlist } = this.props.parent;
    const { batchlist } = this.props.branch;
    const { batchdetails } = this.props.parent;
    const { coachlist } = this.props.coach2;
    const { feedetails } = this.props.parent;
    var batches = [];
    const sayHello = (x) => {
      /* alert('Hello Propping ! ' + x); */
      this.setState({ selectedbatch: x });

      const selectedId = {
        selectedId: x,
      };
      this.props.toggleparentbatch(selectedId, this.props.history);
    };
    var flag = 0;
    var flag2 = 0;
    return (
      <Aux>
        <ToastContainer />
        <Row>
          <Col>
            <Card className='Recent-Users'>
              <Card.Header>
                <Card.Title as='h5'>Batch details</Card.Title>
              </Card.Header>
              <Card.Body className='px-0 py-2'>
                <Table responsive hover>
                  {batchdetails.map(function (name, index) {
                    return (
                      <tbody>
                        <tr className='unread'>
                          <td>
                            <h6 className=' card-text'>Batch name : </h6>
                          </td>
                          <td>
                            <h6 className=' card-text'>
                              {batchdetails[0].batchname}
                            </h6>
                          </td>
                        </tr>
                        <tr className='unread'>
                          <td>
                            <h6 className=' card-text'>Coach name : </h6>
                          </td>
                          <td>
                            <h6 className=' card-text'>
                              {coachlist.map(function (name, index, _id) {
                                for (var i in coachlist) {
                                  if (
                                    coachlist[i]._id ==
                                      batchdetails[0].coachid &&
                                    flag != 1
                                  ) {
                                    console.log(
                                      "got our coach",
                                      coachlist[index].name
                                    );
                                    flag = 1;
                                    return coachlist[i].name;
                                  }
                                }
                              })}
                            </h6>
                          </td>
                        </tr>
                        <tr className='unread'>
                          <td>
                            <h6 className=' card-text'>Coach contact : </h6>
                          </td>
                          <td>
                            <h6 className=' card-text'>
                              {coachlist.map(function (name, index, _id) {
                                for (var i in coachlist) {
                                  if (
                                    coachlist[i]._id ==
                                      batchdetails[0].coachid &&
                                    flag2 != 1
                                  ) {
                                    flag2 = 1;
                                    return coachlist[i].contact;
                                  }
                                }
                              })}
                            </h6>
                          </td>
                        </tr>
                        <tr className='unread'>
                          <td>
                            <h6 className=' card-text'>Regular fees : </h6>
                          </td>

                          <td>
                            <h6 className=' card-text'>
                              {batchdetails[0].standardfee}
                            </h6>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h6 className='text-muted card-text'>
                              <i className='fa fa-circle text-c-green f-10 m-r-15' />
                              Subscribed
                            </h6>
                          </td>
                        </tr>{" "}
                      </tbody>
                    );
                  })}
                </Table>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} xl={8}>
            <Card className='Recent-Users'>
              <Card.Header>
                <Card.Title as='h5'>Fees</Card.Title>
              </Card.Header>
              <Card.Body className='px-0 py-2'>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>Month</th>
                      <th>Fees</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {console.log("fee detils here", feedetails)}
                    {feedetails.map((name, index) => {
                      console.log("in map function ", feedetails[index]);
                      var rows = [];
                      /*  return feedetails[index].tt_ref_batchid */
                      var k = 0;
                      var i = 0;
                      feedetails[index].ArrDuedatesPairedwithAmt.forEach(
                        (index, key) => {
                          console.log("i am here ", feedetails[0]);
                          var jsons = feedetails[0].ArrDuedatesPairedwithAmt[k];
                          var btntoggle = "";
                          var actionbtn = "";
                          if (jsons.status == "pending") {
                            i++;
                          }
                          if (jsons.status == "pending") {
                            btntoggle = (
                              <h6 className='text-warning card-text'>
                                Not paid
                              </h6>
                            );
                          } else {
                            btntoggle = (
                              <h6 className='text-success card-text'>Paid</h6>
                            );
                          }

                          if (jsons.status == "pending") {
                            rows.push(
                              <tr key={key}>
                                <td>
                                  <h6 className='text-muted card-text'>
                                    {jsons.payformonth}{" "}
                                  </h6>
                                </td>
                                <td>
                                  <h6 className='text-muted card-text'>
                                    {jsons.expectedamount}
                                  </h6>
                                </td>
                                <td>
                                  <button
                                    className='btn btn-success btn-xs App-link'
                                    onClick={() =>
                                      displayRazorpay(
                                        feedetails[0]._id,
                                        k,
                                        this.props.match.params.batch
                                      )
                                    }
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    disabled={i == 1 ? false : true}
                                  >
                                    Pay now
                                  </button>
                                </td>
                              </tr>
                            );
                          } else {
                            rows.push(
                              <tr key={key}>
                                <td>
                                  <h6 className='text-muted card-text'>
                                    {jsons.payformonth}{" "}
                                  </h6>
                                </td>
                                <td>
                                  <h6 className='text-muted card-text'>
                                    {jsons.expectedamount}
                                  </h6>
                                </td>
                                <td>Paid</td>
                              </tr>
                            );
                          }
                          k = k + 1;
                        }
                      );
                      return rows;
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Aux>
    );
  }
}
PBatchDetails.propTypes = {
  fetchbatchdetails: PropTypes.func.isRequired,
  toggleparentbatch: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  coach2: PropTypes.object.isRequired,
  branch: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  coach2: state.coach2,
  branch: state.branch,
  parent: state.parent,
});
export default connect(mapStateToProps, {
  registerBranch,
  get_branches,
  get_coach_view2_axios,
  get_batches,
  fetchbatchdetails,
  registerBatch,
  admissionProc,
  getstudprofile,
  getchildren,
  toggleparentbatch,
  get_feesdetail,
})(withRouter(PBatchDetails));
