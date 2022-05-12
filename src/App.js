import {useState} from 'react';
import './App.css';
import SignedInApp from './SignedInApp.js';
import {initializeApp} from "firebase/app";
import {
    getFirestore,
    doc,
    setDoc,
    serverTimestamp
} from "firebase/firestore";

import {
    getAuth,
    signOut } from "firebase/auth";

import {
    useAuthState,
    useCreateUserWithEmailAndPassword,
    useSignInWithEmailAndPassword,
    useSignInWithGoogle
} from 'react-firebase-hooks/auth';


// CHECKLIST FOR LAB 5
// 3 Set up firebase authentification rules (include in github)
// 5 User Testing

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
const userCollection = "users";
const collectionName = "listsAuth";
const subCollectName = "tasks";

const auth = getAuth();





function Auth() {
    const [user, loading, error] = useAuthState(auth);

    const [isnewuser, setisnewuser] = useState(false)


    // const collectionRef = collection(db, collectionName); // this now references all users in the collection
    // // const qList = query(collectionRef);

    function toggleNew() {
        setisnewuser(!isnewuser);
    }

    if (loading) {
        return (<header className="header">
            <h1>
                <strong tabIndex={"0"}>
                    Checklist&trade : Loading;
                </strong>
                <input type={"button"} id="toggle"
                       aria-label={"hamburger menu button" }/>
            </h1>
        </header>);

    } else if (user) {

        if (isnewuser) {
            handleNewUser(user)
            toggleNew()
        }
        return <div>
            <SignedInApp db = {db} user = {user} auth = {auth} userCollection={userCollection}
                        collectionName={collectionName} subCollectName={subCollectName}/>
            <button type="button" onClick={() => signOut(auth)}>Sign out</button>

        </div>
            // {!user.emailVerified && <button type="button" onClick={verifyEmail}>Verify email</button>}
    } else {
        return <>
            {error && <p>Error App: {error.message}</p>}
            <header className={"header"}>
                <h1>
                    <strong tabIndex={"0"}>
                        Checklist&trade;
                    </strong>
                </h1>
            </header>
            <div> No user detected</div>
            <div className={"signins"}>
                <SignIn key="Sign In"/>
                {/*<br/>*/}
                --
                <br/>
                <SignUp key="Sign Up" toggleNew ={toggleNew}/>
            </div>
        </>
    }
}


function SignIn() {
    const [
        signInWithEmailAndPassword,
        user1, loading1, error1
    ] = useSignInWithEmailAndPassword(auth);
    const [
        signInWithGoogle,
        user2, loading2, error2
    ] = useSignInWithGoogle(auth);
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");

    if (user1 || user2) {
        // Shouldn't happen because App should see that
        // we are signed in.
        return <div>Unexpectedly signed in already</div>
    } else if (loading1 || loading2) {
        return <p>Logging in…</p>
    }
    return <div>
        {error1 && <p>"Error logging in: " {error1.message}</p>}
        {error2 && <p>"Error logging in: " {error2.message}</p>}
        <div className={"titles"}> Sign In </div>
        <label htmlFor='email'>email: </label>
        <input type="text" id='email' value={email}
               onChange={e => setEmail(e.target.value)}/>
        <br/>
        <label htmlFor='pw'>password: </label>
        <input type="text" id='pw' value={pw}
               onChange={e => setPw(e.target.value)}/>
        <br/>
        <button className={"signin-buttons"} onClick={() => signInWithEmailAndPassword(email, pw)}>
            Sign in with email/password
        </button>

        <br/>
        <button className={"signin-buttons"} onClick={() => signInWithGoogle()}>
            Sign in with Google
        </button>
    </div>
}
        // deleted
function SignUp(props) {
    const [
        createUserWithEmailAndPassword,
        userCredential, loading, error
    ] = useCreateUserWithEmailAndPassword(auth);
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");

    function createNewUserButtonClick() {
        void createUserWithEmailAndPassword(email, pw);
        props.toggleNew();
    }

    if (userCredential) {
        // Shouldn't happen because App should see that
        // we are signed in.
        return <div>Unexpectedly signed in already</div>
    } else if (loading) {
        return <p>Signing up…</p>
    }

    return <div>
        {error && <p>"Error signing up: " {error.message}</p>}
        <div className={"titles"}> Sign Up </div>
        <label htmlFor='email'>email: </label>
        <input type="text" id='email' value={email}
               onChange={e => setEmail(e.target.value)}/>
        <br/>
        <label htmlFor='pw'>password: </label>
        <input type="text" id='pw' value={pw}
               onChange={e => setPw(e.target.value)}/>
        <br/>
        <button className={"signin-buttons"} onClick={() =>
            (createNewUserButtonClick())} >
            Create test user
        </button>

    </div>
}

function handleNewUser (user) {
        console.log("welcome to Notetm")

        let newUser = {
            id: user.uid,
            email: user.email,
            joined: serverTimestamp(),
        }
        void setDoc(doc(db, userCollection, user.uid), newUser);
}



export function App() {
    return <Auth/>
}


export default  App ;
