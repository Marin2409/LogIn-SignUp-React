import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('user'));
    
    if (!token || !userData) {
      navigate('/login');
      return;
    }

    setUser(userData);

    // Determine which images to show based on clearance
    const clearance = userData.clearance;
    let allowedImages = [];

    switch (clearance) {
      case 'T': // TOP SECRET
        allowedImages = [
          'TopSecret.png',
          'Secret.png',
          'Confidential.png',
          'Unclassified.png'
        ];
        break;
      case 'S': // SECRET
        allowedImages = [
          'Secret.png',
          'Confidential.png',
          'Unclassified.png'
        ];
        break;
      case 'C': // CONFIDENTIAL
        allowedImages = [
          'Confidential.png',
          'Unclassified.png'
        ];
        break;
      case 'U': // UNCLASSIFIED
      default:
        allowedImages = ['Unclassified.png'];
    }

    setImages(allowedImages);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome, {user?.username || 'User'}!
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Log Out
          </button>
        </div>

        <div className="mb-4">
          <p className="text-gray-600">
            Your clearance level: <span className="font-semibold">
              {user?.clearance === 'T' ? 'TOP SECRET' :
               user?.clearance === 'S' ? 'SECRET' :
               user?.clearance === 'C' ? 'CONFIDENTIAL' : 'UNCLASSIFIED'}
            </span>
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.map((image, index) => (
            <div key={index} className="border rounded-lg overflow-hidden">
              <div className="p-4 bg-gray-100">
                <h3 className="font-medium text-gray-800">
                  {image.replace('.png', '')}
                </h3>
              </div>
              <div className="p-4">
                <img 
                  src={`/images/${image}`} 
                  alt={image.replace('.png', '')}
                  className="w-full h-auto"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;