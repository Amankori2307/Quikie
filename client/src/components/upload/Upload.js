import React, { useState } from 'react'
import axios from 'axios'
import upload from '../images/uploadLabel.png'


function Upload() {
    const [message,setMessage] = useState("");
    const [error, setError] = useState(false) 
    const submit = e  => {
        e.preventDefault()
        const input = document.getElementById("file")
        var file = input.files[0]
        var formdata = new FormData();
        formdata.append('file',file);
        var config = {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }
        axios.post('/upload',formdata,config)
        .then(res => {
            console.log(res.data.message)
            setMessage(res.data.message.msgBody)
            setError(res.data.message.msgError)
        })
    }
    const errorStyle = {
        color:"red",
        border:"1px solid red",
        borderRadius: "3px",
        padding:"3px 10px"
    }    
    const successStyle = {
        color:"green",
        border:"1px solid green",
        borderRadius: "3px",
        padding:"3px 10px"
    }    
    return (
        <>
        <form className="upload" onSubmit={submit} encType= "multipart/form-data">
            {/* To show success and error message */}
            {message && <p style={error?errorStyle:successStyle}>{message}</p>}<br/>

            {/* using an image so that we can style file input */}
            <label htmlFor="file">
                <img src={upload} alt="upload"/>
            </label>
            <input type="file" id= "file"/>
            <button type="submit">Upload</button>
            <p>Upload Test Files</p>
        </form>
        </>
    )
}

export default Upload
