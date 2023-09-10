import React, {useState} from 'react'
import secretWordsJson from '../secretWords.json';
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import app from './firebase'

const db = getFirestore(app);

const Dashboard = (props) => {

    const [toggle, setToggle] = useState(true);
    const [loading, setLoading] = useState(false);

    function toggleLecture() {
        setToggle(true);
    }

    function toggleLab() {
        setToggle(false);
    }

    function getWord(x) {
        const res = secretWordsJson.find(el => el.key === x);
        return res["secretWord"];
    }

    async function findStudent(e) {
        const docRef = doc(db, "students", e);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
           return true;
        } else {
           return null;
        }
    }

    async function checkSecretWord() {
        const userInput = document.getElementById('userInput').value;
        const value = document.getElementById('dropdown').value;
        const secretWord = getWord(value);
        if (userInput == secretWord) {
            setLoading(true);
            const s = await findStudent(props.email);
            if (!s) {
                await setDoc(doc(db, "students", props.email), {
                    "Lecture 1": false,
                    "Lecture 2": false,
                    "Lecture 3": false,
                    "Lecture 4": false,
                    "Lecture 5": false,
                    "Lecture 6": false,
                    "Lecture 7": false,
                    "Lecture 8": false,
                    "Lecture 9": false,
                    "Lecture 10": false,
                    "Lab 1": false,
                    "Lab 2": false,
                    "Lab 3": false,
                    "Lab 4": false,
                    "Lab 5": false,
                    "Lab 6": false,
                    "Lab 7": false,
                    "Lab 8": false,
                    "Lab 9": false,
                    "Lab 10": false,
                });
            }
            await updateStudent(props.email, value);
            setLoading(false);
            alert("Your attendance for " + value + ' has been recorded. Thank you for coming!');
        } else {
            alert("Incorrect secret word for " + value + ". Please try again.")
        }
        document.getElementById('userInput').value = "";
    }

    async function updateStudent(e, value) {
        const docRef = doc(db, "students", e);
        await updateDoc(docRef, {
            [value]: true
        })
    }

  return (
    <div>
        <h1>Cubstart Web Attendance Portal</h1>
        <h2>Hello {props.name}!</h2>
        <h4>{props.email}</h4>
        <p>Select from the following:</p>
        <button onClick={toggleLecture} class="btn">Lecture</button>
        <button onClick={toggleLab} class="btn">Lab</button>
        <br></br>
        {toggle ? (
            <select id="dropdown">
                <option value="Lecture 1">Lecture 1</option>
                <option value="Lecture 2">Lecture 2</option>
                <option value="Lecture 3">Lecture 3</option>
                <option value="Lecture 4">Lecture 4</option>
                <option value="Lecture 5">Lecture 5</option>
                <option value="Lecture 6">Lecture 6</option>
                <option value="Lecture 7">Lecture 7</option>
                <option value="Lecture 8">Lecture 8</option>
                <option value="Lecture 9">Lecture 9</option>
                <option value="Lecture 10">Lecture 10</option>
            </select>
        ) : (
            <select id="dropdown">
                <option value="Lab 1">Lab 1</option>
                <option value="Lab 2">Lab 2</option>
                <option value="Lab 3">Lab 3</option>
                <option value="Lab 4">Lab 4</option>
                <option value="Lab 5">Lab 5</option>
                <option value="Lab 6">Lab 6</option>
                <option value="Lab 7">Lab 7</option>
                <option value="Lab 8">Lab 8</option>
                <option value="Lab 9">Lab 9</option>
                <option value="Lab 10">Lab 10</option>
            </select>
        )}
        
        <label>
            <p>Secret Word:</p>
            <input type="text" id="userInput"/>
        </label>
        <button onClick={checkSecretWord} id="submitBtn">Submit</button>
        {loading ? <p>loading...</p> : <></>}
    </div>
  )
}

export default Dashboard