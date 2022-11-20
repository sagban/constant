import React, { useState } from "react";
import axios from 'axios';
import { MapContainer, TileLayer, useMapEvents, Circle, Polyline, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import rawdata from './data.json';
import ToolTipCircle from "../components/ToolTipCircle";
const Start = () => {

    const lineOptions = { color: 'purple' }
    const zoom = 12;
    const [curr, setCurr] = useState(0);
    const [map, setMap] = useState(null);

    const data = rawdata['data'];

    // Grouping on the basis in latitude and longitude
    const dict = {}
    data.map(d => {
        const lat = parseFloat(d.center[0]).toFixed(2);
        const lng = parseFloat(d.center[1]).toFixed(1);
        const point = [lat, lng];
        const pointKey = JSON.stringify(point);
        if (!dict[pointKey]) {
            dict[pointKey] = [];
            dict[pointKey].push(d);
        }
        else {
            dict[pointKey].push(d);
        }
    });

    // converting unique dict to array
    const data_array = []
    for (var key in dict) {
        if (dict.hasOwnProperty(key)) {
            data_array.push(dict[key]);
        }
    }

    // Creating array of polygons to display on map
    const polygons = data_array.map(polygon => {
        return polygon[0]['coordinates']
    });


    const [center, setCenter] = useState(polygons[curr][0]);

    const changeCenter = (lat, lng) => {

        lat = parseFloat(lat).toFixed(6);
        lng = parseFloat(lng).toFixed(6);
        map.flyTo([lat, lng], zoom);
        setCenter([lat, lng]);
    }

    const MapEvents = () => {
        useMapEvents({
            click(e) {
                changeCenter(e.latlng.lat, e.latlng.lng);
            },
        });
        return false;
    }

    const nextPolygon = () => {
        const newcurr = (curr + 1) % polygons.length;
        setCurr(newcurr);
        changeCenter(data[newcurr]['center'][0], data[newcurr]['center'][1]);
    }

    return (<>

        <div class="container g-padding-y-60--xs g-margin-t-40--xs">
            <div class="row">
                <div class="col-md-3"><div className="g-margin-b-10--xs">
                    <label>Latitude</label>
                    <input type={"text"} className="s-form-v4__input" onChange={(e) => changeCenter(e.target.value, center[1])} placeholder="Enter Latitude" value={center[0]}></input>
                </div></div>
                <div class="col-md-3"><div className="g-margin-b-10--xs">
                    <label>Longitude</label>
                    <input type={"text"} className="s-form-v4__input" onChange={(e) => changeCenter(center[0], e.target.value)} placeholder="Enter Longitude" value={center[1]}></input>
                </div></div>
                <div class="col-md-3"><div className="g-margin-t-30--xs">
                    <button onClick={() => nextPolygon()}
                        class="g-radius--3 text-uppercase s-btn s-btn--xs s-btn--primary-bg g-padding-x-20--xs">Next</button>
                </div></div>
            </div>
            <div class="row">

                <div class="col-md-12">
                    <MapContainer center={center} zoom={5} scrollWheelZoom={false} ref={setMap}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <MapEvents />
                        <Polyline pathOptions={lineOptions} positions={polygons} />
                        {data_array.map(polygon => {
                            return <ToolTipCircle polygon={{ polygon }} />
                            // return <Circle eventHandlers={showImages} center={polygon[0]['center']} pathOptions={{ color: "red" }} radius={200} ><Tooltip>Images Available: {polygon.length} <br /> Click to load images</Tooltip></Circle>
                        })}
                    </MapContainer>
                </div>

            </div>
        </div>
    </>)
}

export default Start;
