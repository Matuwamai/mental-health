import axios from 'axios';

const AI_API_URL = 'https://api.gemini.ai/health-analysis';  // Replace with actual AI API URL

// Function to send health data for analysis
export const getHealthInsights = async (healthData: any) => {
  try {
    const response = await axios.post(AI_API_URL, healthData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;  // Assuming the AI service returns insights in the response body
  } catch (error) {
    console.error('Error fetching AI insights:', error);
    throw new Error('Failed to get health insights');
  }
};
