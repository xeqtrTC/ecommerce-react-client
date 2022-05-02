/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react'
import {sliderData}  from '../../data'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import './Slider.css';


export default function Slider({ autoPlay = true, autoPlayTime = 3000, images = [], ...props }) {
    const length = sliderData.length
    const [current, setCurrent] = useState(0);

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    }
    console.log(current);

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    }

    if(!Array.isArray(sliderData) || sliderData.length <= 0) {
        return null
    }

    return (
        <div className='slider'>
            {
                sliderData.map((slide, index) => {
                    return (
                        <div className={index === current ? 'slide active' : 'slide'} key={index}>
                            {
                                index === current && (
                                    <img src={slide.image} alt='pic'/>
                                )
                            }
                        </div>
                    )
                })
            }
            <ArrowForwardIosIcon className='right' onClick={nextSlide} />
            <ArrowBackIosNewIcon className='left'  onClick={prevSlide} />

        </div>
    )

    
}
