import {useEffect, useState} from 'react';
import App from "./App";
// import './Tasks.css';

function Task(props) {
    const classNames = [];
    if (props.isSelected) {
        classNames.push("selected");
    }
    // COMMENTING THESE OUT FIXES DISAPPEARING
    //
    //
    return <>
    <tr className={classNames.join(" ")} >
        <td  onClick={(e) => props.handleMarkComplete(props.id)}> <input type={"checkbox"} checked={props.isCompleted}/>
        </td>
        <td onClick = {(e) => props.handleTaskToggleSelected(props.id)}> {props.task}
        </td>
    </tr>
    </>
}

export default Task;