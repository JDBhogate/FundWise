
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Link } from 'react-router-dom';
import config from '../../utils/config';
import { withRouter } from "react-router"
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';

const TransferDetails = () => {

   // Function for edit //
   let { id } = useParams();

   const [transferDetails, setData] = useState({});

   useEffect(() => {
      if (id) {
         axios.get(`${config.api_url}/transfer/transfer-details/${id}`)
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
                     <h2 className="pageTitle">Transfer Details</h2>
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
                                 <h2 className='h2c'>Transfer Details : <span style={{color:'red'}}>Transfer ID {id}</span></h2>
                              </div>
                              <br />
                           </div>
                        </div>
                        <section className="vh-100">
                        <table class="table table-striped table-bordered" style={{width:"90%"}}>
                           <tbody>
                              <tr>
                                 <th class="thead-dark" style={{width:'25%'}}>Transfer From Account ID</th>
                                 <td style={{width:'25%'}}>{transferDetails.transfer_account_id}</td>
                                 <th class="thead-dark" style={{width:'25%'}}>Transfer Amount</th>
                                 <td style={{width:'25%'}}>{transferDetails.transfer_amount}</td>
                              </tr>
                              <tr>
                               
                              </tr>
                              <tr>
                                 <th class="thead-dark">Transfer Date</th>
                                 <td>{transferDetails.transfer_date}</td>
                                 <th class="thead-dark">Transfer Description</th>
                                 <td>{transferDetails.transfer_description}</td>
                              </tr>
                              <tr>
                                 <th class="thead-dark">Beneficiary Name</th>
                                 <td>{transferDetails.beneficiary_name}</td>
                                 <th class="thead-dark">Contact No</th>
                                 <td>{transferDetails.beneficiary_mobile}</td>
                              </tr>
                              <tr>
                                 <th class="thead-dark">Bank Name</th>
                                 <td>{transferDetails.beneficiary_bank_name}</td>
                                 <th class="thead-dark">Account Number</th>
                                 <td>{transferDetails.beneficiary_account_number}</td>
                              </tr>
                              <tr>
                                 <th class="thead-dark">IFSC Code</th>
                                 <td>{transferDetails.beneficiary_ifsc_code}</td>
                                 <th class="thead-dark">Account Type</th>
                                 <td>{transferDetails.beneficiary_account_type}</td>
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

export default TransferDetails;