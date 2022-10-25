import React, { Component } from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import '../../stylesheets/styles.landing.css';


class Landing extends Component {

    logout = () => {

        axios.get(`http://localhost:8080/logout`).then(async (res) => {
            localStorage.clear();
            window.location.reload(false);
        })


    }

    render() {
        return (
            <>

            <header id="header" className="fixed-top d-flex align-items-center header-transparent">
                <div className="container d-flex align-items-center justify-content-between">

                    <div className="logo">
                        <img alt="placeholder" src="images/logo.png" id="navbar-logo"/>
                        <h1><a href={"/dashboard"}><span>Care & Cure</span></a></h1>
                    </div>

                    <nav id="navbar" className="navbar">
                        <ul>
                            <li><a className="nav-link scrollto logout" href="/doctor">Doctors</a></li>
                            <li><a className="nav-link scrollto logout" href="/nurse">Nurses</a></li>
                            <li><a className="nav-link scrollto logout" href="/patient">Patients</a></li>
                            <li><a className="nav-link scrollto logout" href="/appointment">Appointments</a></li>
                            <li><a className="nav-link scrollto logout" href="/inventory">Inventory</a></li>
                            <li><a onClick={this.logout} className="nav-link scrollto logout" id="logout" href={"#logout"}>Logout</a></li>
                        </ul>

                    </nav>

                </div>
            </header>

            <br/><br/><br/><br/><br/>

                <section className="slice py-5">
                    <div className="container">
                        <div className="row">


                            <div className="col" id="desc">
                                <h1 className="display-4 text-center text-md-left mb-3">
                                    <strong className="text-primary">"Care & Cure"</strong>
                                </h1>
                                <h2 className="isplay-4 text-center text-md-left mb-3">Hospital Management System</h2>
                                <p className="lead text-center text-md-left text-muted">
                                    We always care and cure
                                </p>

                            </div>

                            <div className="col">

                                <figure className="w-100">
                                    <img alt="placeholder" src='images/HIMS.png' className="img-fluid mw-md-120"/>
                                </figure>
                            </div>

                        </div>
                    </div>
                </section>

            </>

        )
    };
}

function addHookTo(Component) {
    function CompWithHook(props) {
        const location = useLocation();
        const navigate = useNavigate();

        return <Component {...props} location={location} navigate={navigate} />;
    }

    return CompWithHook;
}

export default addHookTo(Landing);