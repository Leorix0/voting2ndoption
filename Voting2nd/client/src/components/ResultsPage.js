import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ResultsPage = () => {
  const [votingData, setVotingData] = useState({});

  useEffect(() => {
    // Fetch voting data from the backend
    axios.get('http://localhost:3001/api/voting-data')
      .then(response => setVotingData(response.data))
      .catch(error => console.error('Error fetching voting data:', error));
  }, []);

  return (
    <div>
      <h2>Results Page</h2>
      {votingData.questions && votingData.questions.map(question => (
        <div key={question}>
          <h3>{question}</h3>
          <ul>
            {votingData.options[question] && votingData.options[question].map(option => (
              <li key={option}>
                {option}: {votingData.votes.filter(vote => vote.question === question && vote.option === option).length} votes
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ResultsPage;
