import React, { useState } from 'react'
import './Form.css'
import firebase from 'firebase'
import {storage} from '../firebase'
import db from '../firebase'

function Form() {
    const [img, setImg] = useState(null)
    const [name, setName] = useState("")
    const [prof, setProf] = useState("")
    const [skills, setSkills] = useState("")
    const [progress, setProgress] = useState(0)

    const handleChange = (e) => {
        if(e.target.files[0]){
            setImg(e.target.files[0])
        }
    }

    const ClearForm = () => {
        setImg(null)
        setName('')
        setProf('')
        setSkills('')
        setProgress(0)
    }
    
    const handleUpload = (e) => {
        e.preventDefault()
        const UploadTask = storage.ref(`images/${img?.name}`).put(img)
        UploadTask.on(
            "state_changed",
            snapshot => {
                const Timer = Math.round((
                    snapshot.bytesTransferred / snapshot.totalBytes
                )*100)
                setProgress(Timer)
            },
            error => {
                console.log(error)
            },
            () => {
                storage
                    .ref("images")
                    .child(img?.name)
                    .getDownloadURL()
                    .then(url => {
                    db.collection('users').add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        image: url,
                        name: name,
                        profession: prof,
                        skills: skills

                    })
                })
            }
        )
        ClearForm()
    }

    return (
        <div className="formBox">
            <form>
                <label>Enter Name:</label>
                <input 
                    type="text" 
                    placeholder="Enter name"
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                /><br/>
                <label>Select a Profile Image:</label>
                <input 
                    type="file"
                    accept="image/png, image/gif, image/jpeg"
                    onChange={handleChange}
                /><br/>
                <label>Enter Profession:</label>
                <input 
                    type="text"
                    placeholder="Profession"
                    value={prof}  
                    onChange={(e) => setProf(e.target.value)}
                /><br/>
                <label>Enter Skills Separted with comma:</label>
                <input 
                    type="text"
                    placeholder="Skills" 
                    value={skills} 
                    onChange={(e) => setSkills(e.target.value)}
                /><br/>
                <button onClick={handleUpload}>Upload Profile</button>

                <label for="file">Uploading: </label>
                <progress id="file" value={progress} max="100"></progress>
            </form>
        </div>
    )
}

export default Form
