import {useState} from 'react';
import './SignedInApp.css';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {initializeApp} from "firebase/app";
import { signOut } from "firebase/auth";
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

import Tasks from "./Tasks";


function SignedInApp(props) {

    const [sortBy, setSorting] = useState("val");
    const [selectedTaskIds, setSelectedTaskIds] = useState([]);
    const [isHidden, setIsHidden] = useState(false);
    const [locked, setLocked] = useState(true);
    const [editing, toggleEditing] = useState(false);
    const [toBeList, setToBeList] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const [mode, setMode] = useState("main ")

    const collectionRef = collection(props.db, props.topLevel, props.user.uid, props.collectionName);
    const qList = query(collectionRef);
    const [lists , loadingLists, errorLists] = useCollectionData(qList);

    const [currentListID, setCurrentListID] = useState(""); //12345


    const subRef = collection(props.db, props.topLevel, props.user.uid, props.collectionName, currentListID, props.subCollectName );
    const qTasks = query(subRef, orderBy(sortBy));
    const [tasks , loadingTasks, error] = useCollectionData(qTasks);
    //
    // Toggles between modes by adding id names, Important that each mode includes the post-space
    function changeMode(input) {
        if (mode.includes(input)) {
            setMode(mode.replace(input,""));
        } else {
            setMode(mode + input)
        }

    }

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
            void deleteDoc(doc(props.db,props.topLevel, props.user.uid, props.collectionName, currentListID));
            setCurrentListID(lists[0].id)
        }

    }

    function handleAddList (input) {
        if (input !== "") {
            let newid = generateUniqueID();
            let newList = {
                id: newid,
                owner: props.user.uid,
                name: input,
                created: serverTimestamp()
            };
            void setDoc(doc(props.db, props.topLevel, props.user.uid, props.collectionName, newid), newList);

            let baseitemid = generateUniqueID()
            let baseItem = {
                id: baseitemid,
                val: "Start Noting in " + input,
                owner: props.user.uid,
                priority: "small",
                completed: false,
                created: serverTimestamp()
            }
            void setDoc(doc(props.db, props.topLevel, props.user.uid, props.collectionName, newid, props.subCollectName , baseitemid), baseItem);
            setCurrentListID(newid)
            toggleMenu()


            setToBeList("");
        }
    }

    function handleMarkComplete(id, newVal) {
        void updateDoc(doc(props.db, props.topLevel, props.user.uid, props.collectionName, currentListID, props.subCollectName, id), {completed: newVal});
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
        void updateDoc(doc(props.db, props.topLevel, props.user.uid, props.collectionName, currentListID, props.subCollectName, itemId), {val: newValue});
    }

    function onItemDeleted() {
        if (!locked) {
            selectedTaskIds.forEach(id => deleteDoc(doc(props.db, props.topLevel, props.user.uid,
                props.collectionName, currentListID, props.subCollectName , id)));
            setSelectedTaskIds([]); // clears selected ids
            setLocked(!locked)
        }
    }

    function onItemAdded(newVal) {
        let newid = generateUniqueID()
        let newTask = {
            id: newid,
            val: newVal,
            owner: props.user.uid,
            priority: "small",
            completed: false,
            created: serverTimestamp()
        }
        void setDoc(doc(props.db, props.topLevel, props.user.uid, props.collectionName, currentListID, props.subCollectName , newid), newTask);
    }

    // changes if checked items are hidden
    function handleHide() {
        setIsHidden(!isHidden);
    }

    function handlePriority(itemId, current) {
        const reference = doc(props.db, props.topLevel, props.user.uid, props.collectionName, currentListID, props.subCollectName , itemId);
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
    }  else {

        if (!lists.length){
            handleAddList("First List");
        } else {
            setCurrentListID(lists[0].id);
        }

        return (<div className={mode}>



                <header className="header">
                    <h1>
                        <strong tabIndex={"0"}>
                            Checklist&trade;
                        </strong>
                        <input type={"button"} id="toggle" onClick={toggleMenu} value={"    "}
                               aria-label={"hamburger menu button"+(menuOpen ? "menu is open" : "menu is closed")}/>
                    </h1>

                    {menuOpen && <div>
                        {props.user.email}
                        <button type="button" className={"menuButtons"}
                                onClick={() => signOut(props.auth)}>Sign out</button>

                        <ul id="menu">
                            <li key={"Options"}>
                                <input  type={"button"} value={" Options:"}  className={"menuButtons menuHeaders"}  />
                            </li>
                            <li key = {"big"}>
                                <input type={"button"} value={"Big Text Mode"} className={"menuButtons"}
                                       onClick={(_) => changeMode("bigTextMode ")}
                                       aria-label={"Big Text mode"}/>
                            </li>
                        </ul>
                        <ul id="menu">
                            <li key={"Your List"}>
                                <input  type={"button"} value={" Your Lists:"}  className={"menuButtons menuHeaders"}  />
                            </li>

                            {(loadingLists)? "loading":
                                lists.map(t => (t.id === currentListID)?
                                    (<li key={t.id}>
                                        <input type={"button"} value={t.name}  className={"menuButtons currentList"}
                                               onClick={(_) => handleChangeList(t.id)}
                                               aria-label={t.name + " selected"}/>
                                    </li>): (<li key={t.id}>
                                        <input type={"button"} value={t.name}  className={"menuButtons"}
                                               onClick={(_) => handleChangeList(t.id)}
                                               aria-label={t.name + " not selected"}/>
                                    </li>)
                                )}

                            <li key={"List Actions:"}>
                                <input  type={"button"} value={" List Actions:"}  className={"menuButtons menuHeaders"}  />
                            </li>
                            <li>
                                <input type={"button"} value={"Create New List"} className={"menuButtons"}
                                    // below has call to e.target to get rid of warning
                                       onClick={ (_) => handleAddList(toBeList)}
                                />
                            </li>
                            <li>
                                <input type={"text"} id={"addList"} className={"menuButtons"}
                                       onChange={(e) => handleUpdateToBeList(e.target.value)}
                                       onKeyUp={(e) => { if (e.key === "Enter"){ handleAddList(toBeList)}}}
                                       value={toBeList}
                                       aria-label={"input text box to add a new list"}/>
                            </li>
                            <li>
                                <input type={"button"}
                                       className={"menuButtons"}
                                       id={locked? "emojiLocked":"emojiUnlocked"}
                                       value={" "}
                                       onClick={toggleLock}
                                       aria-label={"lock button for deleting list button, currently " + (locked? "locked":"unlocked")}/>
                                <input  type={"button"}  id={locked ? "U" : "L"}
                                        value={"Delete Current List"}  className={"menuButtons"}
                                    // below has call to e.target to get rid of warning
                                        onClick={ (_) => handleRemoveList(toBeList)}
                                        onKeyDown={ (e) => {if (e.key === "Tab") toggleMenu() }}
                                />
                            </li>
                        </ul>
                    </div>}
                </header>

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
                           sortBy={sortBy}
                           loading={loadingTasks}/>


                </div>

                <div id={"left"} >
                </div>

                <div id={"middle"}>
                </div>

                <div id={"right"}>
                </div>

                <div id="buttons">

                    <input type={"button"} id={"hide"} name={"hide"}
                           className={"bottomButtons"}
                           value={(isHidden ? "Show" : "Hide")}
                           onClick={handleHide}/>
                    <></>

                    <div id={"trash"}>
                        <input type={"button"}
                               className={"bottomButtons"}
                               id={locked? "emojiLocked":"emojiUnlocked"}
                               value={" "}
                               onClick={toggleLock}
                               aria-label={"lock button for trash button, currently " + (locked? "locked":"unlocked")}/>
                        <input type={"button"}
                               className={"bottomButtons"}
                               id={locked ? "U" : "L"}
                               value={"Trash"}
                               onClick={onItemDeleted}/>
                    </div>
                </div>


                {/*<img src={'left.png'} alt={"missing!"}>*/}
                {/*</img>*/}

            </div>
        );
    }
}

export default SignedInApp;