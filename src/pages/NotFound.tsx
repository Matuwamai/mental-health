import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-4xl font-bold text-red-500">404</h1>
      <p className="text-xl text-gray-700">Page Not Found</p>
      <Link to="/dashboard" className="mt-4 text-blue-500 underline">
        Go Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
