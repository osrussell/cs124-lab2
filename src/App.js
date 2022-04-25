import {useState} from 'react';
import './SignedInApp.css';
import SignedInApp from './SignedInApp.js';
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

import {
    getAuth,
    sendEmailVerification,
    signOut } from "firebase/auth";

import {
    useAuthState,
    useCreateUserWithEmailAndPassword,
    useSignInWithEmailAndPassword,
    useSignInWithGoogle
} from 'react-firebase-hooks/auth';


// CHECKLIST FOR LAB 5
// 1 Support User login so they can only see her tasks (at minimum email + password )
// 2 Sharing list with others.
// 3 Set up firebase authentification rules (include in github)
// 4 Updated Design
//     //  I suggest we add "sharing" to the bottom with hide and trash.
// 5 User Testing
// 6
// 7




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

const auth = getAuth();




function Auth() {
    const [user, loading, error] = useAuthState(auth);

    function verifyEmail() {
        sendEmailVerification(user);
    }

    if (loading) {
        return <p>Checking...</p>;
    } else if (user) {
        return <div>
            <SignedInApp db = {db} user = {user} auth = {auth}
                        collectionName={collectionName} subCollectName={subCollectName}/>
            <button type="button" onClick={() => signOut(auth)}>Sign out</button>
            {!user.emailVerified && <button type="button" onClick={verifyEmail}>Verify email</button>}
        </div>
    } else {
        return <>
            {error && <p>Error App: {error.message}</p>}
            <div> No user detected</div>
            <SignIn key="Sign In"/>
            <SignUp key="Sign Up"/>
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
        <label htmlFor='email'>email: </label>
        <input type="text" id='email' value={email}
               onChange={e => setEmail(e.target.value)}/>
        <br/>
        <label htmlFor='pw'>pw: </label>
        <input type="text" id='pw' value={pw}
               onChange={e => setPw(e.target.value)}/>
        <br/>
        <button onClick={() => signInWithEmailAndPassword(email, pw)}>
            Sign in with email/pw
        </button>

        or
        <button onClick={() => signInWithGoogle()}>
            Sign in with Google
        </button>
    </div>
}


function SignUp() {
    const [
        createUserWithEmailAndPassword,
        userCredential, loading, error
    ] = useCreateUserWithEmailAndPassword(auth);
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");

    if (userCredential) {
        // Shouldn't happen because App should see that
        // we are signed in.
        return <div>Unexpectedly signed in already</div>
    } else if (loading) {
        return <p>Signing up…</p>
    }
    return <div>
        {error && <p>"Error signing up: " {error.message}</p>}
        <div> Sign Up Below</div>
        <label htmlFor='email'>email: </label>
        <input type="text" id='email' value={email}
               onChange={e => setEmail(e.target.value)}/>
        <br/>
        <label htmlFor='pw'>pw: </label>
        <input type="text" id='pw' value={pw}
               onChange={e => setPw(e.target.value)}/>
        <br/>
        <button onClick={() =>
            createUserWithEmailAndPassword(email, pw)}>
            Create test user
        </button>

    </div>
}


export function App() {
    return <Auth/>
}

export default  App ;
