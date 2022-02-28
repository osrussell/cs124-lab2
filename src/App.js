import {useEffect, useState} from 'react';
import './App.css';
import Tasks from './Tasks.js';

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

  // TO-DO: Currently getting infinite loop in Task after editing handleMarkCompleted
  return ( <>
    <div id = "title">
      Checklist
    </div>

        <div id={"tasks"}>
    <Tasks id={"tasks"} data={currentData}
                        isHidden = {isHidden}
                        handleTaskToggleSelected = {handleTaskToggleSelected}
                        handleMarkComplete={handleMarkComplete}
                        completedTaskIds = {completedTaskIds}
                        selectedTaskIds = {selectedTaskIds}/>
        </div>

    <div id = "buttons">
      <input type = "button" id = "hide" name = "hide"  value = "Hide"/>
        <input type = "button" id = "trash" name = "trash"  value = "Trash"/>
    </div>
  </>
  );
}

export default App;
