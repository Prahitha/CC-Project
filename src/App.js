import React, { useState } from 'react';
import './App.css';
import Amplify, { Storage } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Upload from './Components/upload';
import Query from './Components/query';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

function App() {
  return (
    <Router>
      <Route exact path="/">
          <Upload />
        </Route>
      <Route exact path="/query">
          <Query />
      </Route>
    </Router>
    );
  }
  
  export default App;
