
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Link } from 'react-router-dom';
import config from '../../utils/config';

const HopitalList = () => {

   const [transfers, setData] = useState([]);
   const [search_text, setSearchData] = useState([]);
   const [filteredData, setFilteredData] = useState([]);
   /**
    * Function for getting lists
    */
   useEffect(() => {
      axios.get(`${config.api_url}/transfer`)
         .then(res => {
            const transfers = res.data;
            setData(transfers);
            setFilteredData(transfers);
            console.log(transfers);
         })
   }, []);

   const reset_search = () => {
      search_text.search_text = '';
      setFilteredData(transfers);
   };

   const search_data = () => {
      const newData = transfers.filter(transfer => {
         return transfer.transfer_name.toLowerCase().includes(search_text.search_text.toLowerCase())
         || transfer.transfer_city.toLowerCase().includes(search_text.search_text.toLowerCase())
         || transfer.transfer_state.toLowerCase().includes(search_text.search_text.toLowerCase());
       });

      if(search_text.search_text) {
         setFilteredData(newData);
      } else {
         setFilteredData(transfers);
      }
   };

    // Handlinng Change Event
    const onChange = (e) =>
    setSearchData({[e.target.name]: e.target.value });

   return (
      <section>
         <section id="inner-headline">
            <div className="container">
               <div className="row">
                  <div className="col-lg-12">
                     <h2 className="pageTitle">All Packers and Movers</h2>
                  </div>
               </div>
            </div>
         </section>
         <section id="content">
            <div className="container content">
               <div className="row">
                  <div className="col-md-12">
                     <div>
                        <h2>All Packers and Movers</h2>
                        These all are available Packers and Movers Agent. Kindly click on the packers and movers to see the details of it.
                     </div>
                     <br />
                     <form className="form-horizontal search_box">
                        <div className="form-group">
                           <label className="col-sm-2" htmlFor="email">Search Agent:</label>
                           <div className="col-sm-4">
                              <input type="text" onChange={e => onChange(e)} name="search_text" className="form-control" placeholder="Search Agents/Cities/States" required />
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
                        .map(transfer =>
                           <div className="col-sm-4 info-blocks">
                              <i className="icon-info-blocks"><Link to={"/transfer-details/" + transfer.transfer_id}><img src='img/movers.jpeg' width={50} /></Link></i>
                              <div className="info-blocks-in">
                                 <h3><Link to={"/transfer-details/" + transfer.transfer_id}>{transfer.transfer_name} ({transfer.transfer_city})</Link></h3>
                                 <p>
                                    <table>
                                       <tr>
                                          <td>Contact : </td>
                                          <td>{transfer.transfer_contact}</td>
                                       </tr>
                                       <tr>
                                          <td>Email :</td>
                                          <td>{transfer.transfer_email}</td>
                                       </tr>
                                    </table>
                                 </p>
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
export default HopitalList;