import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { PropTypes } from 'prop-types';
import axios from 'axios';
import config from '../../utils/config';

const TransferAdd = ({ setAlert, transfer, isAuthenticated }) => {
   const navigate = useNavigate();
   // Function for edit //
   let { id } = useParams();

   // Creating FormData Form elements ////
   const [message, setMessage] = useState({
      show_message: false,
      error_type: '',
      msg: ''
   });

   const [beneficiaryDropDown, setBeneficiaryDropDown] = useState([{
      beneficiary_id: '',
      beneficiary_name: ''
   }]);

   const [accountDropDown, setAccountDropDown] = useState([{
      account_id: ''
   }]);

   // Creating FormData Form elements ////
   const [formData, setFormData] = useState({
      transfer_id: '',
      transfer_account_id: '',
      transfer_beneficiary_id: '',
      transfer_date: '',
      transfer_description: '',
      transfer_amount: ''
   });

   // Creating FormData Form elements ////
   const [transactionData, setTransactionData] = useState({
      transaction_id: '',
      transaction_account_id: '',
      transaction_tm_id: '',
      transaction_tt_id: '',
      transaction_date: '',
      transaction_amount: '',
      transaction_description: ''
   });

   useEffect(() => {
      if (id) {
         axios.get(`${config.api_url}/transfer/${window.sessionStorage.getItem("user_id")}`)
            .then(res => {
               setFormData(res.data);
            })
      }

      // Get  Branch Dropdown
      axios.get(`${config.api_url}/beneficiary/all-beneficiary/${window.sessionStorage.getItem("user_id")}`)
         .then(res => {
            setBeneficiaryDropDown(res.data);
         })

      // Get  Customer Dropdown
      axios.get(`${config.api_url}/account/all-account/${window.sessionStorage.getItem("user_id")}`)
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
            url: `${config.api_url}/transfer/${id}`,
            data: formData,
         })
            .then(function (response) {
               //handle success
               console.log(response);
               navigate(`/transfer-report/${formData.transfer_account_id}`)
            })
            .catch(function (response) {
               //handle error
               console.log("Error  : ");
               console.log(response);
            });
      } else {
         /// Check the balance befor the transactions /////
         axios.get(`${config.api_url}/account/account-balance/${formData.transfer_account_id}`)
            .then(res => {
               const transaction = res.data;
               /// If Customer has balance then make the transfer or withdrawl /////
               if (parseInt(transaction[0].total_balance) < parseInt(formData.transfer_amount)) {
                  setMessage({
                     show_message: true,
                     error_type: 'alert-danger',
                     msg: "Account doesn't have balance, you can maximum withdraw " + transaction[0].total_balance
                  });
               } else {

                  axios({
                     method: 'post',
                     url: `${config.api_url}/transfer`,
                     data: formData,
                  })
                     .then(function (response) {
                        transactionData.transaction_account_id = formData.transfer_account_id;
                        transactionData.transaction_tm_id = '3';
                        transactionData.transaction_tt_id = '2';
                        transactionData.transaction_date = formData.transfer_date;
                        transactionData.transaction_amount = formData.transfer_amount;
                        transactionData.transaction_description = 'Transfer to Beneficiary ID : ' + formData.transfer_beneficiary_id;

                        axios({
                           method: 'post',
                           url: `${config.api_url}/transaction`,
                           data: transactionData,
                        })
                        //handle success
                        console.log("Success  : ");
                        console.log(response);
                        navigate(`/transfer-report/${formData.transfer_account_id}`)
                        setMessage({
                           show_message: true,
                           error_type: 'alert-success',
                           msg: 'Your transfer registered successfully. We will connect you soon !!!'
                        });
                        setFormData(
                           {
                              transfer_id: '',
                              transfer_name: '',
                              transfer_email: '',
                              transfer_rating: '',
                              transfer_message: ''
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
                     <h2 className="pageTitle">Transfer Entry Form</h2>
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
                                 <h2 className='h2c'>Account Transfer : Entry Form</h2>
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
                                       <select name='transfer_account_id' value={formData.transfer_account_id} onChange={e => onChange(e)} className="form-control">
                                          <option>Transfer From Account Number</option>
                                          {accountDropDown.map((option) => (
                                             <option value={option.account_id}>{option.account_id}</option>
                                          ))}
                                       </select>
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="email">Transfer Type :</label>
                                    <div className="col-sm-8">
                                       <select name='transfer_beneficiary_id' value={formData.transfer_beneficiary_id} onChange={e => onChange(e)} className="form-control">
                                          <option>Select Beneficiary</option>
                                          {beneficiaryDropDown.map((option) => (
                                             <option value={option.beneficiary_id}>{option.beneficiary_name}</option>
                                          ))}
                                       </select>
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="email">Amount :</label>
                                    <div className="col-sm-8">
                                       <input type="number" value={formData.transfer_amount} onChange={e => onChange(e)} name="transfer_amount" className="form-control" placeholder="Amount" required />
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="email">Date :</label>
                                    <div className="col-sm-8">
                                       <input type="date" value={formData.transfer_date} onChange={e => onChange(e)} name="transfer_date" className="form-control" placeholder="Date" required />
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="email">Description:</label>
                                    <div className="col-sm-8">
                                       <textarea value={formData.transfer_description} onChange={e => onChange(e)} name="transfer_description" className="form-control" placeholder="Transfer Description" required></textarea>
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

TransferAdd.propTypes = {
   setAlert: PropTypes.func.isRequired,
   transfer: PropTypes.func.isRequired,
   isAuthenticated: PropTypes.bool

};
const mapStateToProps = state => ({
   isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert })(TransferAdd);