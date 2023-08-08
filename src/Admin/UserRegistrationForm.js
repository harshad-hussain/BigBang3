import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  Container,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  TextareaAutosize,
} from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import '../Admin/RegistrationForm.css';

const UserRegistrationForm = () => {
  const navigate = useNavigate(); // Get navigate function for navigation

  const [regFormData, setRegFormData] = useState({
    regFirstName: '',
    regLastName: '',
    regPassword: '',
    regConfirmPassword: '',
    regGender: '',
    regEmailAddress: '',
    regPhoneNumber: '',
    regAddress: '',
    regPostalCode: '',
    regAgreedToTerms: false,
  });

  const regNameRegex = /^[a-zA-Z]+$/;
  const regEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regPhoneRegex = /^\d{10}$/;

  const handleRegChange = (e) => {
    const { name, value, type, checked } = e.target;
    let updatedValue = type === 'checkbox' ? checked : value;

    if (name === 'regFirstName' || name === 'regLastName') {
      if (!regNameRegex.test(updatedValue)) {
        updatedValue = '';
      }
    } else if (name === 'regEmailAddress') {
      if (!regEmailRegex.test(updatedValue)) {
        updatedValue = '';
      }
    } else if (name === 'regPhoneNumber') {
      if (!regPhoneRegex.test(updatedValue)) {
        updatedValue = '';
      }
    }

    setRegFormData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };

  const handleRegSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = {
        admin_Name: regFormData.regFirstName + ' ' + regFormData.regLastName,
        admin_Password: regFormData.regPassword,
      };

      const response = await axios.post(
        'https://localhost:7179/api/Users',
        userData
      );

      console.log(response.data);

      // Navigate to user login page after successful registration
      navigate('/UserLogin');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <div className="reg-wrapper">
        <Typography variant="h5" gutterBottom>
          User Registration Form
        </Typography>
        <form className="reg-form" onSubmit={handleRegSubmit}>
          <div className="reg-inputfield">
            <label>First Name</label>
            <TextField
              type="text"
              className="reg-input"
              name="regFirstName"
              value={regFormData.regFirstName}
              onChange={handleRegChange}
              required
            />
          </div>
          <div className="reg-inputfield">
            <label>Last Name</label>
            <TextField
              type="text"
              className="reg-input"
              name="regLastName"
              value={regFormData.regLastName}
              onChange={handleRegChange}
              required
            />
          </div>
          <div className="reg-inputfield">
            <label>Password</label>
            <TextField
              type="password"
              className="reg-input"
              name="regPassword"
              value={regFormData.regPassword}
              onChange={handleRegChange}
              required
            />
          </div>
          <div className="reg-inputfield">
            <label>Confirm Password</label>
            <TextField
              type="password"
              className="reg-input"
              name="regConfirmPassword"
              value={regFormData.regConfirmPassword}
              onChange={handleRegChange}
              required
            />
          </div>
          <div className="reg-inputfield">
            <label>Gender</label>
            <FormControl>
              <InputLabel>Select</InputLabel>
              <Select
                name="regGender"
                value={regFormData.regGender}
                onChange={handleRegChange}
                required
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="reg-inputfield">
            <label>Email Address</label>
            <TextField
              type="text"
              className="reg-input"
              name="regEmailAddress"
              value={regFormData.regEmailAddress}
              onChange={handleRegChange}
              required
            />
          </div>
          <div className="reg-inputfield">
            <label>Phone Number</label>
            <TextField
              type="text"
              className="reg-input"
              name="regPhoneNumber"
              value={regFormData.regPhoneNumber}
              onChange={handleRegChange}
            />
          </div>
          <div className="reg-inputfield">
            <label>Address</label>
            <TextareaAutosize
              className="reg-textarea"
              name="regAddress"
              value={regFormData.regAddress}
              onChange={handleRegChange}
              required
              rowsMin={3}
            />
          </div>
          <div className="reg-inputfield">
            <label>Postal Code</label>
            <TextField
              type="text"
              className="reg-input"
              name="regPostalCode"
              value={regFormData.regPostalCode}
              onChange={handleRegChange}
              required
            />
          </div>
          <div className="reg-inputfield reg-terms">
            <FormControlLabel
              control={
                <Checkbox
                  name="regAgreedToTerms"
                  checked={regFormData.regAgreedToTerms}
                  onChange={handleRegChange}
                  required
                />
              }
              label="Agreed to terms and conditions"
            />
          </div>
          <div className="reg-inputfield">
            <Button type="submit" variant="contained" color="primary">
              Register
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default UserRegistrationForm;
