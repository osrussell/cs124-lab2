import {useEffect, useState} from 'react';
import './App.css';
import Tasks from './Tasks.js';
import * as events from "events";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

function App(props) {
  const [currentData, setCurrentData] = useState(props.initialData) // starts with data and then setCurrentData can change it
  const [selectedTaskIds, setSelectedTaskIds] = useState([])
  const [completedTaskIds, setCompletedTaskIds] = useState([])
  const [isHidden, setIsHidden] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)

  // handles selecting one task to edit the text
  // // DO WE ONLY WANT ONE IN  THE LIST??? (since only editing one at once)
  // function handleTaskSelected(task) {
  //   setSelectedTaskIds([...selectedTaskIds, task.id]);
  // }



  function handleMarkComplete(id){
    if (completedTaskIds.includes(id)) {
      setCompletedTaskIds(completedTaskIds.filter(t => t !== id));
    } else {
      // adds task.id to list of selectedTaskIds
      setCompletedTaskIds([...completedTaskIds, id]);
    }
  }
  // handles toggling on and off of a person by adding
  function handleTaskToggleSelected(id) {
    if (selectedTaskIds.includes(id)) {
      setSelectedTaskIds(selectedTaskIds.filter(t => t !== id));
    } else {
      // adds task.id to list of selectedTaskIds
      setSelectedTaskIds([...selectedTaskIds, id]);
    }
  }
  //
 function onItemChanged(itemId, field, newValue) {
      setCurrentData(currentData.map((a) => a => a.id === itemId ? {...a, [field]: newValue} : a));
 }

  function onItemDeleted(itemId) {
      setCurrentData(currentData.filter((a) => !(a.id === itemId)));
  }

  function onItemAdded(newVal) {
      let newTask = {
          id: generateUniqueID(),
          task: newVal
      }
      setCurrentData([...currentData,newTask]);
  }

  // changes if checked items are hidden
  function handleHide() {
    setIsHidden(!isHidden);
  }

  // changes if we should have the alert open!
  function handleTrash() {
    setAlertOpen(!alertOpen);
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
      <input type={"button"} id = "hide" name = "hide"  value = {(isHidden ? "Show":"Hide")}
             onClick={(e) =>handleHide()}/>

        <input type={"button"} id = "trash" name = "trash"  value ={alertOpen? "Trashing":"Trash"}
               onClick = {(event) => handleTrash()}/>
    </div>
  </>
  );
}

export default App;
