const express = require('express');
const router = express.Router();
const { generateQRCode } = require('./utils');

let votingData = {
  questions: ['Question 1', 'Question 2', 'Question 3'],
  options: {
    'Question 1': ['Option A', 'Option B', 'Option C'],
    'Question 2': ['Option X', 'Option Y', 'Option Z'],
    'Question 3': ['Option 1', 'Option 2', 'Option 3'],
  },
  votes: [],
};

router.get('/voting-data', (req, res) => {
  res.json(votingData);
});

router.post('/submit-vote', async (req, res) => {
  const { question, option, userId } = req.body;

  
  if (!question || !option || !userId) {
    return res.status(400).json({ error: 'Invalid vote data' });
  }

  if (votingData.votes.some(vote => vote.userId === userId && vote.question === question)) {
    return res.status(400).json({ error: 'User has already voted for this question' });
  }

  votingData.votes.push({ userId, question, option });

  const qrCodePath = await generateQRCode(`${question}-${option}`);
  
  res.json({ success: true, qrCodePath });
});

module.exports = router;
