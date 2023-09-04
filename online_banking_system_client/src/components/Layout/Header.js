
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import { LOGOUT } from '../../actions/types';



const Header = () => {
  const navigate = useNavigate();

  function logout() {
    window.sessionStorage.removeItem("user");
    window.sessionStorage.removeItem("user_id");
    window.sessionStorage.removeItem("user_level_id");
    window.sessionStorage.removeItem("user_name");
    navigate("/UserLogin",
      {
        state:
          { msg: 'Your have logged out successully !!!.', error_type: 'alert-success' }
      }
    )
  }

  console.log("Session Storage : ");
  console.log(window.sessionStorage.getItem("user"));

  const adminLinks = (
    <ul className="nav navbar-nav">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/About">About</Link></li>
      <li><Link to="/Dashboard">Dashboard</Link></li>
      <li className="dropdown">
        <a href="#" data-toggle="dropdown" className="dropdown-toggle">Add New<b className="caret"></b></a>
        <ul className="dropdown-menu">
         <li><Link to="/category-add">Add New Services</Link></li>
         <li><Link to="/transaction-add">Add New Transaction</Link></li>
         <li><Link to="/user-add">Add New User</Link></li>
         <li><Link to="/kyc-add">Add KYC</Link></li>
         <li><Link to="/account-add">Add Account</Link></li>
        </ul>
      </li>
      <li className="dropdown">
        <a href="#" data-toggle="dropdown" className="dropdown-toggle">Reports<b className="caret"></b></a>
        <ul className="dropdown-menu">
         <li><Link to="/category-report">Services Report</Link></li>
         <li><Link to="/user-report/2">Customer Report</Link></li>
         <li><Link to="/user-report/1">Admin Report</Link></li>
         <li><Link to="/kyc-report">KYC Report</Link></li>
         <li><Link to="/account-report">Account Report</Link></li>
         <li><Link to="/feedback-report">Feedback Report</Link></li>
        </ul>
      </li>
      <li><a onClick={logout} href="#!">Logout</a></li>
    </ul>
  )

  const usersLinks = (
    <ul className="nav navbar-nav">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/About">About</Link></li>
      <li><Link to="/Dashboard">Dashboard</Link></li>
      <li className="dropdown">
        <a href="#" data-toggle="dropdown" className="dropdown-toggle">My Administration<b className="caret"></b></a>
        <ul className="dropdown-menu">
          <li><Link to="/beneficiary-add">Add Beneficiary</Link></li>
          <li><Link to="/transfer-add">Transfer Money</Link></li>
          <li><Link to="/transaction-add">Deposit and Withdraw</Link></li>
          <li><Link to={'/beneficiary-report/'+window.sessionStorage.getItem("user_id")}>My Beneficiary</Link></li>
          <li><Link to="/account-report">My Accounts</Link></li>
          <li><Link to="/feedback">Submit Feedback</Link></li>
          <li><Link to={'/user-add/'+window.sessionStorage.getItem("user_id")}>My Profile</Link></li>
        </ul>
      </li>
      <li><a onClick={logout} href="#!">Logout</a></li>
    </ul>
  )


  const guestLinks = (
    <ul className="nav navbar-nav">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/About">About</Link></li>
      <li><Link to="/category-list">Services</Link></li>
      <li><Link to="/UserLogin">Login</Link></li>
      <li><Link to="/feedback">Feedback</Link></li>
    </ul>
  )
  return (
    <header>
      <div className="navbar navbar-default navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to="/" className="navbar-brand theadh">Online Banking System</Link>
          </div>
          <div className="navbar-collapse collapse ">
            {(
              <Fragment>
                {
                    window.sessionStorage.getItem("user_level_id") == "1" ? adminLinks :
                    window.sessionStorage.getItem("user_level_id") == "2" ? usersLinks : guestLinks
                }
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
export default Header;