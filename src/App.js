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
  const [locked, setLocked] = useState(true)




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
 function onItemChanged(itemId, newValue) {
      setCurrentData(currentData.map((a) => a => a.id === itemId ? {...a, task: newValue} : a));
 }

  function onItemDeleted() {
      if (!locked) {
          setCurrentData(currentData.filter((a) => !(selectedTaskIds.includes(a.id))));
          setSelectedTaskIds([]); // clears selected ids
          setLocked(!locked)
          }
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


  //toggles if the alert is showing
  function toggleLock() {
      setLocked(!locked);
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
                        selectedTaskIds = {selectedTaskIds}
                        onItemAdded = {onItemAdded}
                        onItemChanged = {onItemChanged}/>
        </div>

    <div id = "buttons">
      <input type={"button"} id = "hide" name = "hide"
             className={"bottomButtons"}
             value = {(isHidden ? "Show":"Hide")}
             onClick={(e) =>handleHide()}/>

        <div id = "trash" name = "trash">
            <input type={"button"}
                   className={"bottomButtons"}
                   value ={locked? "U":"L"}
                   onClick = {(event) => toggleLock()}/>
            <input type={"button"}
                   className={"bottomButtons"}
                   id={locked? "U":"L"}
                   value ={locked? "Trash":"Trash"}
               onClick = {(event) => onItemDeleted()}/>
        </div>
    </div >

    </>
  );
}

export default App;
