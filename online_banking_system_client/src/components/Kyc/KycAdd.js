import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { PropTypes } from 'prop-types';
import config from '../../utils/config';
import axios, { post } from 'axios';


const KycAdd = ({ setAlert, kyc, isAuthenticated }) => {
   const navigate = useNavigate();
   // Function for edit //
   let { id } = useParams();
   let { url } = `${config.api_url}/kyc`;

    // Creating FormData Form elements ////
    const [formData, setFormData] = useState({
      kyc_customer_id: '',
      kyc_type: '',
      kyc_number: '',
      kyc_image_filename: '',
      kyc_description: ''
   });

   const [selectedFile, setSelectedFile] = useState();
   
   useEffect(() => {
      if (id) {
         axios.get(`${config.api_url}/kyc/${id}`)
            .then(res => {
               console.log('Edit Data');
               console.log(res.data)
               setFormData(res.data);
            })
      }

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

   const [customerDropDown, setCustomerDropDown] = useState([{
      user_id: '',
      user_name: ''
   }]);


   // Handling Submit
   const onSubmit = async (e) => {
      e.preventDefault();

      // Fileupload Functionalities
      const fileData = new FormData();
      if(selectedFile){
         fileData.append('kyc_image', selectedFile, selectedFile.name);
         url =  `${config.api_url}/save-kyc`;
      } else {
         url = `${config.api_url}/save-kyc-withoutimage`;
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
               navigate("/kyc-report")
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
               url: `${config.api_url}/kyc`,
               data: fileData
            })
            .then(function (response) {
               //handle success
               console.log("Success  : ");
               console.log(response);
               navigate("/kyc-report")
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
                     <h2 className="pageTitle">Customer KYC Registration</h2>
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
                                 <h2 className='h2c'>Customer KYC Entry Form</h2>
                              </div>
                              <br />
                           </div>
                        </div>
                        <section className="vh-100">
                           <div className="d-flex justify-content-center align-items-center h-100 frmc lefta">
                              <form className="form-horizontal" onSubmit={onSubmit}>
                                 <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="email">Select Customer :</label>
                                    <div className="col-sm-8">
                                    <select name='kyc_customer_id' value={formData.kyc_customer_id} onChange={e => onChange(e)}  className="form-control">
                                       <option>Select Customer</option>
                                       {customerDropDown.map((option) => (
                                          <option value={option.user_id}>{option.user_first_name}</option>
                                       ))}
                                    </select>
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="email">Document Type:</label>
                                    <div className="col-sm-8">
                                       <input type="text" value={formData.kyc_type} onChange={e => onChange(e)} name="kyc_type" className="form-control" placeholder="Enter Document Type" required />
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="email">ID Number:</label>
                                    <div className="col-sm-8">
                                       <input type="text" value={formData.kyc_number} onChange={e => onChange(e)} name="kyc_number" className="form-control" placeholder="Enter ID Number" required />
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="email">Upload Image:</label>
                                    <div className="col-sm-8">
                                       <input type="file" value={formData.kyc_image} onChange={e => onFileChange(e)} className="form-control" placeholder="Kyc Image" />
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="email">Description:</label>
                                    <div className="col-sm-8">
                                       <textarea name="kyc_description" onChange={e => onChange(e)} className="form-control" placeholder="Enter Full Description" required value={formData.kyc_description}></textarea>
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <div className="col-sm-offset-4 col-sm-8">
                                       <button type="submit" className="btn btn-default">Submit</button>&nbsp;&nbsp;
                                       <button type="reset" className="btn btn-danger">Reset</button>
                                    </div>
                                 </div>
                                 <input type="hidden" value={formData.kyc_image_filename} class="form-control" id="kyc_image_filename" name="kyc_image_filename" />
                              </form>
                           </div>
                           {id ? (
                           <div className='lefta mar100'>
                           <img src={"http://127.0.0.1:8080/uploads/"+formData.kyc_image_filename} className='productImage'/>
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

KycAdd.propTypes = {
   setAlert: PropTypes.func.isRequired,
   kyc: PropTypes.func.isRequired,
   isAuthenticated: PropTypes.bool

};
const mapStateToProps = state => ({
   isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert })(KycAdd);