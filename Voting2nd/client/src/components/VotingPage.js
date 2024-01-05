import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VotingPage = () => {
  const [votingData, setVotingData] = useState({});
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Fetch voting data from the backend
    axios.get('http://localhost:3001/api/voting-data')
      .then(response => setVotingData(response.data))
      .catch(error => console.error('Error fetching voting data:', error));
  }, []);

  const handleVoteSubmit = () => {
    if (!selectedQuestion || !selectedOption || !userId) {
      alert('Please select a question, an option, and enter your user ID.');
      return;
    }

    // Submit vote to the backend
    axios.post('http://localhost:3001/api/submit-vote', { question: selectedQuestion, option: selectedOption, userId })
      .then(response => {
        alert('Vote submitted successfully!');
      })
      .catch(error => console.error('Error submitting vote:', error));
  };

  return (
    <div>
      <h2>Voting Page</h2>
      <div>
        <label>Select a Question:</label>
        <select onChange={(e) => setSelectedQuestion(e.target.value)}>
          <option value="">-- Select a Question --</option>
          {votingData.questions && votingData.questions.map(question => (
            <option key={question} value={question}>{question}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Select an Option:</label>
        <select onChange={(e) => setSelectedOption(e.target.value)}>
          <option value="">-- Select an Option --</option>
          {selectedQuestion && votingData.options[selectedQuestion] && votingData.options[selectedQuestion].map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
      <div>
        <label>User ID:</label>
        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
      </div>
      <button onClick={handleVoteSubmit}>Submit Vote</button>
    </div>
  );
};

export default VotingPage;
