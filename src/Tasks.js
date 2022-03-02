import {useEffect, useState} from 'react';
import Task from './Task.js';
import './Tasks.css'


function Tasks(props) {
    let tempData;
    if (props.isHidden){
      tempData = props.data.filter((a) => !props.completedTaskIds.includes(a.id));
    } else {
       tempData = props.data;
    }

    return <table>
        <tbody>
        {tempData.map(t =>
            <Task task={t.task}
                  id={t.id}
                  isSelected={(props.selectedTaskIds.includes(t.id))}
                  isCompleted={(props.completedTaskIds.includes(t.id))}
                  handleTaskToggleSelected = {props.handleTaskToggleSelected}
                  handleMarkComplete = {props.handleMarkComplete}
            />
        )}
        <tr>
            <td>   </td>
            <td><input type={"button"} value={"Add Item:"}/> <input type={"text"}/></td>
        </tr>
        </tbody>
    </table>
}

export default Tasks