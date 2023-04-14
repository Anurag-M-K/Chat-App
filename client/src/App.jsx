/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable linebreak-style */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';
import SetAvatar from './pages/SetAvatar';

export default function App() {
  return (
    // eslint-disable-next-line react/self-closing-comp
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Chat />} />
        <Route path="/setavatar" element={<SetAvatar />} />
      </Routes>
    </BrowserRouter>
  );
}
