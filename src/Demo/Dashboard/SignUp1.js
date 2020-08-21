import React from 'react';
import { NavLink } from 'react-router-dom';

import '../../assets/scss/style.scss';
import Aux from "../../hoc/_Aux";
import Breadcrumb from "../../App/layout/AdminLayout/Breadcrumb";
//import DEMO from "./../store/constant";

class SignUp1 extends React.Component {
    render() {
        return (
            <Aux>
                <Breadcrumb />
                <div className="auth-wrapper">
                    <div className="auth-content">
                        <div className="auth-bg">
                            <span className="r" />
                            <span className="r s" />
                            <span className="r s" />
                            <span className="r" />
                        </div>
                        <div class="card">
                        <div class="card-header"><h5 class="card-title">Select a branch</h5><div class="card-header-right"></div></div>
                            <div class="border-bottom card-body">
                                <div class="row d-flex align-items-center">
                                    <div class="col-auto"><i class="feather icon-map-pin f-30 text-c-blue"></i></div>
                                    <div class="col"><span class="d-block text-uppercase">Gurukrupa</span></div>
                                </div>
                            </div>

                            <div class="card-body">
                                <div class="row d-flex align-items-center">
                                    <div class="col-auto"><i class="feather icon-map-pin f-30 text-c-blue"></i></div><div class="col"><span class="d-block text-uppercase">Sandhya</span></div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
}

export default SignUp1;