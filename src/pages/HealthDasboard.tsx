import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { auth } from '../services/firebase'; // Ensure your Firebase auth is properly imported
import 'chart.js/auto';

// Register Chart.js components globally
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const HealthDashboard: React.FC = () => {
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/login'); // Redirect to login if user is not authenticated
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Sample health data for the chart
  const chartData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'], // Replace with actual dates or labels
    datasets: [
      {
        label: 'Heart Rate (bpm)',
        data: [72, 76, 80, 74, 78], // Replace with dynamic data
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Blood Pressure (mmHg)',
        data: [120, 118, 122, 121, 119], // Replace with dynamic data
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Health Metrics Overview',
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Health Dashboard</h1>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Health Metrics</h2>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default HealthDashboard;
