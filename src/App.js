import React from 'react';
import './App.css';
import MainPage from './page/MainPage';
import OptidayApp from './components/OptidayApp';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter> 
      <OptidayApp />
      </BrowserRouter>
    </div>
  );
}

export default App;
