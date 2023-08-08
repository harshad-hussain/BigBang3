import React, { useState, useEffect } from 'react';
import './AgentDashboard.css';
import Cards from '../AgentDashboard/Card2';
import AddPackage from '../AgentDashboard/AddPackage';
import EditModal from './EditModal';
const AgentDashboard = () => {
  // State to track if the "Agent" menu item is active
  const [isAgentActive, setIsAgentActive] = useState(false);
  const handleAgentClick= () => {
    setIsAgentActive(!isAgentActive);
  };
  // useEffect for initial setup and event listeners
  useEffect(() => {
    // Side menu item click event handling
    const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');
    allSideMenu.forEach(item => {
      const li = item.parentElement;
      item.addEventListener('click', function () {
        allSideMenu.forEach(i => {
          i.parentElement.classList.remove('active');
        });
        li.classList.add('active');
      });
    });
  
    // Toggle Sidebar
    const menuBar = document.querySelector('#content nav .bx.bx-menu');
    const sidebar = document.getElementById('sidebar');
    menuBar.addEventListener('click', function () {
      sidebar.classList.toggle('hide');
    });

    // Search button behavior
    const searchButton = document.querySelector('#content nav form .form-input button');
    const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
    const searchForm = document.querySelector('#content nav form');
    searchButton.addEventListener('click', function (e) {
      if (window.innerWidth < 576) {
        e.preventDefault();
        searchForm.classList.toggle('show');
        if (searchForm.classList.contains('show')) {
          searchButtonIcon.classList.replace('bx-search', 'bx-x');
        } else {
          searchButtonIcon.classList.replace('bx-x', 'bx-search');
        }
      }
    });

    // Initial responsive behavior
    if (window.innerWidth < 768) {
      sidebar.classList.add('hide');
    } else if (window.innerWidth > 576) {
      searchButtonIcon.classList.replace('bx-x', 'bx-search');
      searchForm.classList.remove('show');
    }

    // Window resize event handling
    window.addEventListener('resize', function () {
      if (this.innerWidth > 576) {
        searchButtonIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
      }
    });
    
    // Dark mode switch handling
    const switchMode = document.getElementById('switch-mode');
    switchMode.addEventListener('change', function () {
      if (this.checked) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    });
  }, []);

  return (
    <section id="dashboard">
      {/* Sidebar */}
      <section id="sidebar">
        <a href="#" className="brand">
          <i className='bx bxs-smile'></i>
          <span className="text">AgentHub</span>
        </a>
        <ul className="side-menu top">
          <li className="active">
            <a href="#">
              <i className='bx bxs-dashboard'></i>
              <span className="text">Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className='bx bxs-shopping-bag-alt'></i>
              <span className="text">Packages</span>
            </a>
          </li>
      
          <li>
          <button onClick={handleAgentClick} className="link-button" style={{marginLeft:'15%',background:'transparent'}} data-target="agent">
          {/* You can add appropriate styles to the "link-button" class to make it look like a link */}
          <i className='bx bxs-message-dots'></i>
          <span className="text">Add Package</span>
        </button>
      </li>
      {/* {isAgentActive && (
        <ul className="box-info">
           
        </ul>
      )} */}
          <li>
            <a href="#">
              <i className='bx bxs-group'></i>
              <span className="text">Team</span>
            </a>
          </li>
        </ul>
        <ul className="side-menu">
          <li>
            <a href="#">
              <i className='bx bxs-cog'></i>
              <span className="text">Settings</span>
            </a>
          </li>
          <li>
            <a href="/logoutagent" className="logout">
              <i className='bx bxs-log-out-circle'></i>
              <span className="text">Logout</span>
            </a>
          </li>
        </ul>
      </section>

      {/* Content */}
      <section id="content">
        <nav>
          <i className='bx bx-menu'></i>
          <a href="#" className="nav-link">Categories</a>
          <form action="#">
            <div className="form-input">
              <input type="search" placeholder="Search..." />
              <button type="submit" className="search-btn"><i className='bx bx-search'></i></button>
            </div>
          </form>
          
          <input type="checkbox" id="switch-mode" hidden />
          <label htmlFor="switch-mode" className="switch-mode"></label>
          <a href="#" className="notification">
            <i className='bx bxs-bell'></i>
            <span className="num">8</span>
          </a>
          <a href="#" className="profile">
            <img src="img/people.png" alt="Profile" />
          </a>
        </nav>

        <main>
          <div className="head-title">
            <div className="left">
              <h1>Packages</h1>
              <ul className="breadcrumb">
                <li>
                  <a href="#">Dashboard</a>
                </li>
                <li><i className='bx bx-chevron-right'></i></li>
                <li>
                  <a className="active" href="#">Home</a>
                </li>
              </ul>
            </div>
          </div>

          {isAgentActive && (
            <ul className="box-info">
               <AddPackage/>
                        </ul>
          )}

          <ul className="box-info">
            <Cards /> 
          </ul>
          <div>
            {/* ... Other content ... */}
          </div>
        </main>
      </section>
    </section>
  );
};

export default AgentDashboard;
