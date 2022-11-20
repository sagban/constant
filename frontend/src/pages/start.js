import React, { useState } from "react";
import axios from 'axios';
import { MapContainer, TileLayer, useMapEvents, Circle, Polyline, Tooltip, Rectangle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import rawdata from './data.json';
import ToolTipCircle from "../components/ToolTipCircle";
import Slider from "../components/slider";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
const Start = () => {

    const lineOptions = { color: 'purple' }
    const zoom = 10;
    const [curr, setCurr] = useState(0);
    const [map, setMap] = useState(null);
    const [showSlider, setShowSlider] = useState(false);
    const [selectMode, setSelectMode] = useState(false);
    const [images, setImages] = useState([]);
    const [rectangle, setRectangle] = useState([]);
    const [startdate, setStartDate] = useState("");
    const [enddate, setEndDate] = useState("");

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
    let data_array = []
    for (var key in dict) {
        if (dict.hasOwnProperty(key)) {
            data_array.push(dict[key]);
        }
    }
    data_array = data_array.filter(d => {
        return d.length > 1
    });

    // Creating array of polygons to display on map
    const polygons = data_array.map(polygon => {
        return polygon[0]['coordinates']
    });


    const [center, setCenter] = useState(polygons[curr][0]);

    const changeCenter = (lat, lng) => {

        lat = parseFloat(lat).toFixed(6);
        lng = parseFloat(lng).toFixed(6);
        map.flyTo([lat, lng], map.zoom);
        setCenter([lat, lng]);
    }

    const MapEvents = () => {

        useMapEvents({
            click(e) {
                const lat = e.latlng.lat;
                const lng = e.latlng.lng
                if (!selectMode) {
                    changeCenter(lat, lng);
                }
                else {
                    if (rectangle.length === 3) {
                        rectangle.push([lat, lng]);
                        rectangle.push(rectangle[0]);
                        setRectangle(rectangle);
                    }
                    else if (rectangle.length < 4) {
                        rectangle.push([lat, lng]);
                        setRectangle(rectangle);
                    }

                    else {
                        toggleSelectMode();
                    }
                }

            },
        });
        return false;
    }

    const nextPolygon = () => {
        const newcurr = (curr + 1) % data_array.length;
        setCurr(newcurr);
        changeCenter(data_array[newcurr][0]['center'][0], data_array[newcurr][0]['center'][1]);
    }

    const handleShowImage = (polygon) => {
        setShowSlider(true);
        setImages(polygon);
    }

    const handleCloseImage = () => {
        setShowSlider(false);
        setImages([]);
    }

    const toggleSelectMode = () => {
        if (rectangle.length === 5 && !selectMode) {
            setRectangle([]);
        }
        setSelectMode(!selectMode);
    }

    const handleStartDate = (date) => {
        if (new Date().getTime() < new Date(date).getTime()) {
            return false;
        }
        else {
            setStartDate(date)
        }
    }

    const handleEndDate = (date) => {
        if (new Date().getTime() < new Date(date).getTime() || new Date(date).getTime() < new Date(startdate).getTime()) {
            return false;
        }
        else {
            setEndDate(date)
        }
    }

    return (<>

        <div class="container g-padding-y-45--xs g-margin-t-40--xs">
            <div class="row">
                <div class="col-md-2">
                    <div className="g-margin-b-10--xs">
                        <label>Select Area</label>
                        <button onClick={() => toggleSelectMode()}
                            class="g-radius--3 text-uppercase s-btn s-btn--xs s-btn--dark-brd g-padding-x-20--xs">{selectMode ? "Click to Disable" : "Click to Enable"}</button>
                    </div>
                </div>
                <div class="col-md-2">
                    <div className="g-margin-b-10--xs">
                        <label>Start Date</label>
                        <DatePicker className="s-form-v4__input" selected={startdate} onChange={(date) => handleStartDate(date)} />
                    </div>
                </div>
                <div class="col-md-2">
                    <div className="g-margin-b-10--xs">
                        <label>End Date</label>
                        <DatePicker className="s-form-v4__input" selected={enddate} onChange={(date) => handleEndDate(date)} />
                    </div>
                </div>
                <div class="col-md-2">
                    <div className="g-margin-b-10--xs">
                        <label>Center Latitude</label>
                        <input disabled type={"text"} className="s-form-v4__input" onChange={(e) => changeCenter(e.target.value, center[1])} placeholder="Enter Latitude" value={center[0]}></input>
                    </div>
                </div>
                <div class="col-md-2">
                    <div className="g-margin-b-10--xs">
                        <label>Center Longitude</label>
                        <input disabled type={"text"} className="s-form-v4__input" onChange={(e) => changeCenter(center[0], e.target.value)} placeholder="Enter Longitude" value={center[1]}></input>
                    </div>
                </div>
                <div class="col-md-2"><div className="g-margin-t-25--xs">
                    <button onClick={() => nextPolygon()}
                        class="g-radius--3 text-uppercase s-btn s-btn--xs s-btn--primary-bg g-padding-x-20--xs">Next</button>
                </div></div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} ref={setMap}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <MapEvents />
                        <Polyline pathOptions={lineOptions} positions={polygons} />
                        {data_array.map(polygon => {
                            return <ToolTipCircle polygon={{ polygon }} handle={handleShowImage} />
                        })}
                        {rectangle.length >= 2 ? <Polyline positions={rectangle}></Polyline> : ''}
                    </MapContainer>
                </div>
            </div>
        </div>
        {showSlider ? <Slider images={{ images }} handle={handleCloseImage}></Slider> : ""}

    </>)
}

export default Start;
