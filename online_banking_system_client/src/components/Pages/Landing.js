
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import config from '../../utils/config';



const Landing = () => {
   const [categories, setData] = useState([]);

   /**
    * Function for getting lists
    */
   useEffect(() => {
      axios.get(`${config.api_url}/categories`)
      .then(res => {
         const categories = res.data;
         setData(categories);
      })
   }, []);


   return (
      <section>
         <div className="home-page">
            <section id="banner">
               <div id="main-slider" className="flexslider">
                  <ul className="slides">
                     <li>
                        <img src="img/slides/1.jpeg" alt="flexslider" style={{ height: 400 }} />
                        <div className="flex-caption">
                           {/* <h3>Online Shopping System</h3>
                           <p>One stop solution for managing all blood banks and invetories</p> */}
                        </div>
                     </li>
                     <li>
                        <img src="img/slides/2.jpeg" alt="flexslider" style={{ height: 400 }} />
                        <div className="flex-caption">

                        </div>
                     </li>
                  </ul>
               </div>
            </section>
               
            <section>
            <div className="container py-5">
               <h4 className="myhead"><strong>Online Banking System - One stop solution for all banking needs</strong></h4>
               <p>Online banking allows you to conduct financial transactions via the Internet. Online banking is also known as Internet banking or web banking.Online banking offers customers almost every service traditionally available through a local branch including deposits, transfers, and online bill payments. Virtually every banking institution has some form of online banking you can access through a computer or app. With online banking, you aren't required to visit a bank branch to complete most of your basic banking transactions. You can do all of this at your own convenience, wherever you want—at home, at work, or on the go. Online banking can be done using a browser or app. Mobile banking is online banking that is done on a phone or tablet.</p>
            </div>
            </section>
         
            <section>
            <div className="container py-5">
               <h4 className="myhead"><strong>Our Banking Services</strong></h4>
               <p>Online-only banks may not provide direct ATM access but will make provisions for customers to use ATMs at other banks and retail stores. They may reimburse you for some of the ATM fees charged by other financial institutions. Reduced overhead costs associated with not having physical branches typically allow online banks to offer significant savings on banking fees. They also offer higher interest rates on savings accounts.</p>
               <div className="row">
               {
                     categories
                        .map(category =>
                           <div className="col-md-6 col-lg-4" style={{width:"16.33%"}}>
                           <div className="single_service">
                               <div className="thumb">
                                 <img className="home-pic-1" style={{height:"150px"}} src={"http://127.0.0.1:8080/uploads/"+category.category_image_filename} />
                               </div>
                               <div className="service_info">
                                   <h3><Link to={"/products/"+category.category_id}>{category.category_title}</Link></h3>
                               </div>
                           </div>
                       </div>
                    )
                  }
               </div>
            </div>
            </section>
            
            <section className="aboutUs">
               <div className="container">
                  <div className="row" style={{marginBottom:"30px"}}>
                     <div className="col-md-6"><img src="img/home.jpeg" className="img-center" alt="" /></div>
                     <div className="col-md-6">
                        <div>
                           <h2>About Online Banking System</h2>
                           <p>Online banking allows you to conduct financial transactions via the Internet. Online banking is also known as Internet banking or web banking.Online banking offers customers almost every service traditionally available through a local branch including deposits, transfers, and online bill payments.</p>
                           <p> Virtually every banking institution has some form of online banking you can access through a computer or app. With online banking, you aren't required to visit a bank branch to complete most of your basic banking transactions. You can do all of this at your own convenience, wherever you want—at home, at work, or on the go. Online banking can be done using a browser or app. Mobile banking is online banking that is done on a phone or tablet.</p>
                        </div>
                        <br />
                     </div>
                  </div>
               </div>
            </section>
         </div>
         <a href="#" className="scrollup"><i className="fa fa-angle-up active"></i></a>
      </section>
   )
}

export default Landing;