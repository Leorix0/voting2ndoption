import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';

import VotingPage from './components/VotingPage';
import ResultsPage from './components/ResultsPage';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Voting Page</Link>
            </li>
            <li>
              <Link to="/results">Results Page</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={VotingPage} />
        <Route path="/results" exact component={ResultsPage} />
      </div>
    </Router>
  );
};

export default App;
