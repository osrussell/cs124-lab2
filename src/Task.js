
import "./Task.css"

function Task(props) {
    const classNames = [];
    if (props.isSelected) {
        classNames.push("selected");
    }
    if (props.isCompleted) {
        classNames.push("completed")
    }

    // COMMENTING THESE OUT FIXES DISAPPEARING
    //
    //
    return <>
    <tr className={classNames.join(" ")} >
        <td  onClick={(e) => props.handleMarkComplete(props.id)}>
            <input type={"checkbox"} checked={props.isCompleted}/>
        </td>

        <td >
            <div className={"taskInput"} contentEditable={true}
                 onClick = {(e) => props.handleTaskToggleSelected(props.id)}
            // onClick={(e) => e.stopPropagation()}
            onChange={
                (e) => props.onItemChanged(props.id,e.target.value)}>
                {props.task}
            </div>
        </td>
    </tr>
    </>
}

export default Task;