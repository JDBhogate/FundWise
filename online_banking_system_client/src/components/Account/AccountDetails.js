
import React, { useState, useEffect } from 'react'
import Parser from 'html-react-parser';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Link, Navigate } from 'react-router-dom';
import config from '../../utils/config';
import { withRouter } from "react-router"
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';

const AccountDetails = () => {

   // Function for edit //
   let { id } = useParams();
   const user_id =  window.sessionStorage.getItem("user_id");

   const [accountDetails, setData] = useState({});
   const [customerDetails, setCustomerData] = useState({});
   const [kycData, setKYCData] = useState([]);




   useEffect(() => {
      if (id) {
         axios.get(`${config.api_url}/account/account-details/${id}`)
            .then(res => {
               console.log(res.data);
               setData(res.data[0]);
               /// Get Customer Data
               axios.get(`${config.api_url}/user/${res.data[0].account_customer_id}`)
               .then(res => {
                  console.log(res.data);
                  setCustomerData(res.data);
               })

                /// Get Customer KYC Data
               axios.get(`${config.api_url}/kyc/all-kyc/${res.data[0].account_customer_id}`)
               .then(res => {
                  const kyc = res.data;
                  setKYCData(kyc);
                  console.log(kyc);
               })
            })
      }

      
   }, []);

   return (
      <section>
        
         <section id="content">
            <div className="container">
               <div className="about">
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
                                          <td rowSpan={5}><img src={"http://127.0.0.1:8080/uploads/" + accountDetails.account_user_photo_name} className="home-pic-1"  style={{width:"150px"}}/></td>
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

                  <div>
                     <div>
                        <div>
                           <h4 className='myhead'>Customer KYC and Details </h4>
                        </div>
                        <br />
                     </div>
                  </div>
                  <section class="account_area single-post-area">
                     <div class="container">
                        <div class="container-fliud">
                           <div class="wrapper row">
                             
                              <div class="details col-md-12">
                              <table className="table table-striped table-bordered table-hover">
                                    <thead className="thead-dark">
                                       <tr>
                                          <th scope="col">KYC ID</th>
                                          <th scope="col">Document Type</th>
                                          <th scope="col">ID Number</th>
                                          <th scope="col">Image</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                           {
                                 kycData
                                    .map(kyc =>
                                       <tr>
                                       <th scope="row">{kyc.kyc_id}</th>
                                       <td>{kyc.kyc_type}</td>
                                       <td>{kyc.kyc_number}</td>
                                       <td> <img className="pic-2" src={"http://127.0.0.1:8080/uploads/"+kyc.kyc_image_filename} /></td>
                                    </tr>
                              )
                              }
                                 </tbody>
                                 </table>
                              </div>
                           </div>
                        </div>
                     </div>
                  </section>
               </div>
            </div>
         </section>
      </section>
   )
}

export default AccountDetails;