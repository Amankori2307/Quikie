import React, { useState } from 'react'
import { Link ,withRouter} from 'react-router-dom'
import upload from './images/upload.png'
import list from './images/list.png'
import statistics from './images/statistics.png'

function Navbar({headerTitle}) {
    const [active,setActive] = useState({
        upload: true,
        list:false,
        statistics:false,
    });

    // to decide which route is active
    const onUploadChange = e => {
        setActive({
            upload: true,
            list:false,
            statistics:false,
        })
        headerTitle({
            upload: true,
            list:false,
            statistics:false,
        });
    }
    const onListChange = e => {
        setActive({
            upload: false,
            list:true,
            statistics:false,
        })
        headerTitle({
            upload: false,
            list:true,
            statistics:false,
        });

    }
    const onStatisticsChange = e => {
        setActive({
            upload: false,
            list:false,
            statistics:true,
        })
        headerTitle({
            upload: false,
            list:false,
            statistics:true,
        });
    }
    return (
        <div className="navbar">
            <Link className={`nav-link ${active.upload?"active":""}`} onClick={onUploadChange} to="/upload"><img src={upload} alt="upload"/> Upload Files</Link>
            <Link className={`nav-link ${active.list?"active":""}`} onClick={onListChange} to="/list"><img src={list} alt="upload"/> List/Modify Files</Link> 
            <Link className={`nav-link ${active.statistics?"active":""}`} onClick={onStatisticsChange} to="/statistics"><img src={statistics} alt="upload"/> Statistics</Link> 
        </div>
    )
}

export default withRouter(Navbar)
