import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Link: https://cs124-lab3-9648b--pr2-lab3-yzvnph28.web.app/
// const firebaseConfig = {
//
//     apiKey: "AIzaSyDaBwlBzUy9suNWGXJWrohmtdrhH9DzZ9s",
//
//     authDomain: "cs124-lab3-9648b.firebaseapp.com",
//
//     projectId: "cs124-lab3-9648b",
//
//     storageBucket: "cs124-lab3-9648b.appspot.com",
//
//     messagingSenderId: "145458893347",
//
//     appId: "1:145458893347:web:30f4350e70aed6433d9796"
//
// };

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
