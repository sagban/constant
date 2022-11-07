import React, { useState } from "react";

const About = () => {

    return (<div>
        <div class="container g-padding-y-80--xs  g-fullheight--xs">
            <div class="row g-padding-y-50--xs ">

                <div class="col-md-6">
                    <h1 class="g-font-weight--700"><b>What's Farming MadeEasy and why did we create this?</b></h1>
                    <p class="g-font-weight--700 g-color--dark g-font-size-17--xs g-margin-t-25--xs">Precision agriculture is in trend nowadays. Precision agriculture is a modern farming technique that uses the data of soil characteristics, soil types, crop yield data, and weather conditions and suggests the farmers the most optimal crop to grow on their farms for maximum yield and profit. This technique can reduce crop failures and help farmers make informed decisions about their farming strategy.</p>
                    <p class="g-font-weight--700 g-color--dark g-font-size-17--xs g-margin-t-25--xs">In order to mitigate the agrarian crisis in the current status quo, there is a need for better recommendation systems to alleviate the problem by helping the farmers to make an informed decision before starting the cultivation of crops.</p>
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-5"><img class="g-margin-t-0--xs" src="https://images.unsplash.com/photo-1560493676-04071c5f467b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=968&q=80" alt="Logo" width="480" /></div>
            </div>

        </div>
    </div>)
}

export default About;
