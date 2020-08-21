import React, { Component ,useState } from 'react';
import {
    Row, Col, Table, Tabs, Tab, Form,
    Button,
    FormControl
} from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import Card from "../../App/components/MainCard";
import DEMO from "../../store/constant";

import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';

import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerBranch, get_branches, deleteBranch } from "../actions/branchActions";
import { get_coach_view2_axios } from "../actions/coach2actions";
import classnames from "classnames";


function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}

const __DEV__ = document.domain === 'localhost'

class Branch extends Component {


    render() {

        

        async function displayRazorpay() {
            const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

            if (!res) {
                alert('Razorpay SDK failed to load. Are you online?')
                return
            }

            const data = await fetch('https://mighty-ridge-28744.herokuapp.com/api/paymentsraz/razorpay', { method: 'POST' }).then((t) =>
                t.json()
            )

            console.log(data)

            const options = {
                key: __DEV__ ? 'rzp_test_4CFTv4dy9hnRcT' : 'rzp_test_4CFTv4dy9hnRcT',
                currency: data.currency,
                amount: data.amount.toString(),
                order_id: data.id,
                name: 'Donation',
                description: 'Thank you for nothing. Please give us some money',
                image: 'https://mighty-ridge-28744.herokuapp.com/api/paymentsraz/logo.svg',
                handler: function (response) {
                    alert(response.razorpay_payment_id)
                    alert(response.razorpay_order_id)
                    alert(response.razorpay_signature)
                },
                prefill: {
                    name : "mehul",
                    email: 'sdfdsjfh2@ndsfdf.com',
                    phone_number: '9899999999'
                }
            }
            const paymentObject = new window.Razorpay(options)
            paymentObject.open()
        }

        return (
            <Aux>
                <Row>
                    <Col>
                        <Card title='Branch creation form' isOption>
                            <Col md={12}>
                                <a
                                    className="App-link"
                                    onClick={displayRazorpay}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Donate $5
				</a>
                            </Col>
                        </Card>
                    </Col>
                </Row>

            </Aux>
        );
    }
}
/* Branch.propTypes = {
    registerBranch: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    coach2: PropTypes.object.isRequired,
    branch: PropTypes.object.isRequired,
}; */

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    coach2: state.coach2,
    branch: state.branch,
});

export default connect(
    mapStateToProps,
    {}
)(withRouter(Branch));
