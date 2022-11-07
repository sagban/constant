import React, { useState } from "react";

const Home = () => {

    return (<div>
        <div class="s-promo-block-v4 g-fullheight--xs g-bg-position--center swiper-slide home">
            <div class="container g-ver-center--xs g-margin-t-0--xs">
                <div class="row">
                    <div class="col-md-6">
                        <div class="g-margin-b-40--xs">
                            <h1 class="g-font-size-60--xs g-font-size-55--sm g-font-size-65--md g-font-weight--600 g-color--dark">Step towards precision agriculture</h1>
                            <p class="g-font-size-24--xs g-font-size-20--sm g-color--dark g-font-weight--600">recommends optimum crops to<br></br> be cultivated based on soil<br></br> properties and weather conditions</p>
                        </div>
                        <a href="/get-started"
                            class="text-uppercase s-btn s-btn--sm s-btn--dark-bg g-padding-x-30--xs">Get Started</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="container g-padding-y-80--xs">
            <div class="row">
                <div class="col-md-6">
                    <h1 class="g-font-weight--700"><b>It's easy than ever to know what crop to grow for maximum yield and profits</b></h1>
                    <p class="g-font-weight--700 g-color--dark g-font-size-22--xs g-margin-t-25--xs">Farming MadeEasy utilizes the powerful Singlestore DB, offers an ultra fast ingest and query platform that enables real-time model scoring on both
                        streaming and historical data.</p>

                </div>
                <div className="col-md-2"></div>
                <div className="col-md-4"><img class="g-margin-t-0--xs" src="./logo-sm.png" alt="Logo" width="360" /></div>
            </div>

        </div>


    </div>)
}

export default Home;
