
import axios from 'axios';
import React, { useState, useEffect, Fragment } from 'react'
import { confirmAlert } from 'react-confirm-alert'; // Import
import {  useNavigate, useParams, useLocation } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Link } from 'react-router-dom';
import config from '../../utils/config';

const AccountReport = () => {

   // Function for edit //
   let { id } = useParams();
   const location = useLocation();

   // Alert message for displaying success and error ////
   const [diplay, hideActions] = useState('block123');


   const [account, setData] = useState([]);
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

      let url = `${config.api_url}/account/all-account/0`;
      if(window.sessionStorage.getItem("user_level_id") == 2) {
        url = `${config.api_url}/account/all-account/${window.sessionStorage.getItem("user_id")}`
      }

      if (location.state != null) {
         setMessage({
           show_message: true,
           error_type: location.state.error_type,
           msg: location.state.msg
         });
       }

      axios.get(url)
         .then(res => {
            const account = res.data;
            setData(account);
            setFilteredData(account);
            console.log(account);
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
      axios.delete(`${config.api_url}/account/${id}`)
         .then(res => {

            let url = `${config.api_url}/account/all-account/0`;
            if(window.sessionStorage.getItem("user_level_id") == 4) {
              url = `${config.api_url}/account/vendor-account/${window.sessionStorage.getItem("user_id")}`
            }

            axios.get(url)
            .then(res => {
               const account = res.data;
               setData(account);
               setFilteredData(account);
               setMessage({
                  show_message: true,
                  error_type: 'alert-success',
                  msg: 'Account Deleted Successfully !!!'
               });
            })
     })
   }

   const reset_search = () => {
      search_text.search_text = '';
      setFilteredData(account);
   };

   const search_data = () => {
      const newData = account.filter(account => {
         return account.customer_email.toLowerCase().includes(search_text.search_text.toLowerCase())
            || account.customer_name.toLowerCase().includes(search_text.search_text.toLowerCase())
            || account.customer_mobile.toLowerCase().includes(search_text.search_text.toLowerCase());
      });

      if (search_text.search_text) {
         setFilteredData(newData);
      } else {
         setFilteredData(account);
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
                       All Account Report
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
                              <input type="text" onChange={e => onChange(e)} name="search_text" className="form-control" placeholder="Search Account" required />
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
               <div className='add-button btn btn-success' style={{display:diplay}}><Link to="/account-add">Add New Account</Link></div>
              

                     <table className="table table-striped table-bordered table-hover">
                        <thead className="thead-dark">
                           <tr>
                              <th scope="col">ID</th>
                              <th scope="col">Customer Name</th>
                              <th scope="col">Photo</th>
                              <th scope="col">Account Type</th>
                              <th scope="col">Mobile</th>
                              <th scope="col">Email</th>
                              <th scope="col">Branch Name</th>
                              <th scope="col">Opening Date</th>
                              <th scope="col">Action</th>
                           </tr>
                        </thead>
                        <tbody>
               {
                     filteredData
                        .map(account =>
                           <tr>
                           <th scope="row">{account.account_id}</th>
                           <td>{account.customer_name}</td>
                           <td> <img className="pic-2" src={"http://127.0.0.1:8080/uploads/"+account.account_user_photo_name} /></td>
                           <td>{account.account_type}</td>
                           <td>{account.customer_mobile}</td>
                           <td>{account.customer_email}</td>
                           <td>{account.branch_name}</td>
                           <td>{account.account_opening_date}</td>
                           <td>
                              <Link to={"/transfer-report/"+account.account_id}>
                                 <span className="glyphicon glyphicon-transfer transferi"></span>
                              </Link>&nbsp;&nbsp;
                              <Link to={"/transaction-report/"+account.account_id}>
                                 <span className="glyphicon glyphicon-list-alt sharei"></span>
                              </Link>&nbsp;&nbsp;
                              <Link to={"/account-details/"+account.account_id}>
                                 <span className="glyphicon glyphicon-share sharei"></span>
                              </Link>&nbsp;&nbsp;
                              <Link to={"/account-add/"+account.account_id} style={{display:diplay}}>
                                 <span className="glyphicon glyphicon-edit editi"></span>
                              </Link>&nbsp;&nbsp;
                              <a onClick={() => confirmatioBox(account.account_id)} href="#!" style={{display:diplay}}>
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
export default AccountReport;
