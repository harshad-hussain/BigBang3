import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  TextField,
  IconButton,
  Grid,
  Paper,
  TextareaAutosize,
} from '@mui/material';
import axios from 'axios';
import {Print } from "@mui/icons-material";

function InvoiceGenerator() {
  const [logoFile, setLogoFile] = useState(null);
  const location = useLocation();
  const { userDetails, agentDetails } = location.state || {};
  const [user, setUser] = useState({});
  const [user_Email, setUserEmail] = useState("")
  const [user_Name, setUserName] = useState("")
  const [user_Phone, setUserPhone] = useState("")
  const [user_Location, setUserLocation] = useState("")
  const [agent, setAgent] = useState({});
  const [agency_Name, setAgentName] = useState("")
  const [number_Of_Days, setAgentDays] = useState("")
  const [rate_for_day, setAgentRate] = useState("")
  const [tour_place, setAgentPlace] = useState("")
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`https://localhost:7125/api/Users/${userDetails.user_Id}`);
        setUser(response.data);
        console.log('Fetched User Details:', response.data);
        console.log(response.data[0].user_Email)
        setUserEmail(response.data[0].user_Email)
        console.log(response.data[0].user_Name)
        setUserName(response.data[0].user_Name)
        console.log(response.data[0].user_Phone)
        setUserPhone(response.data[0].user_Phone)
        console.log(response.data[0].user_Location)
        setUserLocation(response.data[0].user_Location)

      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    const fetchAgentDetails = async () => {
      console.log(agentDetails);
      try {
        const response = await axios.get(`https://localhost:7125/api/Agency/${agentDetails.agency_Id}`);
        console.log(response.data)
        setAgent(response); 
        console.log(response.data.number_Of_Days)
        console.log(response.data.rate_for_day)
        console.log(response.data.tour_place)
        setAgentName(response.data.agency_Name)
        setAgentDays(response.data.number_Of_Days)
        setAgentRate(response.data.rate_for_day)
        setAgentPlace(response.data.tour_place)


        console.log('Fetched Agency Details:', response.data[0]);
      } catch (error) {
        console.error('Error fetching Agency details:', error);
      }
    };

    fetchUserDetails();
    fetchAgentDetails();
  }, [userDetails.user_Id, agentDetails.agency_Id]);

  return (
    <Container className="app" style={{ paddingTop: '24px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        User Invoice
      </Typography>
      <Paper elevation={3} style={{
        fontFamily: 'Nunito, sans-serif',
        fontSize: '14px',
        fontWeight: 400,
        letterSpacing: 'normal',
        lineHeight: 'normal',
        padding: '24px',
      }}>
        <div className="download-pdf" title="Save PDF" style={{
          position: 'absolute',
          top: '0',
          right: '0',
          zIndex: '-1000',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
        }}>
          <a
            download="invoice.pdf"
            href="blob:https://tuanpham-dev.github.io/4f1b697c-af55-44a6-8756-d1b7ec0d6a64"
          ></a>
        </div>
        <Typography variant="h6" gutterBottom>
            Bill To
            </Typography>
        <div className="view mt-30 bg-dark flex">
        <Grid item xs={6}>
            
            <TextField
              fullWidth
              label="User Details"
              variant="outlined"
              margin="normal"
              value={user_Name || ''}
            />

            <TextField
              fullWidth
              label="Your Company"
              variant="outlined"
              margin="normal"
              value={user_Phone || ''}
            />

            <TextField
              fullWidth
              label="Your Company"
              variant="outlined"
              margin="normal"
              value={user_Location || ''}
            />

            <TextField
              fullWidth
              label="Your Company"
              variant="outlined"
              margin="normal"
              value={user_Email || ''}
            />

           </Grid>
          
          </div>

        <Grid container spacing={2} sx={{py:5}}>
        <Typography variant="h6" gutterBottom>
             Agency
            </Typography>
          <Grid item xs={6}>
            
           <TextField
              fullWidth
              label="Agent Name"
              variant="outlined"
              margin="normal"
              value={agency_Name || ''}
            />
            <TextField
              fullWidth
              label="Number of Days"
              variant="outlined"
              margin="normal"
              value={number_Of_Days || ''}
            />
            <TextField
              fullWidth
              label="Rate for Day"
              variant="outlined"
              margin="normal"
              value={rate_for_day || ''}
            />
            <TextField
              fullWidth
              label="Tour Place"
              variant="outlined"
              margin="normal"
              value={tour_place || ''}
            />

           </Grid>
        </Grid>
       
      
       
       
        <IconButton onClick={() => window.print()} className="btn btn-success me-1">
                    <Print />
                  </IconButton>
      </Paper>
    </Container>
  );
}

export default InvoiceGenerator;
