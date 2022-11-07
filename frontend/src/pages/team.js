import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Team = () => {
    const navigate = useNavigate()
    return (<div class="container g-padding-y-120--xs  g-fullheight--xs">
        <div className="row">
            <h1 class="g-font-weight--700"><b>Our Team</b></h1>
            <div className="col-md-2"></div>
            <div className="col-md-4" onClick={() => window.location.href = 'https://github.com/sagban'}>
                <img src="./img/sagar.jpg" width={240} alt="sagar" className="pfp" />
                <p className="g-font-weight--700 g-color--dark g-font-size-18--xs g-margin-t-25--xs">Sagar Bansal</p>
                <p>Software Developer</p>
            </div>
            <div className="col-md-4" onClick={() => window.location.href = 'https://github.com/aakriti1318'}>
                <img src="./img/aakriti.jpg" width={240} alt="aakriti" className="pfp" />
                <p className="g-font-weight--700 g-color--dark g-font-size-18--xs g-margin-t-25--xs">Aakriti Aggarwal</p>
                <p>Software Developer</p>
            </div>
        </div>

    </div>)
}

export default Team;
