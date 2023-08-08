import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { TextField, Button, Container, Typography, Grid, Paper } from '@mui/material';

export default function Contact() {
  const [isEmailSent, setIsEmailSent] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();

    const name = e.target.elements.name.value;
    const email = e.target.elements.email.value;
    const message = e.target.elements.message.value;

    if (!name || !email || !message) {
      alert('Please fill in all the fields before sending the message');
      return;
    }

    try {
      const emailParams = {
        service_id: 'service_t8kj37p',
        template_id: 'template_n0abj3s',
        user_id: 'LoY459bOOZP_WbAfT',
        template_params: {
          to_email: 'harshadhusainj@gmail.com',
          from_name: name,
          from_email: email,
          message: message,
        },
      };

      await emailjs.send(
        emailParams.service_id,
        emailParams.template_id,
        emailParams.template_params,
        emailParams.user_id
      );

      setIsEmailSent(true);
    } catch (error) {
      console.error('Error sending email', error);
      alert('Error sending email. Please try again later.');
    }
  };
  const titleStyle = {
    marginTop: '3%', // Adjust the margin here to move the title lower
  };

  const formContainerStyle = {
    marginTop: '30%',
    padding: '2rem',
  };

  return (
    <Container>
    
      <Paper elevation={3} sx={formContainerStyle}>
        <form onSubmit={sendEmail}>
            
          <Typography variant="h4" align="center" gutterBottom sx={titleStyle}>
        Feedback
      </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Your Name"
                name="name"
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Your Email"
                name="email"
                variant="outlined"
                type="email"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Your Message"
                name="message"
                variant="outlined"
                multiline
                rows={4}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Send Message
              </Button>
            </Grid>
          </Grid>
        </form>
        {isEmailSent && (
          <Typography variant="body1" sx={{ marginTop: '1rem', color: 'green' }}>
            Thank you! Your message has been sent successfully.
          </Typography>
        )}
      </Paper>
    </Container>
    
  );
}
