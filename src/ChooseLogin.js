import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Modal from '@mui/material/Modal';
import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';

const ChooseLogin = () => {
    const navigate = useNavigate(); // Create a navigate function for navigation
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleRadioChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleLogin = () => {
        if (selectedValue === 'admin') {
            navigate('/AdminLogin'); // Use navigate to change routes
        } else if (selectedValue === 'agent') {
            navigate('/AgentLogin');
        } else if (selectedValue === 'user') {
            navigate('/UserLogin');
        }
    };

    return (
        <div>
            <button onClick={handleOpenModal}>Choose Login</button>
            <Modal open={modalOpen} onClose={handleCloseModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                        minWidth: '300px',
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="h5" component="h2" gutterBottom>
                        Choose Login
                    </Typography>
                    <FormControl component="fieldset">
                        <RadioGroup
                            aria-label="loginType"
                            name="loginType"
                            value={selectedValue}
                            onChange={handleRadioChange}
                        >
                            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                            <FormControlLabel value="agent" control={<Radio />} label="Agent" />
                            <FormControlLabel value="user" control={<Radio />} label="User" />
                        </RadioGroup>
                    </FormControl>
                    <Button variant="contained" color="primary" onClick={handleLogin}>
                        Login
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default ChooseLogin;