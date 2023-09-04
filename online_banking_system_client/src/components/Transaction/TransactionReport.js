
import axios from 'axios';
import React, { useState, useEffect, Fragment } from 'react'
import { confirmAlert } from 'react-confirm-alert'; // Import
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Link } from 'react-router-dom';
import config from '../../utils/config';

const TransactionReport = () => {

   // Function for edit //
   let { id } = useParams();
   const location = useLocation();

   const [diplay, hideActions] = useState('block123');
   const [accountDetails, setAccountData] = useState({});
   const [customerDetails, setCustomerData] = useState({});


   const [transaction, setData] = useState([]);
   const [balance, setBalance] = useState([]);
   const [search_text, setSearchData] = useState([]);
   const [filteredData, setFilteredData] = useState([]);

   // Alert message for displaying success and error ////
   const [message, setMessage] = useState({
      show_message: false,
      error_type: '',
      msg: ''
   });
   /**
    * Function for getting lists
    */
   useEffect(() => {

      if(window.sessionStorage.getItem("user_level_id") == 2) {
         hideActions('none');
      }
      
      let url = `${config.api_url}/transaction/account-transaction/${id}`

      axios.get(url)
      .then(res => {
         const transaction = res.data;
         setData(transaction);
         setFilteredData(transaction);
         console.log(transaction);
      })

      axios.get(`${config.api_url}/account/account-balance/${id}`)
      .then(res => {
         const transaction = res.data;
         setBalance(transaction[0]);
      })

      if (location.state != null) {
         setMessage({
            show_message: true,
            error_type: location.state.error_type,
            msg: location.state.msg
         });
      }

      axios.get(`${config.api_url}/account/account-details/${id}`)
         .then(res => {
            console.log(res.data);
            setAccountData(res.data[0]);
            /// Get Customer Data
            axios.get(`${config.api_url}/user/${res.data[0].account_customer_id}`)
               .then(res => {
                  console.log(res.data);
                  setCustomerData(res.data);
               })
         })
   }, []);

   /**
    * Confirmation Dialogue Implementation
    */
   const confirmatioBox = (id) => {
      confirmAlert({
         title: 'Confirm to delete',
         message: 'Are you sure to delete this record ?',
         buttons: [
            {
               label: 'Yes',
               onClick: () => deleteData(id)
            },
            {
               label: 'No'
            }
         ]
      });
   }

   /**
    * Function for deleting data
    * @param {*} id 
    */
   const deleteData = (transaction_id) => {
      axios.delete(`${config.api_url}/transaction/${transaction_id}`)
         .then(res => {
            let url = `${config.api_url}/transaction/account-transaction/${id}`
            axios.get(url)
            .then(res => {
               const transaction = res.data;
               setData(transaction);
               setFilteredData(transaction);
               console.log(transaction);
            })
         })
   }

   const reset_search = () => {
      search_text.search_text = '';
      setFilteredData(transaction);
   };

   const search_data = () => {
      const newData = transaction.filter(transaction => {
         return transaction.transaction_id.toLowerCase().includes(search_text.search_text.toLowerCase())
            || transaction.transaction_date.toLowerCase().includes(search_text.search_text.toLowerCase())
            || transaction.transaction_amount.toLowerCase().includes(search_text.search_text.toLowerCase());
      });

      if (search_text.search_text) {
         setFilteredData(newData);
      } else {
         setFilteredData(transaction);
      }
   };

   // Handlinng Change Event
   const onChange = (e) =>
      setSearchData({ [e.target.name]: e.target.value });

   return (
      <section>
         <section id="inner-headline">
            <div className="container">
               <div className="row">
                  <div className="col-lg-12">
                     <h2 className="pageTitle" style={{fontSize:'26px', color:'red'}}>
                        <Fragment>
                          Transaction Report of Account Number : {accountDetails.account_id}
                        </Fragment>
                     </h2>
                  </div>
               </div>
            </div>
         </section>
         <section id="content">
            <div className="container">
               <div>
                  <div>
                     <div>
                        <h4 className='myhead'>Details of Account Number {accountDetails.account_id} </h4>
                     </div>
                     <br />
                  </div>
               </div>
               <section class="account_area single-post-area">
                  <div class="container">
                     <div class="container-fliud">
                        <div class="wrapper row">
                           <div class="details col-md-12">
                              <table class="table table-striped table-hover">
                                 <tbody>
                                    <tr>
                                       <th>Account ID : </th>
                                       <td>{accountDetails.account_id}</td>
                                       <th>Account Type : </th>
                                       <td>{accountDetails.account_type}</td>
                                       <td rowSpan={5}><img src={"http://127.0.0.1:8080/uploads/" + accountDetails.account_user_photo_name} className="home-pic-1" style={{ width: "150px" }} /></td>
                                    </tr>
                                    <tr>
                                       <th>Opening Date : </th>
                                       <td>{accountDetails.account_opening_date}</td>
                                       <th>Branch Name : </th>
                                       <td>{accountDetails.branch_name}</td>
                                    </tr>
                                    <tr>
                                       <th>Nominee Name : </th>
                                       <td>{accountDetails.account_nominee_name}</td>
                                       <th>Nominee Mobile : </th>
                                       <td>{accountDetails.account_nominee_mobile}</td>
                                    </tr>
                                    <tr>
                                       <th>Nominee Address : </th>
                                       <td>{accountDetails.accounht_nominee_address}</td>
                                       <th>Nominee ID Number : </th>
                                       <td>{accountDetails.account_nominee_id_number}</td>
                                    </tr>
                                 </tbody>
                              </table>

                           </div>
                        </div>
                     </div>
                  </div>
               </section>

               <div>
                  <div>
                     <div>
                        <h4 className='myhead'>Details of Customer </h4>
                     </div>
                     <br />
                  </div>
               </div>
               <section class="account_area single-post-area">
                  <div class="container">
                     <div class="container-fliud">
                        <div class="wrapper row">

                           <div class="details col-md-12">
                              <table class="table table-striped table-hover">
                                 <tbody>
                                    <tr>
                                       <th>Name : </th>
                                       <td>{customerDetails.user_first_name} {customerDetails.user_last_name}</td>
                                       <th>Date of Birth : </th>
                                       <td>{customerDetails.user_dob}</td>
                                    </tr>
                                    <tr>
                                       <th>Address : </th>
                                       <td>{customerDetails.user_address}</td>
                                       <th>City : </th>
                                       <td>{customerDetails.user_city}</td>
                                    </tr>
                                    <tr>
                                       <th>State : </th>
                                       <td>{customerDetails.user_state}</td>
                                       <th>Country : </th>
                                       <td>{customerDetails.user_country}</td>
                                    </tr>
                                    <tr>
                                       <th>Contact Number : </th>
                                       <td>{customerDetails.user_mobile}</td>
                                       <th>Email : </th>
                                       <td>{customerDetails.user_email}</td>
                                    </tr>
                                    <tr>
                                       <th>Nationality : </th>
                                       <td>{customerDetails.user_nationalty}</td>
                                    </tr>
                                 </tbody>
                              </table>

                           </div>
                        </div>
                     </div>
                  </div>
               </section>

               <section id="content">
                  <div className="container content">
                     <div className="row">
                        <div className="col-md-12">
                           <form className="form-horizontal search_box">
                              <div className="form-group">
                                 <label className="col-sm-2" htmlFor="email">Search :</label>
                                 <div className="col-sm-4">
                                    <input type="text" onChange={e => onChange(e)} name="search_text" className="form-control" placeholder="Search Transaction" required />
                                 </div>
                                 <div className="col-sm-4">
                                    <button type="button" className="btn btn-default" onClick={search_data}>Search</button>&nbsp;&nbsp;
                                    <button type="reset" className="btn btn-danger" onClick={reset_search}>Reset</button>
                                 </div>
                              </div>
                           </form>
                        </div>
                     </div>
                     <div>
                        {message.show_message ? (
                           <div className={'alert ' + message.error_type} role="alert">
                              {message.msg}
                           </div>
                        ) : (
                           ''
                        )}
                     </div>
                     <div className="row">
                        <div className='add-button btn btn-success' style={{display:diplay}}><Link to="/transaction-add">Add New Transaction</Link></div>

                        <table className="table table-striped table-bordered table-hover">
                           <tr>
                              <th className='th_balance'>Available Balance</th>
                              <td className='td_balance'>{balance.total_balance}</td>
                              <th className='th_balance'>Total Credited Amount</th>
                              <td className='td_balance'>{balance.total_credit}</td>
                              <th className='th_balance'>Total Debited Amount</th>
                              <td className='td_balance'>{balance.total_debit}</td>
                           </tr>
                        </table>
                        <table className="table table-striped table-bordered table-hover">
                           <thead className="thead-dark">
                              <tr>
                                 <th scope="col">ID</th>
                                 <th scope="col">Date</th>
                                 <th scope="col">Amount</th>
                                 <th scope="col">Type</th>
                                 <th scope="col">Method</th>
                                 <th scope="col">Action</th>
                              </tr>
                           </thead>
                           <tbody>
                              {
                                 filteredData
                                    .map(transaction =>
                                       <tr>
                                          <th scope="row">{transaction.transaction_id}</th>
                                          <td>{transaction.transaction_date}</td>
                                          <td>{transaction.transaction_amount}</td>
                                          <td>{transaction.tt_name}</td>
                                          <td>{transaction.tm_name}</td>
                                          <td>
                                             <Link to={"/transaction-details/" + transaction.transaction_id}>
                                                <span className="glyphicon glyphicon-share sharei"></span>
                                             </Link>&nbsp;&nbsp;
                                             <Link to={"/transaction-add/" + transaction.transaction_id} style={{display:diplay}}>
                                                <span className="glyphicon glyphicon-edit editi"></span>
                                             </Link>&nbsp;&nbsp;
                                             <a onClick={() => confirmatioBox(transaction.transaction_id)} href="#!"  style={{display:diplay}}>
                                                <span className="glyphicon glyphicon-trash deletei"></span>
                                             </a>
                                          </td>
                                       </tr>
                                    )
                              }
                           </tbody>
                        </table>
                     </div>
                  </div>
               </section>
               <div className='printbutton'>
                  <button type="button" className="btn btn-danger" onClick={() =>window.print()}>Print Page</button>
               </div>
            </div>
         </section>
      </section>
   )
}
export default TransactionReport;
