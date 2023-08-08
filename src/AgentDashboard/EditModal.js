

import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function EditModal({ agencyData, onClose }) {
  const [editedAgency, setEditedAgency] = useState({
    agency_Name: agencyData?.agency_Name,
    agency_Contact: agencyData?.agency_Contact,
    agency_Rating: agencyData?.agency_Rating,
    number_Of_Days: agencyData?.number_Of_Days,
    offer_For_Day: agencyData?.offer_For_Day,
    rate_for_day: agencyData?.rate_for_day,
    tour_place: agencyData?.tour_place,
    imageFile: null,
  });

  const selectedAgencyId = localStorage.getItem('selectedAgencyId'); // Retrieve the agency_Id from local storage

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedAgency({ ...editedAgency, [name]: value });
  };

  useEffect(() => {
    // Fetch the agency data based on the retrieved agency_Id
    axios.get(`https://localhost:7125/api/Agency/${selectedAgencyId}`)
      .then((response) => {
        setEditedAgency(response.data);
      })
      .catch((error) => {
        console.error('Error fetching agency data:', error);
      });
  }, [selectedAgencyId]);

  const handleSave = () => {
    const formData = new FormData();
    formData.append('agency_Id', selectedAgencyId);
    formData.append('agency_Name', editedAgency.agency_Name);
    formData.append('agency_Contact', editedAgency.agency_Contact);
    formData.append('agency_Rating', editedAgency.agency_Rating);
    formData.append('number_Of_Days', editedAgency.number_Of_Days);
    formData.append('offer_For_Day', editedAgency.offer_For_Day);
    formData.append('rate_for_day', editedAgency.rate_for_day);
    formData.append('tour_place', editedAgency.tour_place);
    formData.append('imageFile', editedAgency.imageFile);

    axios
      .put(`https://localhost:7125/api/Agency/${selectedAgencyId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((response) => {
        console.log('Agency updated successfully:', response.data);
        onClose(); // Close the modal after successful update
      })
      .catch((error) => {
        console.error('Error updating agency:', error);
      });
  };

  return (
    <div className="edit-modal">
      <div className="modal-content">
        <h2>Edit Agency</h2>
        <form>
          <div className="form-group">
            <label htmlFor="agency_Name">Agency Name:</label>
            <input
              type="text"
              id="agency_Name"
              name="agency_Name"
              value={editedAgency.agency_Name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="agency_Contact">Agency Contact:</label>
            <input
              type="text"
              id="agency_Contact"
              name="agency_Contact"
              value={editedAgency.agency_Contact}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="agency_Rating">Agency Rating:</label>
            <input
              type="text"
              id="agency_Rating"
              name="agency_Rating"
              value={editedAgency.agency_Rating}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="number_Of_Days">Number of Days:</label>
            <input
              type="number"
              id="number_Of_Days"
              name="number_Of_Days"
              value={editedAgency.number_Of_Days}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="offer_For_Day">Offer for Day:</label>
            <input
              type="number"
              id="offer_For_Day"
              name="offer_For_Day"
              value={editedAgency.offer_For_Day}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="rate_for_day">Rate for Day:</label>
            <input
              type="number"
              id="rate_for_day"
              name="rate_for_day"
              value={editedAgency.rate_for_day}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="tour_place">Tour Place:</label>
            <input
              type="text"
              id="tour_place"
              name="tour_place"
              value={editedAgency.tour_place}
              onChange={handleInputChange}
            />
          </div>
         
        </form>
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
