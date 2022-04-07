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

// comment to check pushing!!

const firebaseConfig = {

    apiKey: "AIzaSyDaBwlBzUy9suNWGXJWrohmtdrhH9DzZ9s",
    authDomain: "cs124-lab3-9648b.firebaseapp.com",
    projectId: "cs124-lab3-9648b",
    storageBucket: "cs124-lab3-9648b.appspot.com",
    messagingSenderId: "145458893347",
    appId: "1:145458893347:web:30f4350e70aed6433d9796"

};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const collectionName = "lists";
const subCollectName = "tasks";




function App() {

    const [sortBy, setSorting] = useState("val");
    const [selectedTaskIds, setSelectedTaskIds] = useState([]);
    const [isHidden, setIsHidden] = useState(false);
    const [locked, setLocked] = useState(true);
    const [editing, toggleEditing] = useState(false);
    const [currentListID, setCurrentListID] = useState("YhwrxHOkAoPGyP0WV8De"); //12345
    const [toBeList, setToBeList] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);

    const collectionRef = collection(db, collectionName);
    const qList = query(collectionRef);
    const [lists , loadingLists, errorLists] = useCollectionData(qList);

    const subRef = collection(db, collectionName, currentListID, subCollectName );
    const qTasks = query(subRef, orderBy(sortBy));
    const [tasks , loadingTasks, error] = useCollectionData(qTasks);

    function handleToggleEditing() {
        toggleEditing(!editing);
        if (sortBy === "val") {
            setSorting("priority");
        }
    }

    function handleUpdateToBeList(input) {
        setToBeList(input);
    }

    function handleRemoveList() {
        if (lists.length > 1){
            void deleteDoc(doc(db, collectionName, currentListID));
            setCurrentListID(lists[0].id)
        }
    }

    function handleAddList (input) {
        if (input !== "") {
            let newid = generateUniqueID();
            let newList = {
                id: newid,
                name: input,
                created: serverTimestamp()
            };
            void setDoc(doc(db, collectionName, newid), newList);

            let baseitemid = generateUniqueID()
            let baseItem = {
                id: baseitemid,
                val: "Start Noting!",
                priority: "small",
                completed: false,
                created: serverTimestamp()
            }
            void setDoc(doc(db, collectionName, newid, subCollectName , newid), baseItem);


            setToBeList("");
        }
    }

    function handleMarkComplete(id, newVal) {
        void updateDoc(doc(db, collectionName, currentListID, subCollectName, id), {completed: newVal});
    }

    function toggleSortby() {
        if (sortBy === "val") {
            setSorting("priority");
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
        void updateDoc(doc(db, collectionName, currentListID, subCollectName, itemId), {val: newValue});
    }

    function onItemDeleted() {
        if (!locked) {
            selectedTaskIds.forEach(id => deleteDoc(doc(db, collectionName, currentListID, subCollectName , id)));
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
        void setDoc(doc(db, collectionName, currentListID, subCollectName , newid), newTask);
    }

    // changes if checked items are hidden
    function handleHide() {
        setIsHidden(!isHidden);
    }

    function handlePriority(itemId, current) {
        const reference = doc(db, collectionName, currentListID, subCollectName , itemId);
        let output;
        if (current === "small") {
            output = "medium";

        } else if (current === "medium") {
            output = "high";

        } else {
            output = "small";

        }
        void updateDoc(reference, {priority: output});
    }

    function handleChangeList(id) {
        setCurrentListID(id);
    }


    //toggles if the alert is showing
    function toggleLock() {
        setLocked(!locked);
    }

    //switches if menu is open or closed
    function toggleMenu() {
        setMenuOpen(!menuOpen);
    }

    if (error || errorLists) {
        return (<div id="title">
            Error: {error}
        </div>)
    } else if (loadingTasks || loadingLists) {

        return (<div id="title">
            Loading
        </div>)

    } else {

        return (<>

                {/*<div id="title">*/}
                {/*    Checklist*/}
                {/*</div>*/}

                <header className="header">
                    <h1>
                        Checklist
                        <input type={"button"} id="toggle" onClick={(e) => toggleMenu()} value={"    "}></input>
                    </h1>

                    {menuOpen && <div id="menu">
                        {lists.map(t =>
                            <input type={"button"} value={t.name} key={t.id}
                                   onClick={(e) => handleChangeList(t.id)}/>)
                        }
                    </div>}
                </header>


                <div id={"tasks"}>
                    {/*{lists.map(t =>*/}
                    {/*    <input type={ "button"} value={t.name} key={t.id}*/}
                    {/*        onClick={(e) => handleChangeList(t.id)}/> )*/}
                    {/*}*/}
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
                           sortBy={sortBy}
                           handleToggleEditing={handleToggleEditing}/>

                    <input type={"button"} value={"Create New List"}
                        // below has call to e.target to get rid of warning
                           onClick={ (e) => handleAddList(toBeList)}
                        />
                    <input type={"text"} id={"addList"}
                           onChange={(e) => handleUpdateToBeList(e.target.value)}
                           onKeyUp={(e) => { if (e.key === "Enter"){ handleAddList(toBeList)}}}
                           value={toBeList}/>
                    <div id="listDelete">
                        <input  type={"button"} value={"Delete Current List"}
                            // below has call to e.target to get rid of warning
                                onClick={ (e) => handleRemoveList(toBeList)}
                        />
                    </div>
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
                               value={"Trash"}
                               onClick={onItemDeleted}/>
                    </div>
                </div>

            </>
        );
    }
}

export default App;
