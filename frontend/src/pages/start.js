import React, { useState } from "react";
import axios from 'axios';
import { MapContainer, TileLayer, useMapEvents, Circle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
const Start = () => {

    const [center, setCenter] = useState([-2.22977, 24.75178]);
    const [map, setMap] = useState(null);
    const [params, setParams] = useState({});
    const [visible, setVisible] = useState(false);
    const [prediction, setPrediction] = useState("");

    const depth = "0-5cm";
    const value = "mean";
    const ph = "phh2o";
    const nitrogen = "nitrogen";

    const MapEvents = () => {
        useMapEvents({
            click(e) {
                setCenter([parseFloat(e.latlng.lat).toFixed(6), parseFloat(e.latlng.lng).toFixed(6)]);
                map.flyTo([parseFloat(e.latlng.lat).toFixed(6), parseFloat(e.latlng.lng).toFixed(6)], map.getZoom())
            },
        });
        return false;
    }


    const changeCenter = (lat, lng) => {

        lat = parseFloat(lat);
        lng = parseFloat(lng);
        map.flyTo([lat, lng], map.getZoom());
        setCenter([lat, lng]);
    }


    const getSoilProperties = () => {
        const SOIL_URL = `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${center[1]}&lat=${center[0]}&property=${nitrogen}&property=${ph}&depth=${depth}&value=${value}`;
        axios.get(SOIL_URL).then(res => {
            if (res.status === 200) {
                const results = res['data']['properties']['layers'];
                results.forEach(el => {
                    const property = el['name'];
                    if (el['depths'][0]['label'] === depth) {
                        params[property] = el['depths'][0]['values'][value] / 10;
                        setParams(params);
                    }
                });
            };

        });

    };

    const getWeatherConditions = () => {
        const date = new Date(), y = date.getFullYear(), m = date.getMonth(), d = date.getDate();
        const firstDay = `${y}-${m}-${d - 1}`;
        const lastDay = `${y}-${m}-${d}`;
        const URL = `https://api.weatherbit.io/v2.0/history/daily?lat=${center[0]}&lon=${center[1]}&start_date=${firstDay}&end_date=${lastDay}&key=67352e964a284bf1a4fb27047fd48e4f`;


        axios.get(URL).then((res) => {
            if (res.status === 200) {
                const data = res.data['data'][0];
                params['rainfall'] = data['precip'];
                params['humidity'] = data['rh'];
                params['temperature'] = data['temp'];
                setParams(params);
            }

        }).catch(function (error) {
            console.error(error);
        });
    }

    const getRecommendations = async () => {
        await getSoilProperties();
        await getWeatherConditions();
        const URL = "http://localhost:7071/api/GetRecommendations";
        axios.post(URL, params).then(res => {
            if (res.status === 200) {
                setPrediction(res.data);
                setVisible(true);
            }
        })
    };


    return (<>

        <div class="container g-padding-y-60--xs g-margin-t-40--xs">
            <div class="row">
                <div class="col-md-10">
                    <MapContainer center={center} zoom={6} scrollWheelZoom={false} ref={setMap}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <MapEvents />
                        <Circle center={center} pathOptions={{ color: "green" }} radius={50} />
                    </MapContainer>
                </div>
                <div class="col-md-2">
                    <div className="g-margin-b-10--xs">
                        <label>Latitude</label>
                        <input type={"text"} className="s-form-v4__input" onChange={(e) => changeCenter(e.target.value, center[1])} placeholder="Enter Latitude" value={center[0]}></input>
                    </div>
                    <div className="g-margin-b-10--xs">
                        <label>Longitude</label>
                        <input type={"text"} className="s-form-v4__input" onChange={(e) => changeCenter(center[0], e.target.value)} placeholder="Enter Longitude" value={center[1]}></input>
                    </div>
                    <div className="g-margin-t-20--xs">
                        <button onClick={() => getRecommendations()}
                            class="g-radius--3 text-uppercase s-btn s-btn--xs s-btn--primary-bg g-padding-x-20--xs">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
        {visible ?
            <div className="container g-padding-y-40--xs" id="#results">
                <div class="row">
                    <h1 class="g-font-weight--700 g-margin-b-40--xs">Crop Recommendations</h1>
                    <div class="col-md-5">
                        <p class="g-font-weight--700 g-font-size-18--xs g-color--primary">Latitude: <span class="g-color--dark">{center[0]}</span></p>
                        <p class="g-font-weight--700 g-font-size-18--xs g-color--primary">Longitude: <span class="g-color--dark">{center[1]}</span></p>
                        <p class="g-font-weight--700 g-font-size-18--xs g-color--primary">Nitrogen: <span class="g-color--dark">{params?.nitrogen}</span></p>
                        <p class="g-font-weight--700 g-font-size-18--xs g-color--primary">PH: <span class="g-color--dark">{params?.phh2o}</span></p>
                        <p class="g-font-weight--700 g-font-size-18--xs g-color--primary">Temperature C: <span class="g-color--dark">{params?.temperture}</span></p>
                        <p class="g-font-weight--700 g-font-size-18--xs g-color--primary">Relative Humidity %: <span class="g-color--dark">{params?.humidity}</span></p>
                        <p class="g-font-weight--700 g-font-size-18--xs g-color--primary">Rainfaill (in mm): <span class="g-color--dark">{params?.rainfall}</span></p>
                    </div>
                    <div class="col-md-7">
                        <p class="g-font-weight--700 g-font-size-18--xs g-color--dark">Best suitable crop for the mentioned parameters: <b>{prediction}</b></p>
                        <img scr={`/img/${prediction}.jpg`} alt={prediction} width="300" />
                    </div>
                </div>
            </div>
            : <></>}


    </>)
}

export default Start;
