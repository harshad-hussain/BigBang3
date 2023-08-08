import React, { useState } from 'react';
import { Box, Button, Typography, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';

function AddPhoto({ onClose }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!selectedImage) {
      console.error('Please select an image.');
      return;
    }

    const formData = new FormData();
    formData.append('imageFile', selectedImage);

    try {
      const response = await axios.post('https://localhost:7194/api/Gallery', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setShowSnackbar(true); // Show the success snackbar if the request is successful
      } else {
        // Handle error scenario here
        console.error('Failed to upload photo. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  return (
    <Box>
      <Box sx={{ width: '90%' }}>
        <Typography sx={{ fontSize: '20px', fontWeight: '500' }}>Upload Photo</Typography>
        <Box sx={{ marginTop: '2%' }}>
          <input type="file" onChange={handleImageChange} />
        </Box>
      </Box>

      <form onSubmit={handleFormSubmit}>
        {/* Add the submit button */}
        <Button type="submit" variant="contained" color="primary">
          Upload Photo
        </Button>
      </form>

      {/* Snackbar for "Photo Uploaded Successfully" message */}
      <Snackbar open={showSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <MuiAlert onClose={handleCloseSnackbar} severity="success" variant="filled">
          Photo Uploaded Successfully
        </MuiAlert>
      </Snackbar>
    </Box>
  );
}

export default AddPhoto;