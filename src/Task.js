
import "./Task.css"

function Task(props) {
    const classNames = [];
    if (props.isSelected) {
        classNames.push("selected");
    }
    if (props.isCompleted) {
        classNames.push("completed")
    }



    return <>
    <tr className={classNames.join(" ")} >
        <td  onClick={(e) => props.handleMarkComplete(props.id, !(props.isCompleted))}>
            <input type={"checkbox"} checked={props.isCompleted} readOnly={true}/>
        </td>

        <td >
            {props.isEditing && <input type = {"textarea"} className={"taskInput"} id={props.id}
            onClick = {(e) => props.handleTaskToggleSelected(props.id)}
            onChange={(e) => props.onItemChanged(props.id, e.target.value)}
                value = {props.task}
            onKeyUp={(e) => { if (e.key === "Enter"){ props.handleToggleEditing()}}}
            /> }

            {!props.isEditing && <div
                onClick = {(e) => props.handleTaskToggleSelected(props.id)}
                onKeyUp={(e) => { if (e.key === "Enter"){ props.handleTaskToggleSelected(props.id)}}}
                tabIndex={"0"} role={"none"}>

                {props.task}
            </div>}
            </td>
            <td onClick={(e) => props.handlePriority(props.id, props.priority)}>

                <input type = {"button"} aria-label = {"priority button, priority " + props.priority} className={props.priority} />
            </td>
    </tr>
    </>
}

export default Task;