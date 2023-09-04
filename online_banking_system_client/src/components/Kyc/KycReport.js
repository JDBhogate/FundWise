
import axios from 'axios';
import React, { useState, useEffect, Fragment } from 'react'
import { confirmAlert } from 'react-confirm-alert'; // Import
import {  useNavigate, useParams, useLocation } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Link } from 'react-router-dom';
import config from '../../utils/config';

const KycReport = () => {

   // Function for edit //
   let { id } = useParams();
   const location = useLocation();


   const [kyc, setData] = useState([]);
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
      if (location.state != null) {
         setMessage({
           show_message: true,
           error_type: location.state.error_type,
           msg: location.state.msg
         });
       }

      axios.get(`${config.api_url}/kyc/all-kyc/0`)
         .then(res => {
            const kyc = res.data;
            setData(kyc);
            setFilteredData(kyc);
            console.log(kyc);
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
     const deleteData = (id) => {
      axios.delete(`${config.api_url}/kyc/${id}`)
         .then(res => {
            axios.get(`${config.api_url}/kyc`)
            .then(res => {
               const kyc = res.data;
               setData(kyc);
               setFilteredData(kyc);
               setMessage({
                  show_message: true,
                  error_type: 'alert-success',
                  msg: 'Kyc Deleted Successfully !!!'
               });
            })
     })
   }

   const reset_search = () => {
      search_text.search_text = '';
      setFilteredData(kyc);
   };

   const search_data = () => {
      const newData = kyc.filter(kyc => {
         return kyc.kyc_number.toLowerCase().includes(search_text.search_text.toLowerCase())
         || kyc.customer_name.toLowerCase().includes(search_text.search_text.toLowerCase());

      });

      if (search_text.search_text) {
         setFilteredData(newData);
      } else {
         setFilteredData(kyc);
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
                     <h2 className="pageTitle">
                     <Fragment>
                      Customer KYC Management
                     </Fragment>
                     </h2>
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
                              <input type="text" onChange={e => onChange(e)} name="search_text" className="form-control" placeholder="Search Kyc" required />
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
               <div className='add-button btn btn-success'><Link to="/kyc-add">Add Customer KYC</Link></div>
              

                     <table className="table table-striped table-bordered table-hover">
                        <thead className="thead-dark">
                           <tr>
                              <th scope="col">KYC ID</th>
                              <th scope="col">Customer Name</th>
                              <th scope="col">Email</th>
                              <th scope="col">Mobile</th>
                              <th scope="col">Document Type</th>
                              <th scope="col">ID Number</th>
                              <th scope="col">Image</th>
                              <th scope="col">Action</th>
                           </tr>
                        </thead>
                        <tbody>
               {
                     filteredData
                        .map(kyc =>
                           <tr>
                           <th scope="row">{kyc.kyc_id}</th>
                           <td>{kyc.customer_name}</td>
                           <td>{kyc.customer_email}</td>
                           <td>{kyc.customer_mobile}</td>
                           <td>{kyc.kyc_type}</td>
                           <td>{kyc.kyc_number}</td>
                           <td> <img className="pic-2" src={"http://127.0.0.1:8080/uploads/"+kyc.kyc_image_filename} /></td>
                           <td>
                              <Link to={"/kyc-add/"+kyc.kyc_id}>
                              <span className="glyphicon glyphicon-edit editi"></span>
                              </Link>&nbsp;&nbsp;
                              <a onClick={() => confirmatioBox(kyc.kyc_id)} href="#!">
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
      </section>
   )
}
export default KycReport;
