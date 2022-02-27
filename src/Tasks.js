import {useEffect, useState} from 'react';
import Task from './Task.js';

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

export default Tasks