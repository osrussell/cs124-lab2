import Task from './Task.js';
import './Tasks.css'
import {useState} from "react";


function Tasks(props) {
    let tempData;
    if (props.isHidden){
      tempData = props.data.filter((a) => !a.completed);
    } else {
       tempData = props.data;
    }

    const [toBeInput, updateToBeInput] = useState("")


    function handleUpdateToBeInput(newVal) {
                updateToBeInput(newVal)
    }

    // gets text from type box to be added to list
    function handleAdd(newVal) {
        if (newVal !== "") {
            props.onItemAdded(newVal) //adds element gotten
        }
        updateToBeInput("")
    }

    return <table>
        <tbody>
        <tr>
            <td>
            </td>
            <td>   <input type={"button"} value={!props.isEditing? "Edit All":"Stop Editing"}
                          onClick={(e) => props.handleToggleEditing()}/>
                <input type={"button"} value={(props.sortBy==="val")? "ToggleSort: task": ("ToggleSort: " + props.sortBy) }
                       onClick={(e) =>props.toggleSortby()}/>
            </td>
            <td>

            </td>

        </tr>
        {tempData.map(t =>
            <Task task={t.val}
                  id={t.id}
                  key = {t.id}
                  isSelected={(props.selectedTaskIds.includes(t.id))}
                  isCompleted={t.completed}
                  handleTaskToggleSelected = {props.handleTaskToggleSelected}
                  handleMarkComplete = {props.handleMarkComplete}
                  onItemChanged = {props.onItemChanged}
                  priority = {t.priority}
                  isEditing ={props.isEditing}
                  handlePriority={props.handlePriority}

            />
        )}

        <tr>
            <td>   </td>
            <td><input type={"button"} value={"Add:"}
                       onClick={(e) => handleAdd(toBeInput)}/>
                <input type={"text"} id={"addItem"}
                       onChange={(e) => handleUpdateToBeInput(e.target.value)}
                        onKeyUp={(e) => { if (e.key === "Enter"){ handleAdd(toBeInput)}}}/>
            </td>
        </tr>

        </tbody>
    </table>
}

export default Tasks