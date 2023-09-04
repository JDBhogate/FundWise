import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { PropTypes } from 'prop-types';
import { register } from '../../actions/auth';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

const Register = ({ setAlert, register, isAuthenticated }) => {
   const navigate = useNavigate();


   function logout() {
      window.sessionStorage.removeItem("user");
      window.sessionStorage.removeItem("user_id");
      window.sessionStorage.removeItem("user_level_id");
      window.sessionStorage.removeItem("user_name");
      navigate("/UserLogin")
   }

   const adminLinks = (
      <ul>
         <li><Link to="/">Home</Link></li>
         <li><Link to="/About">About</Link></li>
         <li><Link to="/category-add">Add New Services</Link></li>
         <li><Link to="/transaction-add">Add New Transaction</Link></li>
         <li><Link to="/user-add">Add New User</Link></li>
         <li><Link to="/kyc-add">Add KYC</Link></li>
         <li><Link to="/account-add">Add Account</Link></li>
         <li><Link to="/category-report">Services Report</Link></li>
         <li><Link to="/user-report/2">Customer Report</Link></li>
         <li><Link to="/user-report/1">Admin Report</Link></li>
         <li><Link to="/kyc-report">KYC Report</Link></li>
         <li><Link to="/account-report">Account Report</Link></li>
         <li><Link to="/feedback-report">Feedback Report</Link></li>
         <li><a onClick={logout} href="#!">Logout</a></li>
      </ul>
   )

   const userLinks = (
      <ul>
         <li><Link to="/">Home</Link></li>
         <li><Link to="/beneficiary-add">Add Beneficiary</Link></li>
         <li><Link to="/transaction-add">Deposit and Withdraw</Link></li>
         <li><Link to="/transfer-add">Transfer Money</Link></li>
         <li><Link to={'/beneficiary-report/'+window.sessionStorage.getItem("user_id")}>My Beneficiary</Link></li>
         <li><Link to="/account-report">My Accounts</Link></li>
         <li><Link to="/feedback">Submit Feedback</Link></li>
         <li><Link to={'/user-add/'+window.sessionStorage.getItem("user_id")}>My Profile</Link></li>
         <li><a onClick={logout} href="#!">Logout</a></li>
      </ul>
   )

   return (
      <section>
         <section id="content">
            <div className="container">
               <div className="about">
                  <section className="features">
                     <div className="container">
                        <div>
                           <div>
                              <div>
                                 <h2 className='h2c'>
                                 <Fragment>
                                    {
                                       window.sessionStorage.getItem("user_level_id") == "1" ? " Admin Dashboard" :
                                       window.sessionStorage.getItem("user_level_id") == "2" ? " User Dashboard" : ''
                                    }
                                 </Fragment>
                                 </h2>
                              </div>
                              <br />
                           </div>
                        </div>
                        <section className="vh-100">
                        <div className="row">
                           <div className="col-sm-6">
                              <div id="login-home">
                                 {(
                                    <Fragment>
                                       {
                                          window.sessionStorage.getItem("user_level_id") == "1" ? adminLinks :
                                          window.sessionStorage.getItem("user_level_id") == "2" ? userLinks : ''
                                       }
                                    </Fragment>
                                 )}
                              </div>
                           </div>
                           <div className="col-sm-6">
                              <img src="/img/home.jpeg" style={{height:400, width:600}}/><br />
                           </div>
                        </div>
                        </section>
                     </div>
                  </section >
               </div >
            </div >
         </section >
      </section >
   );
};

Register.propTypes = {
   setAlert: PropTypes.func.isRequired,
   register: PropTypes.func.isRequired,
   isAuthenticated: PropTypes.bool

};
const mapStateToProps = state => ({
   isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Register);