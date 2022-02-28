import {useEffect, useState} from 'react';
import App from "./App";
// import './Tasks.css';

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

export default Task;