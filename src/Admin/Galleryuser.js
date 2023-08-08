import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import { Modal, Box } from '@mui/material';
import AddPhoto from './AddPhoto';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Gallery() {
  const [expanded, setExpanded] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [showAddPhotoModal, setShowAddPhotoModal] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    // Function to fetch photos from the backend
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('https://localhost:7194/api/Gallery');
        setPhotos(response.data);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    // Call the fetchPhotos function when the component mounts
    fetchPhotos();
  }, []);

  return (
      <>
      <Typography sx={{fontSize:'70px',textAlign:'center'}}> Gallery </Typography>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', marginTop: '55px' }}>
        
      {photos.map((photo) => (
        
        <Card key={photo.photo_Id} sx={{ maxWidth: 345, flexGrow: 1, borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: 'White' }} aria-label="recipe">
                R
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
          />
          <CardMedia
            component="img"
            sx={{height: '25%'}}
            image={`https://localhost:7194/uploads/images/${photo.tourGallery}`}
            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {photo.title}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              {/* <Typography paragraph>Travelling is the best rescue.</Typography> */}
            </CardContent>
          </Collapse>
        </Card>
      ))}

      {/* Post Button */}
      

      {/* Modal for AddPhoto component */}
      {showAddPhotoModal && (
        <Modal
          open={showAddPhotoModal}
          onClose={() => setShowAddPhotoModal(false)}
          aria-labelledby="add-photo-modal-title"
          aria-describedby="add-photo-modal-description"
        >
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', boxShadow: 24, borderRadius: 5 }}>
            <AddPhoto onClose={() => setShowAddPhotoModal(false)} />
          </Box>
        </Modal>
      )}
    </div>
    </>
  );
}

export default Gallery;
