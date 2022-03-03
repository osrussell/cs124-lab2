import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/// Todo:
///       favicon icon (and others?)
//        add protect against delete selected
///       User testing
///       Update design document  Adam
///       manifest.json
///       Submit / push request / etc

///       Olivia: I listed below a few things we should just double-check before submitting from last time
///       Kill alert.js if we need to or extra files we didn't use
///       Github pages enabled???
///       Whatever we were missing from last time??


const initialData = [
    {
        id: 512,
        task: "Call mom"
    },
    {
        id: 787,
        task: "Talk to github inventors over lunch."
    }
];

ReactDOM.render(
  <React.StrictMode>
      <div id={"background"}>
          <App initialData={initialData}/>
      </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
