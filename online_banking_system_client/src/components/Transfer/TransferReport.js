
import axios from 'axios';
import React, { useState, useEffect, Fragment } from 'react'
import { confirmAlert } from 'react-confirm-alert'; // Import
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Link } from 'react-router-dom';
import config from '../../utils/config';

const TransferReport = () => {

   // Function for edit //
   let { id } = useParams();
   const location = useLocation();

   const [diplay, hideActions] = useState('block123');
   const [accountDetails, setAccountData] = useState({});
   const [customerDetails, setCustomerData] = useState({});


   const [transfer, setData] = useState([]);
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

      let url = `${config.api_url}/transfer/all-transfer/${id}`

      axios.get(url)
      .then(res => {
         const transfer = res.data;
         setData(transfer);
         setFilteredData(transfer);
         console.log(transfer);
      })

      if (location.state != null) {
         setMessage({
            show_message: true,
            error_type: location.state.error_type,
            msg: location.state.msg
         });
      }
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
   const deleteData = (transfer_id) => {
      axios.delete(`${config.api_url}/transfer/${transfer_id}`)
         .then(res => {
            let url = `${config.api_url}/transfer/account-transfer/${id}`
            axios.get(url)
            .then(res => {
               const transfer = res.data;
               setData(transfer);
               setFilteredData(transfer);
               console.log(transfer);
            })
         })
   }

   const reset_search = () => {
      search_text.search_text = '';
      setFilteredData(transfer);
   };

   const search_data = () => {
      const newData = transfer.filter(transfer => {
         return transfer.transfer_id.toLowerCase().includes(search_text.search_text.toLowerCase())
            || transfer.beneficiary_name.toLowerCase().includes(search_text.search_text.toLowerCase())
            || transfer.beneficiary_account_number.toLowerCase().includes(search_text.search_text.toLowerCase())
            || transfer.transfer_date.toLowerCase().includes(search_text.search_text.toLowerCase())
            || transfer.transfer_amount.toLowerCase().includes(search_text.search_text.toLowerCase());
      });

      if (search_text.search_text) {
         setFilteredData(newData);
      } else {
         setFilteredData(transfer);
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
                          Transfer Report of Account Number : {id}
                        </Fragment>
                     </h2>
                  </div>
               </div>
            </div>
         </section>
         <section id="content">
            <div className="container">
               
            

               <section id="content">
                  <div className="container content">
                     <div className="row">
                        <div className="col-md-12">
                           <form className="form-horizontal search_box">
                              <div className="form-group">
                                 <label className="col-sm-2" htmlFor="email">Search :</label>
                                 <div className="col-sm-4">
                                    <input type="text" onChange={e => onChange(e)} name="search_text" className="form-control" placeholder="Search Transfer" required />
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
                        <div className='add-button btn btn-success' style={{display:diplay}}><Link to="/transfer-add">Transfer Money</Link></div>
                        <table className="table table-striped table-bordered table-hover">
                           <thead className="thead-dark">
                              <tr>
                                 <th scope="col">ID</th>
                                 <th scope="col">Date</th>
                                 <th scope="col">Amount</th>
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
                                    .map(transfer =>
                                       <tr>
                                          <th scope="row">{transfer.transfer_id}</th>
                                          <td>{transfer.transfer_date}</td>
                                          <td>{transfer.transfer_amount}</td>
                                          <td>{transfer.beneficiary_name}</td>
                                          <td>{transfer.beneficiary_mobile}</td>
                                          <td>{transfer.beneficiary_bank_name}</td>
                                          <td>{transfer.beneficiary_account_number}</td>
                                          <td>{transfer.beneficiary_ifsc_code}</td>
                                          <td>{transfer.beneficiary_account_type}</td>
                                          <td>
                                             <Link to={"/transfer-details/" + transfer.transfer_id}>
                                                <span className="glyphicon glyphicon-share sharei"></span>
                                             </Link>&nbsp;&nbsp;
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
export default TransferReport;
