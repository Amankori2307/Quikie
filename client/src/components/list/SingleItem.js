import React, { useState } from 'react'
import axios from 'axios'
import editimg from '../images/edit.png';
import deleteimg from '../images/delete.png'
function SingleItem({file, refresh}) {
    const [edit, setEdit] = useState(false)
    const [filename, setFileName] = useState("")
    const deleteOnClick = () => {
        axios.delete('/upload',{
            headers : {
                "Content-Type":"application/json"
            },
            data : {
                id : file._id
            }
        })
        .then(res => {
            console.log(res)
            refresh();
        })
    }
    const editOnClick = () => {
        setEdit(true)
        setFileName(file.filename.split('.')[0])
    }
    const filenameOnChange = e => {
        setFileName(e.target.value)
    }
    const submitChanges = () => {
        axios.put('/upload',{
            id:file._id,
            filename:filename
        },{
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res => {
            console.log(res.data)
            setEdit(false);
            setFileName("");
            refresh();
        })
    }
    return (
        <tr>
            {!edit ?
                <>
                    <td><p className="truncate" >{file.filename}</p></td>
                    <td>
                        <a href={`http://127.0.01:5000/${file.url}`} download className="link">Download</a>
                        <img src = {editimg} alt = "edit" onClick={editOnClick} />
                        <img  src = {deleteimg} alt = "delete" onClick={deleteOnClick} />
                    </td>
                </>:
                <>
                    <td>
                        <input type="text" value={filename}  onChange={filenameOnChange}/>
                    </td>
                    <td>
                        <button className="btn"onClick={submitChanges}>Edit</button>
                    </td>
                </>
                }
        </tr>
    )
}

export default SingleItem
