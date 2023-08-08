import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Stack, Typography, AppBar, Toolbar } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BookingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const [userIdB, setUserIdB] = useState('');
  const [bookingData, setBookingData] = useState({
    customer_Date_Of_Booking: '',
    booking_amount: 0,
    user: {
      user_Id: '',
    },
    agency: {
      agency_Id: id,
    },
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      customer_Date_Of_Booking: bookingData.customer_Date_Of_Booking,
      booking_amount: parseInt(bookingData.booking_amount),
      user: {
        user_Id: userIdB,
      },
      agency: {
        agency_Id: id,
      },
    };

    try {
      const response = await axios.post('https://localhost:7125/api/Bookings', requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 5000,
      });

      console.log('Submitted Luffy');
      navigate(`/Invoice`, {
        state: {
          userDetails: bookingData.user,
          agentDetails: bookingData.agency,
        },
      }); // Redirect to the invoice page

    } catch (error) {
      if (error.response) {
        console.error('Error:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    setUserIdB(userId);
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setBookingData((prevData) => ({
      ...prevData,
      [name]: type === 'number' ? parseInt(value) : value,
    }));
  };
  
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Booking Form</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" style={{ marginTop: '20px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Add Booking
        </Typography>
        <form onSubmit={handleFormSubmit}>
          <Stack spacing={2}>
            <TextField
              variant="outlined"
              color="primary"
              label="Customer Date of Booking"
              name="customer_Date_Of_Booking"
              type="date"
              value={bookingData.customer_Date_Of_Booking}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              variant="outlined"
              color="primary"
              label="Booking Amount"
              name="booking_amount"
              type="number"
              value={bookingData.booking_amount}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              variant="outlined"
              color="primary"
              label="User ID"
              name="user.user_Id"
              type="number"
              value={userIdB}
              fullWidth
              disabled
            />
            <TextField
              variant="outlined"
              color="primary"
              label="Agency ID"
              name="agency.agency_Id"
              type="number"
              value={bookingData.agency.agency_Id}
              fullWidth
              disabled
            />
          </Stack>
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Book Now
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default BookingForm;
