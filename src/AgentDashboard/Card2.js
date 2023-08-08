import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';

export default function Cards() {
    const [packages, setPackages] = useState([]);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const token = localStorage.getItem('token');
    const [editPackage, setEditPackage] = useState({
        agency_Id: '',
        agency_Name: '',
        agency_Contact: '',
        agency_Rating: '',
        number_Of_Days: '',
        rate_for_day: '',
        offer_For_Day: '',
        tour_place: '',
        tourImagePath: null,
    });

    useEffect(() => {
        // Fetch data from the API
        axios
            .get('https://localhost:7125/api/Agency',{ headers:  {
                Authorization: `Bearer ${token}`
    }  
            })
            
            
            .then((response) => {
                setPackages(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
            
    }, []);

    const handleDelete = async (id) => {
        try {
            // Make an HTTP DELETE request to delete the agency
            await axios.delete(`https://localhost:7125/api/Agency/${id}`);
            // Update the packages state to remove the deleted agency from the UI
            setPackages((prevPackages) => prevPackages.filter((pkg) => pkg.agency_Id !== id));
        } catch (error) {
            console.error('Error deleting agency:', error);
        }
    };

    const handleEdit = (packageData) => {
        setEditPackage(packageData);
        setOpenEditDialog(true);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        // Set the image file in the editPackage state
        setEditPackage((prevPackage) => ({
            ...prevPackage,
            tourImagePath: file,
        }));
    };

    const handleUpdatePackage = async () => {
        try {
            // Make sure editPackage has the agency_Id property
            if (!editPackage.agency_Id) {
                console.error('Agency ID is missing in editPackage.');
                return;
            }

            const formData = new FormData();
            formData.append('agency_Id', editPackage.agency_Id);
            formData.append('agency_Name', editPackage.agency_Name);
            formData.append('agency_Contact', editPackage.agency_Contact);
            formData.append('agency_Rating', editPackage.agency_Rating);
            formData.append('number_Of_Days', editPackage.number_Of_Days);
            formData.append('rate_for_day', editPackage.rate_for_day);
            formData.append('offer_For_Day', editPackage.offer_For_Day);
            formData.append('tour_place', editPackage.tour_place);

            // Check if a new image was selected
            if (editPackage.tourImagePath) {
                formData.append('tourImagePath', editPackage.tourImagePath);
            }

            // Make an HTTP PUT request to update the agency
            await axios.put(`https://localhost:7125/api/Agency/${editPackage.agency_Id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Use multipart/form-data
                },
            });

            // Close the edit dialog
            setOpenEditDialog(false);

            // Update the packages state to reflect the changes
            setPackages((prevPackages) =>
                prevPackages.map((pkg) => (pkg.agency_Id === editPackage.agency_Id ? editPackage : pkg))
            );
        } catch (error) {
            console.error('Error updating package:', error);
        }
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', justifyContent: 'center' }}>
            {packages.map((packageData) => (
                <Card key={packageData.agency_Id} sx={{ maxWidth: 345, backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    <CardMedia
                        sx={{ height: 140, backgroundColor: 'rgb(236, 236, 236)', borderRadius: '8px 8px 0 0', transition: 'transform 0.2s ease', '&:hover': { transform: 'scale(0.98)' } }}
                        image={`https://localhost:7125//uploads/images/${packageData.tourImagePath}`}
                        title={packageData.agency_Name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {packageData.agency_Name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Contact: {packageData.agency_Contact}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Rating: {packageData.agency_Rating}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Number of Days: {packageData.number_Of_Days}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Rate for Day: {packageData.rate_for_day}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Offer for Day: {packageData.offer_For_Day}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Tour Place: {packageData.tour_place}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={() => handleEdit(packageData)}>
                            Edit
                        </Button>
                        <Button size="small" onClick={() => handleDelete(packageData.agency_Id)}>
                            Delete
                        </Button>
                    </CardActions>
                </Card>
            ))}

            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                <DialogTitle>Edit Package</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Agency Name"
                        value={editPackage.agency_Name || ''}
                        onChange={(e) => setEditPackage({ ...editPackage, agency_Name: e.target.value })}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Contact"
                        value={editPackage.agency_Contact || ''}
                        onChange={(e) => setEditPackage({ ...editPackage, agency_Contact: e.target.value })}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Rating"
                        value={editPackage.agency_Rating || ''}
                        onChange={(e) => setEditPackage({ ...editPackage, agency_Rating: e.target.value })}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Number of Days"
                        value={editPackage.number_Of_Days || ''}
                        onChange={(e) => setEditPackage({ ...editPackage, number_Of_Days: e.target.value })}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Rate for Day"
                        value={editPackage.rate_for_day || ''}
                        onChange={(e) => setEditPackage({ ...editPackage, rate_for_day: e.target.value })}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Offer for Day"
                        value={editPackage.offer_For_Day || ''}
                        onChange={(e) => setEditPackage({ ...editPackage, offer_For_Day: e.target.value })}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Tour Place"
                        value={editPackage.tour_place || ''}
                        onChange={(e) => setEditPackage({ ...editPackage, tour_place: e.target.value })}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    {/* Add the input element for the new image */}
                    <input type="file" id="tourImage" onChange={handleImageChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleUpdatePackage} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}