import React, {useState} from 'react'
import secretWordsJson from '../secretWords.json';
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import app from './firebase'
import './Dashboard.css';

const db = getFirestore(app);

const Dashboard = (props) => {

    const [activeButton, setActiveButton] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };

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
        if (!activeButton) {
            alert("Please select a lecture or lab.");
            return;
        }
        const userInput = document.getElementById('userInput').value;
        const value = document.getElementById('dropdown').value;
        const secretWord = getWord(value);
        if (userInput === secretWord) {
            setLoading(true);
            const s = await findStudent(props.email);
            if (!s) {
                await setDoc(doc(db, "students", props.email), {
                    "Lecture 1": null,
                    "Lecture 2": null,
                    "Lecture 3": false,
                    "Lecture 4": false,
                    "Lecture 5": false,
                    "Lecture 6": false,
                    "Lecture 7": false,
                    "Lecture 8": false,
                    "Lecture 9": false,
                    "Lecture 10": false,
                    "Lab 1": null,
                    "Lab 2": null,
                    "Lab 3": false,
                    "Lab 4": false,
                    "Lab 5": false,
                    "Lab 6": false,
                    "Lab 7": false,
                    "Lab 8": false,
                    "Lab 9": false,
                    "Lab 10": false,
                    "Total": 0,
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
        const d = await getDoc(docRef);
        const res = d.data();
        const newTotal = res["Total"];
        await updateDoc(docRef, {
            [value]: true,
            "Total": newTotal+1,
        })
    }

  return (
    <div>
        <h1>Cubstart Web Attendance Portal</h1>
        <h2>Hello {props.name}!</h2>
        <h4>{props.email}</h4>
        <p>Select from the following:</p>
        <button
        onClick={() => handleButtonClick('button1')}
        className={activeButton === 'button1' ? 'active' : ''}
      >Lecture</button>
      <button
        onClick={() => handleButtonClick('button2')}
        className={activeButton === 'button2' ? 'active' : ''}
      >Lab</button>

      <div className="display-area">
        {activeButton === 'button1' && <div>
        <select id="dropdown">
                <option value="Lecture 3">Lecture 3</option>
                <option value="Lecture 4">Lecture 4</option>
                <option value="Lecture 5">Lecture 5</option>
                <option value="Lecture 6">Lecture 6</option>
                <option value="Lecture 7">Lecture 7</option>
                <option value="Lecture 8">Lecture 8</option>
                <option value="Lecture 9">Lecture 9</option>
                <option value="Lecture 10">Lecture 10</option>
            </select>
            </div>}
        {activeButton === 'button2' && <div>
        <select id="dropdown">
                <option value="Lab 3">Lab 3</option>
                <option value="Lab 4">Lab 4</option>
                <option value="Lab 5">Lab 5</option>
                <option value="Lab 6">Lab 6</option>
                <option value="Lab 7">Lab 7</option>
                <option value="Lab 8">Lab 8</option>
                <option value="Lab 9">Lab 9</option>
                <option value="Lab 10">Lab 10</option>
            </select>
            </div>}
      </div>
        
        
        
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