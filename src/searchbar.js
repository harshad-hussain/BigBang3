import React from 'react';
import './searchbar.css';

const Searchbar = () => {
  return (
    <div>
      <section className="searchbar-tour-search">
        <div className="searchbar-container">
          <form action="" className="searchbar-tour-search-form">
            <div className="searchbar-input-wrapper">
              <label htmlFor="destination" className="searchbar-input-label">
                Search Destination*
              </label>
              <input
                type="text"
                name="destination"
                id="destination"
                required
                placeholder="Enter Destination"
                className="searchbar-input-field"
              />
            </div>
            <div className="searchbar-input-wrapper">
              <label htmlFor="people" className="searchbar-input-label">
                Pax Number*
              </label>
              <input
                type="number"
                name="people"
                id="people"
                required
                placeholder="No.of People"
                className="searchbar-input-field"
              />
            </div>
            <div className="searchbar-input-wrapper">
              <label htmlFor="checkin" className="searchbar-input-label">
                Checkin Date**
              </label>
              <input
                type="date"
                name="checkin"
                id="checkin"
                required
                className="searchbar-input-field"
              />
            </div>
            <div className="searchbar-input-wrapper">
              <label htmlFor="checkout" className="searchbar-input-label">
                Checkout Date*
              </label>
              <input
                type="date"
                name="checkout"
                id="checkout"
                required
                className="searchbar-input-field"
              />
            </div>
            <button type="submit" className="searchbar-btn">
              Inquire now
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Searchbar;
