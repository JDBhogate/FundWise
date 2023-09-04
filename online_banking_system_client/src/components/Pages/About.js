
import React from 'react'
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import  PropTypes  from 'prop-types';


const Landing = ({isAuthenticated}) => {
    if(isAuthenticated){
        return <Navigate to ='/Dashboard'/> 
    }
return (
<section>
<section id="inner-headline">
   <div className="container">
      <div className="row">
         <div className="col-lg-12">
            <h2 className="pageTitle">About Online Banking System</h2>
         </div>
      </div>
   </div>
</section>
<section id="content">
   <div className="container">
      <div className="about">
         <section className="features">
            <div className="container">
               <div className="row">
                  <div className="col-md-12">
                     <div>
                        <h2>About Online Banking System</h2>
                           <p>Online banking allows you to conduct financial transactions via the Internet. Online banking is also known as Internet banking or web banking.Online banking offers customers almost every service traditionally available through a local branch including deposits, transfers, and online bill payments. Virtually every banking institution has some form of online banking you can access through a computer or app. With online banking, you aren't required to visit a bank branch to complete most of your basic banking transactions. You can do all of this at your own convenience, wherever you want—at home, at work, or on the go. Online banking can be done using a browser or app. Mobile banking is online banking that is done on a phone or tablet.</p>
                           <p>Online banking allows you to conduct financial transactions via the Internet. Online banking is also known as Internet banking or web banking.Online banking offers customers almost every service traditionally available through a local branch including deposits, transfers, and online bill payments. Virtually every banking institution has some form of online banking you can access through a computer or app. With online banking, you aren't required to visit a bank branch to complete most of your basic banking transactions. You can do all of this at your own convenience, wherever you want—at home, at work, or on the go. Online banking can be done using a browser or app. Mobile banking is online banking that is done on a phone or tablet.</p>
                    </div>
                     <br/>
                  </div>
               </div>
               <div className="row">
                  <div className="col-md-6">
                     <div className="features-item">
                        <div className="features">
                           <div className="icon">
                              <i className="icon-map icons"></i>
                           </div>
                           <div className="features-content">
                              <h3>Online Banking System</h3>
                              <p>Online banking allows you to conduct financial transactions via the Internet. Online banking is also known as Internet banking or web banking.Online banking offers customers almost every service traditionally available</p>
                           </div>
                        </div>
                        <div className="features">
                           <div className="icon">
                              <i className="icon-envelope-open icons"></i>
                           </div>
                           <div className="features-content">
                              <h3>User Registeration Ssystem</h3>
                              <p>Online banking allows you to conduct financial transactions via the Internet. Online banking is also known as Internet banking or web banking.Online banking offers customers almost every service traditionally available</p>
                           </div>
                        </div>
                        <div className="features">
                           <div className="icon">
                              <i className="icon-badge icons"></i>
                           </div>
                           <div className="features-content">
                              <h3>Online Payment System</h3>
                              <p>Online banking allows you to conduct financial transactions via the Internet. Online banking is also known as Internet banking or web banking.Online banking offers customers almost every service traditionally available</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="col-md-6">
                     <img className="img-responsive" src="img/home.jpeg" alt="" style={{height:350}}/>
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
Landing.propTypes={
isAuthenticated:PropTypes.bool
}
const mapStateToProps =state=>
 ({
isAuthenticated:state.auth.isAuthenticated
 })

export default connect(mapStateToProps)(Landing);
