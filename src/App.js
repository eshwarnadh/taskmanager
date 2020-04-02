import React, { useContext } from 'react';
import ListofTasksPage from './pages/ListofTasksPage'
import { Button } from 'reactstrap'
import axios from 'axios'
import {Store} from './contexts/data'
import { ACTIONS } from './contexts/types'
function App() {
  axios.defaults.baseURL = "https://us-central1-taskmanager-cf4f9.cloudfunctions.net/api"
  return (
    <div className="App">
        <ListofTasksPage />
    </div>
  );
}

export default App;
