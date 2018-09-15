/*jshint esversion: 6 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { Button } from 'mdbreact';
import { ROLE_SEEKER, ROLE_VOLUNTEER } from './Constants';
import Spinner from 'react-spinkit';

class HelpMap extends Component {

    constructor(props) {
        super(props);
        this.seeker_icon = {
            url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='38' height='38' viewBox='0 0 38 38'%3E%3Cpath fill='%23f04800' stroke='%23fff' stroke-width='.5' d='M34.305 16.234c0 8.83-15.148 19.158-15.148 19.158S3.507 25.065 3.507 16.1c0-8.505 6.894-14.304 15.4-14.304 8.504 0 15.398 5.933 15.398 14.438z'%3E%3C/path%3E%3Ctext transform='translate(19 18.5)' fill='%23fff' style='font-family: Arial, sans-serif;font-weight:bold;text-align:center' font-size='12' text-anchor='middle'%3ES%3C/text%3E%3C/svg%3E",
            fillColor: 'red',
            strokeColor: '#fff',
            strokeWidth: .5,
        };
        this.volunteer_icon = {
            url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='38' height='38' viewBox='0 0 38 38'%3E%3Cpath fill='%231A5627' stroke='%23fff' stroke-width='.5' d='M34.305 16.234c0 8.83-15.148 19.158-15.148 19.158S3.507 25.065 3.507 16.1c0-8.505 6.894-14.304 15.4-14.304 8.504 0 15.398 5.933 15.398 14.438z'%3E%3C/path%3E%3Ctext transform='translate(19 18.5)' fill='%23fff' style='font-family: Arial, sans-serif;font-weight:bold;text-align:center' font-size='12' text-anchor='middle'%3EV%3C/text%3E%3C/svg%3E",
            fillColor: '#1A5627',
            strokeColor: '#fff',
            strokeWidth: .5,
        };
        this.state = {
            ...props.location.state,
            showUserMarker: false,
            seachingHelp: false,
            helpMarkers: [],
            userLocation: null
        };
    }

    createHelp = (userRole) => {

        this.props.history.push({
            pathname: '/helpform',
            state: {
                role: userRole,
                location: { ...this.state.userLocation }
            }
        });
    }

    setHelpMarkers = () => {
        console.log('setHelpMarkers called after 5 secs');
        const loc1 = { lat: 28.566008, lng: 77.176743 };
        const loc2 = { lat: 28.491681, lng: 77.094897 };
        const loc3 = { lat: 28.993758, lng: 77.682244 };

        let markers = [];
        markers.push(loc1);
        markers.push(loc2);
        markers.push(loc3);

        this.setState({ helpMarkers: markers });
        this.setState({ seachingHelp: false });
    };

    componentWillMount() {
        const userMarker = this.state.userMarker;
        if (userMarker) {
            this.setState({ showUserMarker: true });
        }
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
        if (this.state.showUserMarker) {
            this.setState({ seachingHelp: true });
            setTimeout(this.setHelpMarkers, 10000);
            // axios.get('/api/helps', {
            //     ...this.state,
            //     location: {
            //         type: 'Point',
            //         coordinates: [this.props.location.state.location.lng, this.props.location.state.location.lat]
            //     }
            // }).then((response) => {
            //     this.setState({ searchInProgress: false });
            //     // Navigate to search result page or not found page
            //     const res = response.data;
            //     if (res._id) {
            //         this.props.history.push({
            //             pathname: '/helpmap',
            //             state: {
            //                 userMarker: { ...this.state },
            //                 role: this.state.role
            //             }
            //         });
            //     }
            // }).catch(error => {
            //     this.setState({ searchInProgress: false });
            //     this.props.history.push({ pathname: '/error' });
            // });
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
                {
                    this.state.showUserMarker &&
                    <Marker position={this.state.userLocation} icon={(this.state.role === ROLE_SEEKER) ? this.seeker_icon : this.volunteer_icon} />
                }
                {
                    this.state.helpMarkers.map((marker, index) => {
                        return (
                            <Marker
                                position={marker}
                                key={'help-marker-' + index}
                                icon={(this.state.role === ROLE_SEEKER) ? this.volunteer_icon : this.seeker_icon}
                            />
                        )
                    })
                }
                {
                    this.state.seachingHelp &&
                    <div className="search-spinner">
                        <Spinner name="ball-scale-multiple" color="cyan" />
                    </div>

                }

            </GoogleMap>
        )

        return (
            <div>
                <MapComponent
                    containerElement={<div style={{ height: `720px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />

                <div className="help-button-container btn-group">
                    <Button color="danger" className="help-button" onClick={() => this.createHelp(ROLE_SEEKER)}>Need Help</Button>
                    <Button color="default" className="help-button" onClick={() => this.createHelp(ROLE_VOLUNTEER)}>Offer Help</Button>
                </div>


            </div>

        );
    }

}

export default HelpMap;