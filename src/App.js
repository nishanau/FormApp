import React from 'react';
import 'antd/dist/reset.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import IMS from './pages/IMS';
import FormViewer from './pages/Formviewer';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ims" element={<IMS />} />
        <Route path="/form-viewer" element={<FormViewer />} />
      </Routes>
    </Router>
  );
};

export default App;
