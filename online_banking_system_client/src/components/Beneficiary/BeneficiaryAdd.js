import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import config from '../../utils/config';
import md5 from 'md5';


const BeneficiaryAdd = () => {
   const navigate = useNavigate();
   const location = useLocation();

   // Function for edit //
   let { id } = useParams();

   // Alert message for displaying success and error ////
   const [message, setMessage] = useState({
      show_message: false,
      error_type: '',
      msg: ''
   });

   // Creating FormData Form elements ////
   const [formData, setFormData] = useState({
      beneficiary_id: '',
      beneficiary_user_id: '',
      beneficiary_name: '',
      beneficiary_mobile: '',
      beneficiary_email: '',
      beneficiary_address: '',
      beneficiary_city: '',
      beneficiary_state: '',
      beneficiary_country: '',
      beneficiary_account_number: '',
      beneficiary_account_type: '',
      beneficiary_ifsc_code: '',
      beneficiary_bank_name: ''
   });

   useEffect(() => {

      if (location.state != null) {
         setMessage({
            show_message: true,
            error_type: location.state.error_type,
            msg: location.state.msg
         });
      }

      if (id) {
         axios.get(`${config.api_url}/beneficiary/${id}`)
            .then(res => {
               console.log('Edit Data');
               console.log(res.data)
               setFormData(res.data);
            })
      }
   }, []);

   // Handlinng Change Event
   const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

   // Handling Submit
   const onSubmit = async (e) => {
      e.preventDefault();
      formData.beneficiary_user_id = window.sessionStorage.getItem("user_id");
      // On submit //
      if (id) {
         axios({
            method: 'put',
            url: `${config.api_url}/beneficiary/${id}`,
            data: formData,
         })
            .then(function (response) {
               //handle success
                  setMessage({
                     show_message: true,
                     error_type: 'alert-success',
                     msg: 'Beneficiary Details Updated Successfully'
                  });
                  navigate("/beneficiary-report/" + formData['beneficiary_user_id'],
                     {
                        state:
                           { msg: 'Beneficiary Details Updated Successfully !!!', error_type: 'alert-success' }
                     }
                  )
            })
            .catch(function (response) {
               //handle error
               console.log("Error  : ");
               console.log(response);
            });
      } else {
         console.log("beneficiary data");
         axios({
            method: 'post',
            url: `${config.api_url}/beneficiary`,
            data: formData,
         })
            .then(function (response) {
               //handle success
               console.log("Success  : ");
               console.log(response);
               navigate("/beneficiary-report/" + formData['beneficiary_user_id'],
                  {
                     state:
                        { msg: 'Account Registered Successfully !!!', error_type: 'alert-success' }
                  })
               // navigate("/BeneficiaryLogin")
            })
            .catch(function (response) {
               //handle error
               console.log("Error  : ");
               console.log(response);
            });
      }
   };

   return (
      <section>
         <section id="inner-headline">
            <div className="container">
               <div className="row">
                  <div className="col-lg-12">
                     <h2 className="pageTitle">Beneficiary Registration</h2>
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
                                 <h2 className='h2c'>Beneficiary Registration Form</h2>
                              </div>
                              <br />
                           </div>
                        </div>
                        <section className="vh-100">
                           {message.show_message ? (
                              <div className={'alert ' + message.error_type} role="alert">
                                 {message.msg}
                              </div>
                           ) : (
                              ''
                           )}
                           <div className='lgfrm'>
                              <form onSubmit={onSubmit} className="form-horizontal">
                                 <div>
                                    <div className="row">
                                       <div className="col">
                                          <label>Name</label>
                                          <input type="text" className="form-control" id="beneficiary_name" required name="beneficiary_name" value={formData.beneficiary_name} onChange={e => onChange(e)} />
                                       </div>
                                       <div className="col">
                                          <label>Mobile</label>
                                          <input type="text" className="form-control" id="beneficiary_mobile" name="beneficiary_mobile" value={formData.beneficiary_mobile} onChange={e => onChange(e)} />
                                       </div>
                                    </div>
                                 </div>
                                 <div className="row">
                                    <div className="col">
                                       <label>Email</label>
                                       <input type="text" className="form-control" id="beneficiary_email" required name="beneficiary_email" value={formData.beneficiary_email} onChange={e => onChange(e)} />
                                    </div>
                                 </div>
                                 <div className="row">
                                    <div className="col">
                                       <label>Full Address</label>
                                       <input type="text" className="form-control" id="beneficiary_address" required name="beneficiary_address" value={formData.beneficiary_address} onChange={e => onChange(e)} />
                                    </div>
                                    <div className="col">
                                       <label>City</label>
                                       <input type="text" className="form-control" id="beneficiary_city" required name="beneficiary_city" value={formData.beneficiary_city} onChange={e => onChange(e)} />
                                    </div>
                                 </div>
                                 <div className="row">
                                    <div className="col">
                                       <label>State</label>
                                       <input type="text" className="form-control" id="beneficiary_state" required name="beneficiary_state" value={formData.beneficiary_state} onChange={e => onChange(e)} />
                                    </div>
                                    <div className="col">
                                       <label>Country</label>
                                       <input type="text" className="form-control" id="beneficiary_country" required name="beneficiary_country" value={formData.beneficiary_country} onChange={e => onChange(e)} />
                                    </div>
                                 </div>
                                 <div className="row">
                                    <div className="col">
                                       <label>Account Number</label>
                                       <input type="text" className="form-control" id="beneficiary_account_number" required name="beneficiary_account_number" value={formData.beneficiary_account_number} onChange={e => onChange(e)} />
                                    </div>
                                    <div className="col">
                                       <label>Account Type</label>
                                       <input type="text" className="form-control" id="beneficiary_account_type" required name="beneficiary_account_type" value={formData.beneficiary_account_type} onChange={e => onChange(e)} />
                                    </div>
                                 </div>
                                 <div className="row">
                                    <div className="col">
                                       <label>IFSC Code</label>
                                       <input type="text" className="form-control" id="beneficiary_ifsc_code" required name="beneficiary_ifsc_code" value={formData.beneficiary_ifsc_code} onChange={e => onChange(e)} />
                                    </div>
                                    <div className="col">
                                       <label>Bank Name</label>
                                       <input type="text" className="form-control" id="beneficiary_bank_name" required name="beneficiary_bank_name" value={formData.beneficiary_bank_name} onChange={e => onChange(e)} />
                                    </div>
                                 </div>
                                 <div className='lgbtn'>
                                    <button type="submit" className="btn btn-success">Submit</button>&nbsp;&nbsp;
                                    <button type="reset" className="btn btn-danger">Reset</button>
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

export default BeneficiaryAdd;