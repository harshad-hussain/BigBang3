// App.js
import React from 'react';
import Dashboard from './Admin/Admindashboard';
import Home from './Home'; // Make sure the file path is correct
import ActiveDoctor from './Admin/ActiveDoctor';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AgentDashboard from './AgentDashboard/AgentDashboard';
import Searchbar from './searchbar';
import Booking from './Booking';
import BookingForm from './BookingForm';
import LoginForm from './AgentDashboard/AgentLogin';
import AdminLogin from './Admin/AdminLogin';
import Contact from './Contactus';
import UserLogin from './Admin/UserLogin';
import InvoiceGenerator from './Invoice';
import Images from './Admin/Images'
import UserRegistrationForm from './Admin/UserRegistrationForm';
import AgentRegistrationForm from './AgentDashboard/AgentRegistration';
import NotFound from './Notfound';
import Protected from './protected';
import ChooseLogin from './ChooseLogin';
import Gallery from './Admin/Galleryuser';
import AgentDashboardProtected from './Admin/ProtectedAgentDashboard/AgentDashboardProtected';
import AdminDashboard from './Admin/Admindashboard';
import LogoutAdmin from './AgentDashboard/LgoutAdmin';
import LogoutAgent from './AgentDashboard/LogoutAgent';
import LogoutUser from './AgentDashboard/LogoutUser';
export default function App() {
  const token = localStorage.getItem("token");
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} /> 
          <Route exact path="/Admin" element={<AdminDashboard/>} /> 
            <Route  path='/Agent' element={<AgentDashboardProtected token={token}><AgentDashboard/></AgentDashboardProtected>}/>
          <Route exact path="/AdminLogin" element={<AdminLogin/>} /> 
          <Route exact path="/contact" element={<Contact/>} /> 
          <Route exact path="/Booking" element={<Booking/>} />
          <Route exact path="/logoutadmin" element={<LogoutAdmin/>} />
          <Route exact path="/logoutagent" element={<LogoutAgent/>} />
          <Route exact path="/logoutuser" element={<LogoutUser/>} />
          <Route exact path="/Userreg" element={<UserRegistrationForm/>} />
          <Route exact path="/Agentreg" element={<AgentRegistrationForm/>} />
          <Route exact path="/search" element={<Searchbar/>} />
          <Route exact path="/Bookingform/:id" element={<BookingForm/>} />
           <Route exact path="/AgentLogin" element={<LoginForm/>} />
           <Route exact path="/Gallery" element={<Gallery/>} />
           <Route exact path="/ChooseLogin" element={<ChooseLogin/>} />    
          <Route exact path="/UserLogin" element={<UserLogin/>} />
          <Route exact path="/Invoice" element={<InvoiceGenerator/>} />
          <Route exact path="/images" element={<Images/>} />
          <Route path="*" element={<NotFound />} />
          

    
          
        </Routes>
      </BrowserRouter>  
    </div>
  );
}
