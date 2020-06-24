import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {HorizontalBar} from 'react-chartjs-2'

function Statistics() {
    const [values, setValues] = useState([]);
    useEffect(() => {
        axios.get('/upload/bar')
        .then(res => {
            console.log(res.data)
            let typesValue = []
            Object.values(res.data).forEach(type => typesValue.push(type))
            setValues(typesValue);
        })
    },[])
    const data = {
        labels:['PNG','JPEG','MP4','PDF'],
        datasets:[{
            label:'Counts of PNG/JPEG/MP4/PDF',
            data : values,
            backgroundColor:"rgba(0,255,0,0.2)"
        }]
    }
    return (
        <div className="graph">
            <HorizontalBar data={data} options = {
                    {
                        scales: {
                            xAxes: [{
                                gridLines: {
                                    offsetGridLines: true
                                }
                            }]
                        }}
                    }
                />
        </div>
    )
}

export default Statistics
