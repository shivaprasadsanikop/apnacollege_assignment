import React from 'react';

const Profile = () => {
  return (
    <div>
      <h1>User Profile Page</h1>
      <div style={{ display: 'flex', gap: '8px' }}>
        <h4>user:</h4>
        <h4>{localStorage.getItem('user')}</h4>
      </div>
    </div>
  );
};

export default Profile;