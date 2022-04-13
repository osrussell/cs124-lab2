import {useState} from 'react';
import './Auth.css';
import SignedInApp from './App';
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
import Tasks from "./Tasks";


function Auth() {
    const auth = getAuth();


    const [user, loading, error] = useAuthState(auth);
    function verifyEmail() {
        sendEmailVerification(user);
    }

    if (loading) {
        return <p>Checking...</p>;
    } else if (user) {
        return <SignedInApp/>
    } else {
        return <>
            {error && <p>Error App: {error.message}</p>}
            <div> No user detected</div>
            {/*<TabList>*/}
            {/*    <SignIn key="Sign In"/>*/}
            {/*    <SignUp key="Sign Up"/>*/}
            {/*</TabList>*/}
        </>
    }
}
export default Auth;