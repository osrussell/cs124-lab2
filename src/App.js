import logo from './logo.svg';
import './App.css';

import {useEffect, useState} from 'react';

function Task(props) {
  const classNames = [];
  if (props.isSelected) {
    classNames.push("selected");
  }

  return <tr className={classNames.join(" ")}>
    <td> <input type={"checkbox"} checked={true} /> </td>
    <td> {props.task} </td>
  </tr>
}

function Tasks(props) {
  return <table>
    <tbody>
    {props.data.map(t =>
        <Task task={t.task}
               id={t.id}
               isSelected={true}/>
    )}
    </tbody>
  </table>
}

function App(props) {
  const [currentData, setCurrentData] = useState(props.initialData) // starts with data and then setCurrentData can change it
  const [selectedTaskIds, setSelectedTaskIds] = useState([])
  const [completedTaskIds, setCompletedTaskIds] = useState([])

  // handles selecting one task to edit the text
  // DO WE ONLY WANT ONE IN  THE LIST??? (since only editing one at once)
  function handleTaskSelected(task) {
    setSelectedTaskIds([...selectedTaskIds, task.id]);
  }

  // handles toggling on and off of a person by adding
  function handleTaskToggleSelected(task) {
    if (selectedTaskIds.includes(task.id)) {
      setSelectedTaskIds(selectedTaskIds.filter(t => t !== task.id));
    } else {
      // adds task.id to list of selectedTaskIds
      setSelectedTaskIds([...selectedTaskIds, task.id]);
    }
  }

  // TO-DO: Pass these functions through!!
  return <>
    <Tasks data={currentData}/>
  </>;
}

export default App;
