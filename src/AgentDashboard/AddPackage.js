import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Grid, Box, InputLabel, Card, CardContent, CardActions, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';

function AddPackage() {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const token = localStorage.getItem('token');

  const handleModalClose = () => {
    setEditModalOpen(false);
  };
  
  const [agencyData, setAgencyData] = useState({
    agency_Name: '',
    agency_Contact: '',
    agency_Rating: '',
    number_Of_Days: '',
    rate_For_Day: '',
    offer_For_Day: '',
    tour_Place: '',
    imageFile: null,
    agentRegister:{Agent_Id: 1}
    
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
  
    setAgencyData((prevData) => ({
      ...prevData,
      imageFile: file,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    

    const formData = new FormData();
    formData.append('agency_Name', agencyData.agency_Name);
    formData.append('agency_Contact', agencyData.agency_Contact);
    formData.append('agency_Rating', agencyData.agency_Rating);
    formData.append('number_Of_Days', agencyData.number_Of_Days);
    formData.append('rate_For_Day', agencyData.rate_For_Day);
    formData.append('offer_For_Day', agencyData.offer_For_Day);
    formData.append('tour_Place', agencyData.tour_Place);
    formData.append('imageFile', agencyData.imageFile);
    formData.append('agent_Id',agencyData.agentRegister.Agent_Id);

    try {
        const response = await axios.post('https://localhost:7125/api/Agency', 
        formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
            timeout: 5000,
          });
          

      if (response.status === 200) {
        console.log(formData);
        setShowSuccessPopup(true); 
      } else {
        // Handle error scenario here
        console.error('Failed to add package. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setAgencyData((prevData) => ({
      ...prevData,
      [name]: type === 'number' ? parseInt(value) : value,
    }));
  };

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
  };

  const handleCardClick = (agent_Id) => {
    const encryptedId = btoa(agent_Id);
    localStorage.setItem('agent_Id', encryptedId);
  };

  return (
    <Box>
      <Box sx={{ width: '90%' }}>
        <Typography sx={{ fontSize: '20px', fontWeight: '500' }}>Package Details</Typography>
        <Box sx={{ marginTop: '2%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Grid container alignItems="center">
                <Grid item xs={5}>
                  <InputLabel htmlFor="agencyName">Agency Name</InputLabel>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="agencyName"
                    fullWidth
                    variant="outlined"
                    name="agency_Name"
                    value={agencyData.agency_Name}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Grid container alignItems="center">
                <Grid item xs={5}>
                  <InputLabel htmlFor="agencyContact">Agency Contact</InputLabel>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="agencyContact"
                    fullWidth
                    variant="outlined"
                    name="agency_Contact"
                    value={agencyData.agency_Contact}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Grid container alignItems="center">
                <Grid item xs={5}>
                  <InputLabel htmlFor="agencyRating">Agency Rating</InputLabel>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="agencyRating"
                    fullWidth
                    variant="outlined"
                    name="agency_Rating"
                    value={agencyData.agency_Rating}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ marginTop: '2%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Grid container alignItems="center">
                <Grid item xs={5}>
                  <InputLabel htmlFor="numberOfDays">Number of Days</InputLabel>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="numberOfDays"
                    fullWidth
                    variant="outlined"
                    name="number_Of_Days"
                    type="number"
                    value={agencyData.number_Of_Days}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Grid container alignItems="center">
                <Grid item xs={5}>
                  <InputLabel htmlFor="rateForDay">Rate for Day</InputLabel>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="rateForDay"
                    fullWidth
                    variant="outlined"
                    name="rate_For_Day"
                    type="number"
                    value={agencyData.rate_For_Day}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Grid container alignItems="center">
                <Grid item xs={5}>
                  <InputLabel htmlFor="offerForDay">Offer for Day</InputLabel>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="offerForDay"
                    fullWidth
                    variant="outlined"
                    name="offer_For_Day"
                    type="number"
                    value={agencyData.offer_For_Day}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <Typography sx={{ fontSize: '20px', fontWeight: '500', marginTop: '5%' }}>Package Accommodation</Typography>
        <Box sx={{ marginTop: '2%' }}>
          <Grid container>
            <Grid item xs={12} sm={8}>
              <Box sx={{ width: '100%' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Grid container alignItems="center">
                      <Grid item xs={5}>
                        <InputLabel htmlFor="tourPlace">Tour Place</InputLabel>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          id="tourPlace"
                          fullWidth
                          variant="outlined"
                          name="tour_Place"
                          value={agencyData.tour_Place}
                          onChange={handleChange}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* <Grid item xs={12} sm={4}>
                    <Grid container alignItems="center">
                      <Grid item xs={5}>
                        <InputLabel htmlFor="agentId">Agent Id</InputLabel>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          id="agentId"
                          fullWidth
                          variant="outlined"
                          name="agent_Id"
                          value={agencyData.agent_Id}
                          onChange={handleChange}
                        />
                      </Grid>
                    </Grid>
                  </Grid> */}

                  <Grid item xs={12} sm={6}>
                    <Grid container alignItems="center">
                      <Grid item xs={5}>
                        <InputLabel htmlFor="tourImage">Tour Image</InputLabel>
                      </Grid>
                      <Grid item xs={6}>
                        <input type="file" id="tourImage" onChange={handleImageChange} />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            {/* Add more form fields for accommodation here */}
          </Grid>
        </Box>
      </Box>

      <form onSubmit={handleFormSubmit}>
        {/* Add the submit button */}
        <Button type="submit" variant="contained" color="success">
          Submit
        </Button>
      </form>

      {/* Popup for "New Package Added Successfully" message */}
      <Dialog open={editModalOpen} onClose={handleModalClose}>
        <DialogTitle>Edit Package</DialogTitle>
        <DialogContent>
          {/* Place your edit form or content here */}
          {selectedPackage && (
            <div>
              {/* Display package details */}
              <Typography>{selectedPackage.agency_Name}</Typography>
              <Typography>{selectedPackage.agency_Contact}</Typography>
              {/* Add more fields as needed */}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AddPackage;