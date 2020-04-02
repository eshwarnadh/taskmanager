import React, { useContext } from 'react';
import ListofTasksPage from './pages/ListofTasksPage'
import { Button } from 'reactstrap'
import axios from 'axios'
import {Store} from './contexts/data'
import { ACTIONS } from './contexts/types'
function App() {
  axios.defaults.baseURL = "http://localhost:5000/taskmanager-cf4f9/us-central1/api"
  return (
    <div className="App">
        <ListofTasksPage />
    </div>
  );
}

export default App;
