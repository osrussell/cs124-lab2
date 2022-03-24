import {useState} from 'react';
import './App.css';
import Tasks from './Tasks.js';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

import {initializeApp} from "firebase/app";
import {
    getFirestore,
    query,
    orderBy,
    collection,
    doc,
    setDoc,
    updateDoc,
    deleteDoc,
    serverTimestamp
} from "firebase/firestore";
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

    const [sortBy, setSorting] = useState("val");
    const [selectedTaskIds, setSelectedTaskIds] = useState([]);
    const [isHidden, setIsHidden] = useState(false);
    const [locked, setLocked] = useState(true);
    const [editing, toggleEditing] = useState(false);

    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, orderBy(sortBy));
    const [tasks, loading, error] = useCollectionData(q)

    function handleToggleEditing() {
        toggleEditing(!editing);
    }


    function handleMarkComplete(id, newVal) {
        void updateDoc(doc(db, collectionName, id), {completed: newVal});
    }

    function toggleSortby() {
        // setSorting("hi");
        if (sortBy === "val") {
            setSorting("priority");
            console.log(sortBy)
        } else if (sortBy === "priority") {
            setSorting("created");
        } else {
            setSorting("val");
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
        updateDoc(doc(db, collectionName, itemId), {val: newValue}).then();
    }

    function onItemDeleted() {
        if (!locked) {
            selectedTaskIds.forEach(id => deleteDoc(doc(db, collectionName, id)));
            setSelectedTaskIds([]); // clears selected ids
            setLocked(!locked)
        }
    }

    function onItemAdded(newVal) {
        let newid = generateUniqueID()
        let newTask = {
            id: newid,
            val: newVal,
            priority: "small",
            completed: false,
            created: serverTimestamp()
        }
        void setDoc(doc(db, collectionName, newid), newTask);
    }

    // changes if checked items are hidden
    function handleHide() {
        setIsHidden(!isHidden);
    }

    function handlePriority(itemId, current) {
        let reference = doc(db, collectionName, itemId);
        let output;
        if (current === "small") {
            output = "medium";

        } else if (current === "medium") {
            output = "high";

        } else {
            output = "small";

        }
        const foo = {priority: output};
        void updateDoc(reference, foo);

    }

    // changes if we should have the alert open!

    //toggles if the alert is showing
    function toggleLock() {
        setLocked(!locked);
    }

    if (error) {
        return (<div id="title">
            Error: {error}
        </div>)
    } else if (loading) {

        return (<div id="title">
            Loading
        </div>)

    } else {

        return (<>
                <div id="title">
                    Checklist
                </div>

                <div id={"tasks"}>
                    <Tasks id={"tasks"} data={tasks}
                           isHidden={isHidden}
                           handleTaskToggleSelected={handleTaskToggleSelected}
                           handleMarkComplete={handleMarkComplete}
                           handleToggleEditing={handleToggleEditing}
                           isEditing={editing}
                           selectedTaskIds={selectedTaskIds}
                           onItemAdded={onItemAdded}
                           onItemChanged={onItemChanged}
                           handlePriority={handlePriority}
                           toggleSortby={toggleSortby}
                           sortBy={sortBy}/>
                </div>

                <div id="buttons">
                    <input type={"button"} id={"hide"} name={"hide"}
                           className={"bottomButtons"}
                           value={(isHidden ? "Show" : "Hide")}
                           onClick={handleHide}/>

                    <div id={"trash"}>
                        <input type={"button"}
                               className={"bottomButtons"}
                               value={locked ? "U" : "L"}
                               onClick={toggleLock}/>
                        <input type={"button"}
                               className={"bottomButtons"}
                               id={locked ? "U" : "L"}
                               value={locked ? "Trash" : "Trash"}
                               onClick={onItemDeleted}/>
                    </div>
                </div>

            </>
        );
    }
}

export default App;
