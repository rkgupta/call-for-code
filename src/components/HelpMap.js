/*jshint esversion: 6 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

class HelpMap extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userLocation: null
        };
    }

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                let coords = {
                    lat: 0,
                    lng: 0
                };

                coords.lat = position.coords.latitude;
                coords.lng = position.coords.longitude;

                this.setState({ userLocation: coords });
            });
        }

    }

    componentWillUnmount() {
        console.log('HelpMap: componentWillUnmount');
    }

    render() {
        const MapComponent = withGoogleMap((props) =>
            <GoogleMap
                defaultZoom={10}
                defaultCenter={this.state.userLocation}
            >
            </GoogleMap>
        )

        return (
            <div>
                <MapComponent
                    containerElement={<div style={{ height: `720px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />


                <div className="help-button-container btn-group">
                    <Link className="btn btn-danger waves-effect waves-light help-button" to="/helpform?seeker=true">Need Help</Link>
                    <Link className="btn btn-default waves-effect waves-light help-button" to="/helpform?volunteer=true">Offer Help</Link>
                </div>


            </div>

        );
    }

}

export default HelpMap;