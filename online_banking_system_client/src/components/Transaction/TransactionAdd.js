import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { PropTypes } from 'prop-types';
import axios from 'axios';
import config from '../../utils/config';

const TransactionAdd = ({ setAlert, transaction, isAuthenticated }) => {
   const navigate = useNavigate();
   // Function for edit //
   let { id } = useParams();

    // Creating FormData Form elements ////
    const [message, setMessage] = useState({
      show_message: false,
      error_type: '',
      msg: ''
    });

   const [balance, setBalance] = useState([]);


   const [tranactionTypeDropDown, setTTDropDown] = useState([{
      tt_id: '',
      tt_name: ''
   }]);

   const [transactionMethodDropDown, setTMropDown] = useState([{
      tm_id: '',
      tm_name: ''
   }]);

   const [accountDropDown, setAccountDropDown] = useState([{
      account_id: ''
   }]);

    // Creating FormData Form elements ////
    const [formData, setFormData] = useState({
      transaction_id: '',
      transaction_account_id: '',
      transaction_tm_id: '',
      transaction_tt_id: '',
      transaction_date: '',
      transaction_amount: '',
      transaction_description: ''
   });

   useEffect(() => {
      let account_url = `${config.api_url}/account`;
      if(window.sessionStorage.getItem("user_level_id") == 2) {
         account_url = `${config.api_url}/account/all-account/${window.sessionStorage.getItem("user_id")}`
      }
     


      if (id) {
         axios.get(`${config.api_url}/transaction/${id}`)
            .then(res => {
               setFormData(res.data);
            })
      }
       // Get  Account Type Dropdown
       axios.get(`${config.api_url}/transactionMethod`)
       .then(res => {
         setTMropDown(res.data);
       })

       // Get  Branch Dropdown
       axios.get(`${config.api_url}/transactionType`)
       .then(res => {
         setTTDropDown(res.data);
       })

        // Get  Customer Dropdown
        axios.get(account_url)
        .then(res => {
         setAccountDropDown(res.data);
        })
   }, []);

   // Handlinng Change Event
   const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

   // Handling Submit
   const onSubmit = async (e) => {
      e.preventDefault();
      // On submit //
      if (id) {
         axios({
            method: 'put',
            url: `${config.api_url}/transaction/${id}`,
            data: formData,
         })
            .then(function (response) {
               //handle success
               console.log(response);
               navigate(`/transaction-report/${formData.transaction_account_id}`)
            })
            .catch(function (response) {
               //handle error
               console.log("Error  : ");
               console.log(response);
            });
      } else {

         /// Check the balance befor the transactions /////
         axios.get(`${config.api_url}/account/account-balance/${formData.transaction_account_id}`)
         .then(res => {
            const transaction = res.data;
            setBalance(transaction[0]);
            /// If Customer has balance then make the transfer or withdrawl /////
            if (parseInt(transaction[0].total_balance) < parseInt(formData.transaction_amount) && formData.transaction_tt_id == "2") {
               setMessage({
                  show_message: true,
                  error_type: 'alert-danger',
                  msg: "Account doesn't have balance, you can maximum withdraw "+transaction[0].total_balance
               });
            } else {
            axios({
               method: 'post',
               url: `${config.api_url}/transaction`,
               data: formData,
            })
               .then(function (response) {
                  //handle success
                  console.log("Success  : ");
                  console.log(response);
                  navigate(`/transaction-report/${formData.transaction_account_id}`)
                  setFormData(
                     { 
                        transaction_id: '',
                        transaction_name: '',
                        transaction_email: '',
                        transaction_rating: '',
                        transaction_message: ''
                     }
                  );
               })
               .catch(function (response) {
                  //handle error
                  console.log("Error  : ");
                  console.log(response);
               });
            }
         })
      }
   };

   return (
      <section>
         <section id="inner-headline">
            <div className="container">
               <div className="row">
                  <div className="col-lg-12">
                     <h2 className="pageTitle">
                        <Fragment>
                           {
                              window.sessionStorage.getItem("user_level_id") == "1" ? " Transaction Entry Form" :
                              window.sessionStorage.getItem("user_level_id") == "2" ? " Deposit and Withdraw Amount" : ''
                           }
                        </Fragment>   
                     </h2>
                  </div>
               </div>
            </div>
         </section>
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
                                       window.sessionStorage.getItem("user_level_id") == "1" ? "  Account Transaction : Entry Form" :
                                       window.sessionStorage.getItem("user_level_id") == "2" ? " Deposit and Withdraw Amount : Entry Form" : ''
                                    }
                                 </Fragment>  
                                 </h2>
                              </div>
                              <br />
                           </div>
                        </div>
                        {message.show_message ? (
                           <div className={'alert ' + message.error_type} role="alert">
                              {message.msg}
                           </div>
                        ) : (
                           ''
                        )}
                        <section className="vh-100">
                           <div className="d-flex justify-content-center align-items-center h-100 frmc">
                              <form className="form-horizontal" onSubmit={onSubmit}>
                                 <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="email">Account Number :</label>
                                    <div className="col-sm-8">
                                    <select name='transaction_account_id' value={formData.transaction_account_id} onChange={e => onChange(e)}  className="form-control">
                                       <option>Select Account Number</option>
                                       {accountDropDown.map((option) => (
                                          <option value={option.account_id}>{option.account_id}</option>
                                       ))}
                                    </select>
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="email">Transfer Type :</label>
                                    <div className="col-sm-8">
                                    <select name='transaction_tt_id' value={formData.transaction_tt_id} onChange={e => onChange(e)}  className="form-control">
                                       <option>Select Transfer Type</option>
                                       {tranactionTypeDropDown.map((option) => (
                                          <option value={option.tt_id}>{option.tt_name}</option>
                                       ))}
                                    </select>
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="email">Transfer Method :</label>
                                    <div className="col-sm-8">
                                    <select name='transaction_tm_id' value={formData.transaction_tm_id} onChange={e => onChange(e)}  className="form-control">
                                       <option>Select Transfer Method</option>
                                       {transactionMethodDropDown.map((option) => (
                                          <option value={option.tm_id}>{option.tm_name}</option>
                                       ))}
                                    </select>
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="email">Amount :</label>
                                    <div className="col-sm-8">
                                       <input type="number" value={formData.transaction_amount} onChange={e => onChange(e)} name="transaction_amount" className="form-control" placeholder="Amount" required />
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="email">Date :</label>
                                    <div className="col-sm-8">
                                       <input type="date" value={formData.transaction_date} onChange={e => onChange(e)} name="transaction_date" className="form-control" placeholder="Date" required />
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="email">Description:</label>
                                    <div className="col-sm-8">
                                       <textarea value={formData.transaction_description} onChange={e => onChange(e)} name="transaction_description" className="form-control" placeholder="Transaction Description" required></textarea>
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <div className="col-sm-offset-4 col-sm-8">
                                       <button type="submit" className="btn btn-default">Submit</button>&nbsp;&nbsp;
                                       <button type="reset" className="btn btn-danger">Reset</button>
                                    </div>
                                 </div>
                              </form>
                           </div>
                        </section>
                     </div>
                  </section>
               </div>
            </div>
         </section>
      </section>
   );
};

TransactionAdd.propTypes = {
   setAlert: PropTypes.func.isRequired,
   transaction: PropTypes.func.isRequired,
   isAuthenticated: PropTypes.bool

};
const mapStateToProps = state => ({
   isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert })(TransactionAdd);