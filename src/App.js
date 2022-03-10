import  {useState} from 'react';
import './App.css';
import Tasks from './Tasks.js';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

import {initializeApp} from "firebase/app";
import {getFirestore, query, collection, doc, setDoc, updateDoc, deleteDoc} from "firebase/firestore";
import {useCollectionData} from "react-firebase-hooks/firestore";

const firebaseConfig = {

    apiKey: "AIzaSyDaBwlBzUy9suNWGXJWrohmtdrhH9DzZ9s",

    authDomain: "cs124-lab3-9648b.firebaseapp.com",

    projectId: "cs124-lab3-9648b",

    storageBucket: "cs124-lab3-9648b.appspot.com",

    messagingSenderId: "145458893347",

    appId: "1:145458893347:web:30f4350e70aed6433d9796"

};


const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp)
const collectionName = "checklistData";



function App() {
    //const [currentData, setCurrentData] = useState(props.initialData) // starts with data and then setCurrentData can change it

    const [selectedTaskIds, setSelectedTaskIds] = useState([])
    const [completedTaskIds, setCompletedTaskIds] = useState([])
    const [isHidden, setIsHidden] = useState(false)
    const [locked, setLocked] = useState(true)


    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef);
    const [tasks, loading] = useCollectionData(q)


    function handleMarkComplete(id) {
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
        updateDoc(doc(db, collectionName, itemId),{task: newValue} );
    }

    function onItemDeleted() {
        if (!locked) {
            selectedTaskIds.map(id => deleteDoc(doc(db, collectionName, id)));
            setSelectedTaskIds([]); // clears selected ids
            setLocked(!locked)
        }
    }

    function onItemAdded(newVal) {
        let newid = generateUniqueID()
        let newTask = {
            id: newid,
            task: newVal
        }
        setDoc(doc(db, collectionName, newid),newTask);
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

    if (loading) {
        return (<div id="title">
            Loading
        </div>)
    } else {
        // TO-DO: Currently getting infinite loop in Task after editing handleMarkCompleted
        return (<>
                <div id="title">
                    Checklist
                </div>

                <div id={"tasks"}>
                    <Tasks id={"tasks"} data={tasks}
                           isHidden={isHidden}
                           handleTaskToggleSelected={handleTaskToggleSelected}
                           handleMarkComplete={handleMarkComplete}
                           completedTaskIds={completedTaskIds}
                           selectedTaskIds={selectedTaskIds}
                           onItemAdded={onItemAdded}
                           onItemChanged={onItemChanged}/>
                </div>

                <div id="buttons">
                    <input type={"button"} id={"hide"} name={"hide"}
                           className={"bottomButtons"}
                           value={(isHidden ? "Show" : "Hide")}
                           onClick={handleHide}/>

                    <div id={"trash"} >
                        <input type={"button"}
                               className={"bottomButtons"}
                               value={locked ? "U" : "L"}
                               onClick={ toggleLock}/>
                        <input type={"button"}
                               className={"bottomButtons"}
                               id={locked ? "U" : "L"}
                               value={locked ? "Trash" : "Trash"}
                               onClick={ onItemDeleted}/>
                    </div>
                </div>

            </>
        );
    }
}
export default App;
