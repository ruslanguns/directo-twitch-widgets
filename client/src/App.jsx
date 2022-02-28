import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chats from './Chats';
import SelectedChat from './SelectedChat';
import './styles.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/widgets/selected-chat" element={<SelectedChat />} />
        <Route path="/widgets/confetti" element={<h1>Widget Confetti!</h1>} />
        <Route path="/widgets/stars" element={<h1>Widget Stars!</h1>} />
        <Route path="/" element={<Chats />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
