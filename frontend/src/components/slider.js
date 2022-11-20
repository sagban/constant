import React, { useMemo, useState } from "react";
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader  
import { Carousel } from 'react-responsive-carousel';

const Slider = (props) => {

    const polygons = props.images['images'];
    console.log(polygons);
    return (<div className="container slider g-bg-color--dark">
        <Carousel dynamicHeight={true} transitionTime={1} autoPlay={true} interval={1000} showThumbs={false} infiniteLoop={true}>
            {polygons.map(polygon => {
                return <div>
                    <img src={polygon?.quicklookUrl} alt={polygon?.id} />
                    <p className="legend">
                        {polygon?.startTimeUTC}
                        <br />
                        <a href={polygon?.quicklookUrl} target="_blank">View Full Image</a>
                    </p>
                </div>
            })}

        </Carousel>
    </div>)

}

export default Slider;