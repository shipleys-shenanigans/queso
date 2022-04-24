import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import NoteEditor from './components/NoteEditor';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div id="overall_container">
      <div id="header"></div>
      <NoteEditor></NoteEditor>
      <div id="footer"></div>
    </div>
  </React.StrictMode>
);
