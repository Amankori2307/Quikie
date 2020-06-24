import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import SingleItem from './SingleItem'
function List() {
    const [fileList, setFileList] = useState([])
    useEffect(() => {
        axios.get('/upload')
        .then(res => {
            console.log(res.data.data)
            setFileList(res.data.data)
        })
    },[])

    const refresh = () => {
        axios.get('/upload')
        .then(res => {
            console.log(res.data.data)
            setFileList(res.data.data)
        })
    }
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>File Name</th>
                    <th>Link</th>
                </tr>
            </thead>
            <tbody>
                {/* looping through every file */}
                {fileList.map((file) => <SingleItem key={file._id} file={file} refresh={refresh}/>)}
            </tbody>
        </table>
    )
}

export default withRouter(List)
