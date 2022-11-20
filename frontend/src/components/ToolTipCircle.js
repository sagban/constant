import React, { useMemo, useState } from "react";
import { Circle, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

const ToolTipCircle = (props) => {
    const polygon = props.polygon['polygon'];
    const showImages = useMemo(() => ({
        click(e) {
            polygon.forEach(p => {
                console.log(p.quicklookUrl)
            });
        },
    }));

    return (
        <Circle eventHandlers={showImages} center={polygon[0]['center']} pathOptions={{ color: "red" }} radius={200} >
            <Tooltip>Images Available: {polygon.length} <br /> Click to load images</Tooltip>
        </Circle>
    )
}

export default ToolTipCircle;