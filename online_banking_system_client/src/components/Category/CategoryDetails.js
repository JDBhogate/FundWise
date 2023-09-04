
import React, { useState, useEffect } from 'react'
import Parser from 'html-react-parser';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Link, Navigate } from 'react-router-dom';
import config from '../../utils/config';
import { withRouter } from "react-router"
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';

const ServiceDetails = () => {

   // Function for edit //
   let { id } = useParams();
   const [serviceDetails, setData] = useState({});




   useEffect(() => {
      if (id) {
         axios.get(`${config.api_url}/categories/${id}`)
            .then(res => {
               setData(res.data);
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
                           <h4 className='myhead'>Details of Service Number {serviceDetails.category_title} </h4>
                        </div>
                        <br />
                     </div>
                  </div>
                  <section class="service_area single-post-area">
                     <div class="container">
                        <div class="container-fliud">
                           <div class="wrapper row">
                             
                              <div class="details col-md-12">
                                 <table>
                                    <tr>
                                       <td>
                                          <table class="table table-striped table-hover">
                                             <tbody>
                                                <tr>
                                                   <th style={{width:"15%"}}>Name </th>
                                                   <td style={{width:"65%"}}>{serviceDetails.category_title}</td>
                                                </tr>
                                                <tr>
                                                   <th>Description </th>
                                                   <td>{serviceDetails.category_description}</td>
                                                </tr>
                                             </tbody>
                                          </table>
                                       </td>
                                       <td style={{width:"20%"}}><img src={"http://127.0.0.1:8080/uploads/" + serviceDetails.category_image_filename} className="home-pic-1"  style={{width:"150px"}}/></td>
                                    </tr>
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

export default ServiceDetails;