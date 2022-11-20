import React, { useMemo, useState } from "react";
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader  
import { Carousel } from 'react-responsive-carousel';

const Slider = (props) => {

    const polygons = props.images['images'];

    return (<div className="container slider g-bg-color--dark">
        <div className="row closebtnrow">
            <button className="text-uppercase s-btn s-btn--xs s-btn--primary-bg" onClick={() => props.handle()}>X</button>
        </div>
        <div className="row">
            <Carousel dynamicHeight={true} transitionTime={1} autoPlay={true} interval={1000} showThumbs={false} showIndicators={true}>
                {polygons.map(polygon => {
                    return <div>
                        <img src={polygon?.quicklookUrl} alt={polygon?.id} />
                        <p className="legend">
                            {new Date(polygon?.startTimeUTC).toLocaleString()}
                            <br />
                            <a href={polygon?.quicklookUrl} target="_blank">View Full Image</a>
                        </p>
                    </div>
                })}
            </Carousel>
        </div>

    </div >)

}

export default Slider;