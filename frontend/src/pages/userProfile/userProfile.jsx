import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 


import './userProfile.css';

export default function ProfileEditor() {
  const [profileImage, setProfileImage] = useState(null);
  const location = useLocation(); 
  const navigate = useNavigate(); 

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-editor">
      <div className="sidenav">
        <div className="user-info">
          <div className="avatar">
            <img src={profileImage || "/placeholder.svg"} alt="Profile" />
          </div>
          <h2>John Smith</h2>
          <p>johnsmith@gmail.com</p>
        </div>
        <div className="menu-section">
          <h3>Check</h3>
          <button
            className="menu-button"
            onClick={() => navigate('/userDashboard')}
          >
           <i className="fa-solid fa-book"></i> Activity
          </button>
          <button className="menu-button"><i className="fa-solid fa-bell"></i>Notifications</button>
          <button className="menu-button"><i className="fa-solid fa-inbox"></i>Requests</button>
          <button className="menu-button"><i className="fa-solid fa-comment-medical"></i>Requested</button>
        </div>
        <hr className='divider'/>
        <div className="manage-section">
          <h3>Manage</h3>
          <button
            className={`menu-button ${
              location.pathname === '/userProfile' ? 'active' : ''
            }`}
          >
            <i className="fa-solid fa-pen"></i>Edit Profile
          </button>
          <button className="menu-button "><i className="fa-solid fa-right-from-bracket"></i>Sign Out</button>
        </div>
        
      </div>

      {/*Main content */}
      <div className="profile-page">
        <div className="profile-header">
          <div className="profile-image-section">
            <div className="profile-image">
              <img src={profileImage || "/placeholder.svg"} alt="Profile" />
              
              
            </div>
            <div className='upload-popup'>
                <label className="upload-button" htmlFor="profile-upload">
                Change Profile Picture
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  hidden
                />
              </label>

            </div>
          </div>
          <div className="name-fields">
            <div className="form-group116">
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" defaultValue="John" />
            </div>
            <div className="form-group116">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" defaultValue="Smith" />
            </div>
          </div>
        </div>

        {/* Email Field */}
        <div className='middle-div'>
          <div className="form-group116">
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" defaultValue="johnsmith@gmail.com" />
          </div>

        {/* Contact Field */}
          <div className="form-group116">
            <label htmlFor="phone">Contact Number</label>
            <input type="tel" id="phone" defaultValue="01678901234" />
          </div>
            
        </div>

        <hr />

        <div className='user-address-section'>
        <h3>Address</h3>
        <div className='add-div1'>
          <div className="form-group116">
            <label htmlFor="addressLine1">Address Line 1 </label>
            <input
              type="text"
              id="addressLine1"
              defaultValue="House-120, Road-4, Avenue-3, Mirpur DOHS"
           />
          </div>
          <div className="form-group116">
            <label htmlFor="division">Division</label>
           <select id="division" defaultValue="dhaka">
            <option value="dhaka">Dhaka</option>
            <option value="chittagong">Chittagong</option>
            <option value="rajshahi">Rajshahi</option>
            <option value="khulna">Khulna</option>
            </select>
          </div>

          </div>

          <div className='add-div2'>
            <div className="form-group116">
              <label htmlFor="addressLine2">Address Line 2 (optional)</label>
              <input type="text" id="addressLine2" />
            </div>
        
            <div className="form-group116">
              <label htmlFor="zipCode">ZIP/Postal Code</label>
              <input type="text" id="zipCode" defaultValue="1216" />
            </div>
          </div>
        

        </div>
        {/* Address Fields */}
        
        {/* Buttons */}
        <div className="button-group">
          <button className="cancel-button">Cancel</button>
          <button className="save-button">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
