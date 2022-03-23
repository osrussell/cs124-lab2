
import "./Task.css"

function Task(props) {
    const classNames = [];
    if (props.isSelected) {
        classNames.push("selected");
    }
    if (props.isCompleted) {
        classNames.push("completed")
    }

    // function handleChange() {
    //     console.log("hello");
    //     let x = document.getElementById(props.id).innerHTML;
    //     console.log(x);
    //     props.onItemChanged(props.id, x); //adds element gottem
    // }

    // COMMENTING THESE OUT FIXES DISAPPEARING
    //
    return <>
    <tr className={classNames.join(" ")} >
        <td  onClick={(e) => props.handleMarkComplete(props.id, props.isCompleted)}>
            <input type={"checkbox"} checked={props.isCompleted} readOnly={true}/>
        </td>

        <td >
            <input type = {"text"} className={"taskInput"} id={props.id}
                 onClick = {(e) => props.handleTaskToggleSelected(props.id)}
            // onClick={(e) => e.stopPropagation()}
                // props.onItemChanged(props.id,e.target.value)
            onChange={
                (e) => props.onItemChanged(props.id, e.target.value)}
                value = {props.task}/>
            </td>
    </tr>
    </>
}

export default Task;