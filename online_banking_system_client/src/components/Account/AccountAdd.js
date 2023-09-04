import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { PropTypes } from 'prop-types';
import config from '../../utils/config';
import axios, { post } from 'axios';


const AccountAdd = ({ setAlert, account, isAuthenticated }) => {
   const navigate = useNavigate();
   // Function for edit //
   let { id } = useParams();
   let { url } = `${config.api_url}/account`;


    // Creating FormData Form elements ////
    const [formData, setFormData] = useState({
      account_title: '',
      account_user_photo_name: '',
      account_description: ''
   });

   const [display, setDisplay] = useState("block");

   const [categoryDropDown, setcategoryDropDown] = useState([{
      category_id: '',
      category_name: ''
   }]);

   const [branchDropDown, setBranchDropDown] = useState([{
      branch_id: '',
      branch_name: ''
   }]);

   const [customerDropDown, setCustomerDropDown] = useState([{
      user_id: '',
      user_name: ''
   }]);

   const [selectedFile, setSelectedFile] = useState();
   
   useEffect(() => {

      if(window.sessionStorage.getItem("user_level_id") == 4) {
         formData.account_customer_id = window.sessionStorage.getItem("user_id");
         setDisplay("none");
       }

      if (id) {
         axios.get(`${config.api_url}/account/${id}`)
            .then(res => {
               console.log('Edit Data');
               console.log(res.data)
               setFormData(res.data);
            })
      }

       // Get  Account Type Dropdown
       axios.get(`${config.api_url}/accountType`)
       .then(res => {
          setcategoryDropDown(res.data);
       })

       // Get  Branch Dropdown
       axios.get(`${config.api_url}/branch`)
       .then(res => {
          setBranchDropDown(res.data);
       })

        // Get  Customer Dropdown
        axios.get(`${config.api_url}/user/list/2`)
        .then(res => {
         setCustomerDropDown(res.data);
        })
   }, []);

   // Handlinng Change Event
   const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

   // On file select (from the pop up)
   const onFileChange = (e) =>
      setSelectedFile(e.target.files[0]);


   // Handling Submit
   const onSubmit = async (e) => {
      e.preventDefault();

      // Fileupload Functionalities
      const fileData = new FormData();
      if(selectedFile){
         fileData.append('account_image', selectedFile, selectedFile.name);
         url =  `${config.api_url}/save-account`;
      } else {
         url = `${config.api_url}/save-account-withoutimage`;
      }
      
      
      // Put data form in FormData
      for (let key in formData) {
         console.log("Insie Iterator"+formData[key])
         fileData.append(key, formData[key]);
      }

      
      // On submit //
      if (id) {
         console.log(url);
            axios({
               method: "put",
               url: url,
               data: fileData
            })
            .then(function (response) {
               //handle success
               console.log("Success  : ");
               console.log(response);
               navigate("/account-report")
            })
            .catch(function (response) {
               //handle error
               console.log("Error  : ");
               console.log(response);
            });
      } else {
         console.log("Starting Upload");
            axios({
               method: "post",
               url: `${config.api_url}/account`,
               data: fileData
            })
            .then(function (response) {
               //handle success
               console.log("Success  : ");
               console.log(response);
               navigate("/account-report")
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
                     <h2 className="pageTitle">Account Registration</h2>
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
                                 <h2 className='h2c'>Account Creation Form</h2>
                              </div>
                              <br />
                           </div>
                        </div>
                        <section className="vh-100">
                           <div className="d-flex justify-content-center align-items-center h-100 frmc lefta">
                              <form className="form-horizontal" onSubmit={onSubmit}>
                                 <div className="form-group" style={{display:display}}>
                                    <label className="control-label col-sm-4" htmlFor="email">Select Customer :</label>
                                    <div className="col-sm-8">
                                    <select name='account_customer_id' value={formData.account_customer_id} onChange={e => onChange(e)}  className="form-control">
                                       <option>Select Customer</option>
                                       {customerDropDown.map((option) => (
                                          <option value={option.user_id}>{option.user_first_name}</option>
                                       ))}
                                    </select>
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="email">Select Branch :</label>
                                    <div className="col-sm-8">
                                    <select name='account_branch_id' value={formData.account_branch_id} onChange={e => onChange(e)}  className="form-control">
                                       <option>Select Branch</option>
                                       {branchDropDown.map((option) => (
                                          <option value={option.branch_id}>{option.branch_ifsc}</option>
                                       ))}
                                    </select>
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="email">Select Account Type :</label>
                                    <div className="col-sm-8">
                                    <select name='account_atype_id' value={formData.account_atype_id} onChange={e => onChange(e)}  className="form-control">
                                       <option>Select Account Type</option>
                                       {categoryDropDown.map((option) => (
                                          <option value={option.atype_id}>{option.atype_name}</option>
                                       ))}
                                    </select>
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="email">Opening Date:</label>
                                    <div className="col-sm-8">
                                       <input type="date" value={formData.account_opening_date} onChange={e => onChange(e)} name="account_opening_date" className="form-control" placeholder="Enter Account Name" required />
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="email">Customer Photo:</label>
                                    <div className="col-sm-8">
                                       <input type="file" value={formData.account_user_photo} onChange={e => onFileChange(e)} className="form-control" placeholder="Account Image" />
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="email">Nominee Name:</label>
                                    <div className="col-sm-8">
                                       <input type="text" value={formData.account_nominee_name} onChange={e => onChange(e)} name="account_nominee_name" className="form-control" placeholder="Nominee Name" required />
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="email">Nominee Mobile:</label>
                                    <div className="col-sm-8">
                                       <input type="text" value={formData.account_nominee_mobile} onChange={e => onChange(e)} name="account_nominee_mobile" className="form-control" placeholder="Nominee Mobile" required />
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="email">Nominee Address:</label>
                                    <div className="col-sm-8">
                                       <input type="text" value={formData.accounht_nominee_address} onChange={e => onChange(e)} name="accounht_nominee_address" className="form-control" placeholder="Nominee Address" required />
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="email">Nominee ID Number:</label>
                                    <div className="col-sm-8">
                                       <input type="text" value={formData.account_nominee_id_number} onChange={e => onChange(e)} name="account_nominee_id_number" className="form-control" placeholder="Nominee ID Number" required />
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="email">Description:</label>
                                    <div className="col-sm-8">
                                       <textarea name="account_description" onChange={e => onChange(e)} className="form-control" placeholder="Enter Full Description" required value={formData.account_description}></textarea>
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <div className="col-sm-offset-4 col-sm-8">
                                       <button type="submit" className="btn btn-default">Submit</button>&nbsp;&nbsp;
                                       <button type="reset" className="btn btn-danger">Reset</button>
                                    </div>
                                 </div>
                                 <input type="hidden" value={formData.account_user_photo_name} className="form-control" id="account_user_photo_name" name="account_user_photo_name" />
                              </form>
                           </div>
                           {id ? (
                           <div className='lefta mar100'>
                           <img src={"http://127.0.0.1:8080/uploads/"+formData.account_user_photo_name} className='productImage'/>
                           </div>
                           ) : (
                              ''
                            )}
                        </section>
                     </div>
                  </section>
               </div>
            </div>
         </section>
      </section>
   );
};

AccountAdd.propTypes = {
   setAlert: PropTypes.func.isRequired,
   account: PropTypes.func.isRequired,
   isAuthenticated: PropTypes.bool

};
const mapStateToProps = state => ({
   isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert })(AccountAdd);