
import axios from 'axios';
import Parser from 'html-react-parser';
import React, { useState, useEffect } from 'react'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Link,useParams } from 'react-router-dom';
import config from '../../utils/config';

const AccountList = () => {

   let { id } = useParams();
   const [accounts, setData] = useState([]);
   const [search_text, setSearchData] = useState([]);
   const [filteredData, setFilteredData] = useState([]);
   /**
    * Function for getting lists
    */
   useEffect(() => {
      axios.get(`${config.api_url}/account/all-account/${id}`)
         .then(res => {
            const accounts = res.data;
            setData(accounts);
            setFilteredData(accounts);
            console.log(accounts);
         })
   }, []);

   const reset_search = () => {
      search_text.search_text = '';
      setFilteredData(accounts);
   };

   const search_data = () => {
      const newData = accounts.filter(account => {
         return account.account_title.toLowerCase().includes(search_text.search_text.toLowerCase())
            || account.category_title.toLowerCase().includes(search_text.search_text.toLowerCase());
      });

      if (search_text.search_text) {
         setFilteredData(newData);
      } else {
         setFilteredData(accounts);
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
                     <h2 className="pageTitle">All Accounts</h2>
                  </div>
               </div>
            </div>
         </section>
         <section id="content">
            <div className="container content">
               <div className="row">
                  <div className="col-md-12">
                     <div>
                        <h2>All Accounts</h2>
                        These all are available accounts. Kindly click on the accounts to see the details of it.
                     </div>
                     <br />
                     <form className="form-horizontal search_box">
                        <div className="form-group">
                           <label className="col-sm-2" htmlFor="email">Search Accounts:</label>
                           <div className="col-sm-4">
                              <input type="text" onChange={e => onChange(e)} name="search_text" className="form-control" placeholder="Search Accounts" required />
                           </div>
                           <div className="col-sm-4">
                              <button type="button" className="btn btn-default" onClick={search_data}>Search</button>&nbsp;&nbsp;
                              <button type="reset" className="btn btn-danger" onClick={reset_search}>Reset</button>
                           </div>
                        </div>
                     </form>
                  </div>
               </div>
               <div className="row">
               {
                     filteredData
                        .map(account =>
                        <div className="col-md-3 col-sm-6 account-list">
                           <div className="account-grid">
                              <div className="account-image">
                                 <a href="#" className="image">
                                    <img className="pic-1" src={"http://127.0.0.1:8080/uploads/"+account.account_image_filename} />
                                 </a>
                                 <span class="account-sale-label">{account.category_title}</span>
                                 <ul className="account-links">
                                    <li><Link to={"/account-details/" + account.account_id}><i className="fa fa-shopping-bag"></i> Add to cart</Link></li>
                                    <li><Link to={"/account-details/" + account.account_id}><i className="fa fa-search"></i> Quick View</Link></li>
                                 </ul>
                              </div>
                              <div className="account-content">
                                 <h3 className="title"><a href="#">{account.account_title}</a></h3>
                                 <div className="price">Cost : {Parser(config.currency_symbol)} {account.account_cost}.00/-</div>
                              </div>
                           </div>
                        </div>
                    )
                  }
               </div>
            </div>
         </section>
      </section>
   )
}
export default AccountList;