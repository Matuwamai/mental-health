import React, { useState } from 'react';
import { auth } from '../services/firebase';
import { db } from '../services/firebase';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { getHealthInsights } from '../services/aiService';

const HealthData = () => {
  const [message, setMessage] = useState<string>('');
  const [heartRate, setHeartRate] = useState<string>('');
  const [bloodPressure, setBloodPressure] = useState<string>('');
  const [bloodSugar, setBloodSugar] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user) {
      setMessage('You need to log in to submit health data.');
      return;
    }

    try {
      // Add health data to Firestore
      await addDoc(collection(db, 'users', user.uid, 'healthData'), {
        heartRate: Number(heartRate),
        bloodPressure,
        bloodSugar: Number(bloodSugar),
        recordedAt: Timestamp.now(),
      });

      // Prepare data for AI analysis
      const healthDataForAI = {
        heartRate: Number(heartRate),
        bloodPressure,
        bloodSugar: Number(bloodSugar),
      };

      // Get insights from Gemini AI
      const insights = await getHealthInsights(healthDataForAI);
      setMessage(`Health data submitted successfully! AI Insights: ${insights.recommendations}`);

      // Optionally, store AI insights in Firestore as well
      await addDoc(collection(db, 'users', user.uid, 'aiInsights'), {
        insights,
        recordedAt: Timestamp.now(),
      });

      setHeartRate('');
      setBloodPressure('');
      setBloodSugar('');
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields for heartRate, bloodPressure, and bloodSugar */}
      <button type="submit">Submit Health Data</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default HealthData;
