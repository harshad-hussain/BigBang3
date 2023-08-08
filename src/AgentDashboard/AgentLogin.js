import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './AgentLogin.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    agent_Name: '',
    agent_Password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const agentsResponse = await axios.get('https://localhost:7125/api/AgentRegisters');
      const agents = agentsResponse.data;

      const agent = agents.find((a) => a.agent_Name === formData.agent_Name);

      if (agent && agent.agent_Password === formData.agent_Password && agent.status === 'Approved') {
        const response = await axios.post('https://localhost:7125/api/Token/Agent', {
          agent_Name: formData.agent_Name,
          agent_Password: formData.agent_Password,
        });

        const token = response.data;
        localStorage.setItem('token', token);

        navigate('/Agent', { state: { agentId: agent.agent_Id } });

      } else {
        alert('Invalid credentials or agent is not approved.');
      }
    } catch (error) {
      alert('An error occurred while processing your request.');
    }
  };

  return (
    <div className="log-container">
      <div className="log-wrapper">
        <div className="log-title">
          <span>Agent Login</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="log-row">
            <i className="fas fa-user">
              <div>
                <FontAwesomeIcon icon={faUser} />
              </div>
            </i>
            <input
              type="text"
              placeholder="Email or Phone"
              name="agent_Name"
              value={formData.agent_Name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="log-row">
            <i className="fas fa-lock">
              <div>
                <FontAwesomeIcon icon={faLock} />
              </div>
            </i>
            <input
              type="password"
              placeholder="Password"
              name="agent_Password"
              value={formData.agent_Password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="log-pass">
            <a href="#">Forgot password?</a>
          </div>
          <div className="log-row log-button">
            <input type="submit" value="Login" />
          </div>
          <div className="log-signup-link">
            Not a member? <Link to="/Agentreg">Signup now</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
