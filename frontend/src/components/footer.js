import React from "react";

const Footer = () => {

    return (<div>
        <footer class="g-padding-x-30--xs g-padding-y-20--xs g-padding-x-60--md g-bg-color--dark">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-sm-4 col-md-4">

                        <p class="g-font-size-13--xs g-margin-b-0--xs g-color--white-opacity">
                            <a href="/" class="g-margin-r-10--xs">
                                <img class="s-header-v2__logo-img s-header-v2__logo-img" src="/logo-sm.png" alt="logo" height="28" />
                            </a>
                            Amid Us</p>
                    </div>
                    <div class="col-xs-12 col-sm-4"></div>
                    <div class="col-xs-12 col-sm-4">
                        <p class="g-font-size-13--xs g-text-right--md g-margin-b-0--xs g-color--white-opacity">
                            <span> Powered by </span><a class="g-color--white-opacity g-font-size-13--xs" href="https://www.expert.ai/" target="_blank" rel="noreferrer">Expert.ai</a>
                        </p>
                    </div>
                </div>
            </div>

        </footer>

    </div>)
}

export default Footer;


