import React, { useState } from 'react'
import day from '../video/video_day.mp4';
import night from '../video/video_night.mp4';
import './CSS/Home.scss';
import InputAndInfo from './Input&Info';

export default function Home() {

    // for only some effects
    const [checkforday, setCheckDay] = useState(true)
    const [checkfornight, setCheckNight] = useState(false)
    const gettingDAYNIGHT_Value = (value) => {
        if (value === 1) {
            setCheckDay(true);
            setCheckNight(false);
        } else if (value === 0) {
            setCheckNight(true);
            setCheckDay(false);
        }
    }
    return (
        <>
            <div className='container-fluid'>

                {
                    checkforday && (
                        <video autoPlay loop muted>
                            <source src={day} type='video/mp4' />
                        </video>) 
                }
                {
                    checkfornight && (
                        <video autoPlay loop muted>
                            <source src={night} type='video/mp4' />
                        </video>) 
                }

                <div className='container'>
                    <InputAndInfo gettingDAYNIGHT_Value={gettingDAYNIGHT_Value} />
                </div>
            </div>
        </>
    )
}
