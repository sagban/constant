import React, { useState } from "react";

const About = () => {

    return (<div>
        <div class="container g-padding-y-80--xs  g-fullheight--xs">
            <div class="row g-padding-y-50--xs ">

                <div class="col-md-6">
                    <h1 class="g-font-weight--700"><b>What's Amid Us and why did we create this?</b></h1>
                    <p class="g-font-weight--700 g-color--dark g-font-size-17--xs g-margin-t-25--xs">The world of the internet opens up a lot of pathways and opportunities for everyone. But, one aspect of it is bullying. We wanted to make something that could automate the process of identifying cyberbullying. Moreover, we wanted to make something that lets the users analyze their group chats, and find out the insights very easily, without having to read all of the chat over and over again, but instead, with a single click. Amid Us is powered by Expert AI, an amazing AI-powered NLP tool that can find the sentiments and deep insights of texts. It let us formulate everything and display it all to the user base. Users just have to upload their WhatsApp chats, which they can get by exporting them through their phone, and then get started!</p>

                </div>
                <div className="col-md-2"></div>
                <div className="col-md-4"><img class="g-margin-t-0--xs" src="./img/message.png" alt="Logo" width="360" /></div>
            </div>

        </div>
    </div>)
}

export default About;
