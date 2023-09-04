
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Link } from 'react-router-dom';
import config from '../../utils/config';
import { withRouter } from "react-router"
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';

const TransactionDetails = () => {

   // Function for edit //
   let { id } = useParams();

   const [transactionDetails, setData] = useState({});

   useEffect(() => {
      if (id) {
         axios.get(`${config.api_url}/transaction/details/${id}`)
            .then(res => {
               console.log(res.data);
               setData(res.data[0]);
            })
      }
   }, []);

   return (
      <section>
         <section id="inner-headline">
            <div className="container">
               <div className="row">
                  <div className="col-lg-12">
                     <h2 className="pageTitle">Transaction Details</h2>
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
                                 <h2 className='h2c'>Transaction Details : <span style={{color:'red'}}>Transaction ID {id}</span></h2>
                              </div>
                              <br />
                           </div>
                        </div>
                        <section className="vh-100">
                        <table class="table table-striped table-bordered" style={{width:"50%"}}>
                           <tbody>
                              <tr>
                                 <th class="thead-dark">Account ID</th>
                                 <td>{transactionDetails.transaction_account_id}</td>
                              </tr>
                              <tr>
                                 <th class="thead-dark">Amount</th>
                                 <td>{transactionDetails.transaction_amount}</td>
                              </tr>
                              <tr>
                                 <th class="thead-dark">Transaction Type</th>
                                 <td>{transactionDetails.tt_name}</td>
                              </tr>
                              <tr>
                                 <th class="thead-dark">Transaction Method</th>
                                 <td>{transactionDetails.tm_name}</td>
                              </tr>
                              <tr>
                                 <th class="thead-dark">Transaction Date</th>
                                 <td>{transactionDetails.transaction_date}</td>
                              </tr>
                              <tr>
                                 <th class="thead-dark">Transaction Description</th>
                                 <td>{transactionDetails.transaction_description}</td>
                              </tr>
                           </tbody>
                           </table>
                        </section>
                     </div>
                  </section>
               </div>
            </div>
         </section>
      </section>
   )
}

export default TransactionDetails;