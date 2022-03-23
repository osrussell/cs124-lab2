import Task from './Task.js';
import './Tasks.css'


function Tasks(props) {
    let tempData;
    if (props.isHidden){
      tempData = props.data.filter((a) => !a.completed);
    } else {
       tempData = props.data;
    }

    // gets text from type box to be added to list
    function handleAdd() {
        let x = document.getElementById("addItem").value;
        if (!(x === "")) {
            props.onItemAdded(x) //adds element gotten
            document.getElementById("addItem").value = "";
        }
    }

    return <table>
        <tbody>
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
            />
        )}
        <tr>
            <td>   </td>
            <td><input type={"button"} value={"Add:"}
                       onClick={handleAdd}/>
                <input type={"text"} id={"addItem"}
                        onKeyUp={(e) => { if (e.key === "Enter"){ handleAdd()}}}/>
            </td>
        </tr>
        </tbody>
    </table>
}

export default Tasks