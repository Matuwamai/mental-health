import React, { useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const Reminders: React.FC = () => {
  const [reminder, setReminder] = useState('');
  const [reminders, setReminders] = useState<any[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchReminders = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const remindersRef = collection(db, 'users', user.uid, 'reminders');
      const querySnapshot = await getDocs(remindersRef);

      const remindersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setReminders(remindersData);
    };

    fetchReminders();
  }, []);

  const handleAddReminder = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user) {
      setMessage('You need to log in to set reminders.');
      return;
    }

    try {
      await addDoc(collection(db, 'users', user.uid, 'reminders'), {
        reminder,
        createdAt: new Date().toISOString(),
      });
      setReminders([...reminders, { reminder, createdAt: new Date().toISOString() }]);
      setReminder('');
      setMessage('Reminder added successfully!');
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Set Reminders</h1>
      <form onSubmit={handleAddReminder} className="w-80 bg-white p-6 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Reminder (e.g., Check Blood Pressure at 8:00 AM)"
          value={reminder}
          onChange={(e) => setReminder(e.target.value)}
          className="w-full mb-4 p-2 border rounded-md"
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
          Add Reminder
        </button>
        {message && <p className="text-green-500 mt-2">{message}</p>}
      </form>
      <div className="w-80 mt-4">
        <h2 className="text-xl font-semibold mb-2">Your Reminders</h2>
        <ul className="list-disc pl-5">
          {reminders.map((rem, index) => (
            <li key={index}>{rem.reminder}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Reminders;
