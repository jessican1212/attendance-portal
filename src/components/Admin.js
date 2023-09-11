import React, { useState, useEffect} from 'react';
import styles from './Admin.css';
import app from './firebase'
import { getFirestore, doc, getDoc, query, where, getDocs, collection } from "firebase/firestore";

const db = getFirestore(app);
const q = query(collection(db, "students"));
const qu = query(collection(db, "students"), where("Total", "<", 20-4));

const Admin = () => {

  const [x, setx] = useState([]);
  const [y, sety] = useState([]);

  useEffect(() => {
    async function getAllStudents() {
      const querySnapshot = await getDocs(q);
      const newData = [];
      querySnapshot.forEach((doc) => {
        newData.push([doc.id, doc.data().Total]);
      });
      setx(newData);
    }
    async function stuentsExceededLimit() {
      const querySnapshot = await getDocs(qu);
      const newData = [];
      querySnapshot.forEach((doc) => {
        newData.push([doc.id, doc.data().Total]);
      });
      sety(newData);
    }
    getAllStudents();
    stuentsExceededLimit();
  }, []);

  return (
    <div>
        <h1 style={{color: "red", fontWeight: "900"}}>ADMIN PORTAL!!!</h1>
        <p style={{color: "red", fontWeight: "900"}}>what data do we want to see??</p>
        <p><b><u>Overview of all students + # of check ins</u></b></p>
        <ol class="list">
          {x.map((item, index) => (<li key={index}>{item[0]}: {item[1]}</li>))}
        </ol>
        <p><b><u>Students with greater than 4 absenses</u></b></p>
        <ol class="list">
          {y.map((item, index) => (<li key={index}>{item[0]}: {item[1]}</li>))}
        </ol>
        <p>*if a student is not here, they have NOT checked in for any lecture/lab</p>
    </div>
  )
}

export default Admin