
import axios from 'axios';
import React, { useState, useEffect, Fragment } from 'react'
import { confirmAlert } from 'react-confirm-alert'; // Import
import {  useNavigate, useParams, useLocation } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Link } from 'react-router-dom';
import config from '../../utils/config';

const BeneficiaryReport = () => {

   // Function for edit //
   let { id } = useParams();
   const location = useLocation();


   const [beneficiary, setData] = useState([]);
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

      axios.get(`${config.api_url}/beneficiary/all-beneficiary/${id}`)
         .then(res => {
            const beneficiary = res.data;
            setData(beneficiary);
            setFilteredData(beneficiary);
            console.log(beneficiary);
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
      axios.delete(`${config.api_url}/beneficiary/${id}`)
         .then(res => {
            axios.get(`${config.api_url}/beneficiary`)
            .then(res => {
               const beneficiary = res.data;
               setData(beneficiary);
               setFilteredData(beneficiary);
               setMessage({
                  show_message: true,
                  error_type: 'alert-success',
                  msg: 'Beneficiary Deleted Successfully !!!'
               });
            })
     })
   }

   const reset_search = () => {
      search_text.search_text = '';
      setFilteredData(beneficiary);
   };

   const search_data = () => {
      const newData = beneficiary.filter(beneficiary => {
         return beneficiary.beneficiary_name.toLowerCase().includes(search_text.search_text.toLowerCase())
            || beneficiary.beneficiary_account_number .toLowerCase().includes(search_text.search_text.toLowerCase())
            || beneficiary.beneficiary_bank_name.toLowerCase().includes(search_text.search_text.toLowerCase());
      });

      if (search_text.search_text) {
         setFilteredData(newData);
      } else {
         setFilteredData(beneficiary);
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
                        {
                          id == "1" ? "All Admin Report" :
                          id == "3" ? "All Delivery Person Report" :
                          id == "2" ? "All Customer Report" : ''
                        }
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
                              <input type="text" onChange={e => onChange(e)} name="search_text" className="form-control" placeholder="Search Beneficiary" required />
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
               <div className='add-button btn btn-success'><Link to="/beneficiary-add">Add New Beneficiary</Link></div>
              

                     <table className="table table-striped table-bordered table-hover">
                        <thead className="thead-dark">
                           <tr>
                              <th scope="col">ID</th>
                              <th scope="col">Beneficiary Name</th>
                              <th scope="col">Contact No</th>
                              <th scope="col">Bank Name</th>
                              <th scope="col">Account Number</th>
                              <th scope="col">IFSC Code</th>
                              <th scope="col">Account Type</th>
                              <th scope="col">Action</th>
                           </tr>
                        </thead>
                        <tbody>
               {
                     filteredData
                        .map(beneficiary =>
                           <tr>
                           <th scope="row">{beneficiary.beneficiary_id}</th>
                           <td>{beneficiary.beneficiary_name}</td>
                           <td>{beneficiary.beneficiary_mobile}</td>
                           <td>{beneficiary.beneficiary_bank_name}</td>
                           <td>{beneficiary.beneficiary_account_number}</td>
                           <td>{beneficiary.beneficiary_ifsc_code}</td>
                           <td>{beneficiary.beneficiary_account_type}</td>
                           <td>
                              <Link to={"/beneficiary-add/"+beneficiary.beneficiary_id}>
                              <span className="glyphicon glyphicon-edit editi"></span>
                              </Link>&nbsp;&nbsp;
                              <a onClick={() => confirmatioBox(beneficiary.beneficiary_id)} href="#!">
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
export default BeneficiaryReport;
