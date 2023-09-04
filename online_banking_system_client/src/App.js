import React, { Fragment, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/Layout/Alert'
import Header from './components/Layout/Header';

import './App.css';
import About from './components/Pages/About';
import Landing from './components/Pages/Landing';
import Login from './components/auth/login';
import Adminlogin from './components/auth/Adminlogin'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { loaduser } from './actions/auth';
import setauthtoken from './utils/setauthtoken';
import Footer from './components/Layout/Footer';
import Dashboard from './components/auth/Dashboard';
import UserReport from './components/User/UserReport'
import UserLogin from './components/User/UserLogin'
import UserAdd from './components/User/UserAdd';
import FeedbackReport from './components/Feedback/FeedbackReport'
import FeedbackAdd from './components/Feedback/FeedbackAdd';
import FeedbackList from './components/Feedback/FeedbackList';
import FeedbackDetails from './components/Feedback/FeedbackDetails';
import CategoryList from './components/Category/CategoryList';
import CategoryReport from './components/Category/CategoryReport';
import CategoryDetails from './components/Category/CategoryDetails';
import CategoryAdd from './components/Category/CategoryAdd';
import AccountAdd from './components/Account/AccountAdd';
import AccountDetails from './components/Account/AccountDetails';
import AccountReport from './components/Account/AccountReport';
import KycAdd from './components/Kyc/KycAdd';
import KycReport from './components/Kyc/KycReport';
import TransactionAdd from './components/Transaction/TransactionAdd';
import TransactionReport from './components/Transaction/TransactionReport';
import TransactionDetails from './components/Transaction/TransactionDetails';
import BeneficiaryAdd from './components/Beneficiary/BeneficiaryAdd';
import BeneficiaryReport from './components/Beneficiary/BeneficiaryReport';
import TransferAdd from './components/Transfer/TransferAdd';
import TransferReport from './components/Transfer/TransferReport';
import TransferDetails from './components/Transfer/TransferDetails';


if (localStorage.token) {
  setauthtoken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loaduser());
  }, [])
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Header />
          <Alert />
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/Adminlogin' element={<Adminlogin />} />
            <Route path='/About' element={<About />} />
            
            <Route path='/account-add' element={<AccountAdd />} />
            <Route path='/account-add/:id' element={<AccountAdd />} />
            <Route path='/account-details/:id' element={<AccountDetails />} />
            <Route path='/account-report' element={<AccountReport />} />


            <Route path='/category-add' element={<CategoryAdd />} />
            <Route path='/category-add/:id' element={<CategoryAdd />} />
            <Route path='/category-details/:id' element={<CategoryDetails />} />
            <Route path='/category-list' element={<CategoryList />} />
            <Route path='/category-report' element={<CategoryReport />} />
            
            <Route path='/kyc-add' element={<KycAdd />} />
            <Route path='/kyc-add/:id' element={<KycAdd />} />
            <Route path='/kyc-report' element={<KycReport />} />

            <Route path='/register' element={<UserAdd />} />
            <Route path='/user-report/:id' element={<UserReport />} />
            <Route path='/user-add/:id' element={<UserAdd />} />
            <Route path='/user-add' element={<UserAdd />} />
            <Route path="/UserLogin" element={<UserLogin />} />

            <Route path='/beneficiary-add' element={<BeneficiaryAdd />} />
            <Route path='/beneficiary-report/:id' element={<BeneficiaryReport />} />
            <Route path='/beneficiary-add/:id' element={<BeneficiaryAdd />} />
          
            <Route path='/feedback-report' element={<FeedbackReport />} />
            <Route path='/feedback' element={<FeedbackAdd />} />
            <Route path='/feedback-list' element={<FeedbackList />} />
            <Route path='/feedback-details/:id' element={<FeedbackDetails />} />

            <Route path='/transaction-add' element={<TransactionAdd/>} />
            <Route path='/transaction-add/:id' element={<TransactionAdd/>} />
            <Route path='/transaction-report/:id' element={<TransactionReport />} />
            <Route path='/transaction' element={<TransactionAdd />} />
            <Route path='/transaction-details/:id' element={<TransactionDetails />} />

            <Route path='/transfer-add' element={<TransferAdd/>} />
            <Route path='/transfer-report/:id' element={<TransferReport />} />
            <Route path='/transfer-details/:id' element={<TransferDetails />} />

            <Route path="/Login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />

          </Routes>
          <Footer />
        </Fragment>
      </Router>
    </Provider>

  );
}
export default App;
