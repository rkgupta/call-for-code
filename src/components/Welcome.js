import React from 'react';

import { Link } from 'react-router-dom';

const WelcomeComponent = () => (
    <div className="container-fluid">
        <p> Hello, welcome to konnect app.</p>

        <p>This is a non-profit app intended to be used by people who are in need of help or can  offer help. </p>
        <Link className="btn btn-primary" to="/helpmap">Continue</Link>
    </div>

);

export default WelcomeComponent;

