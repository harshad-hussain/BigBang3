import React, { useState, useEffect } from 'react';
import './ActiveDoctor.css';
import axios from 'axios';

const ActiveDoctor = () => {
  const [doctorData, setDoctorData] = useState([]);

  useEffect(() => {
    // Fetch data from your API
    axios.get('https://localhost:7125/api/AgentRegisters',)
      .then(response => {
        setDoctorData(response.data);
      })
    
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    
  }, []);

  const handleApproveAgent = (agentId) => {
    const updatedDoctorData = doctorData.map(doctor => {
      if (doctor.agent_Id === agentId) {
        return { ...doctor, status: 'Approved' };
      }
      return doctor;
    });

    // Update status via API and then update state
    axios.put(`https://localhost:7125/api/AdminRegisters/UpdateApprovalStatus/${agentId}`, 'Approved', {
      headers: {
        'Content-Type': 'application/json-patch+json',
      },
    })
      .then(() => {
        setDoctorData(updatedDoctorData);
      })
      .catch(error => {
        console.error('Error updating approval status:', error);
      });
  };

  const handleDeclineAgent = (agentId) => {
    const updatedDoctorData = doctorData.map(doctor => {
      if (doctor.agent_Id === agentId) {
        return { ...doctor, status: 'Declined' };
      }
      return doctor;
    });

    // Update status via API and then update state
    axios.put(`https://localhost:7125/api/AdminRegisters/UpdateApprovalStatus/${agentId}`, 'Declined', {
      headers: {
        'Content-Type': 'application/json-patch+json',
      },
    })
      .then(() => {
        setDoctorData(updatedDoctorData);
      })
      .catch(error => {
        console.error('Error updating approval status:', error);
      });
  };

  return (
    <div className="details">
      <div className="recentOrders">
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>ID</td>
              <td>Status</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {doctorData.map((doctor, index) => (
              <tr key={index}>
                <td>{doctor.agent_Name}</td>
                <td>{doctor.agent_Id}</td>
                <td>{doctor.status}</td>
                <td>
                  <button className="approve-button green-button" onClick={() => handleApproveAgent(doctor.agent_Id)}>Approve</button>
                  <button className="decline-button red-button" onClick={() => handleDeclineAgent(doctor.agent_Id)}>Decline</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveDoctor;
