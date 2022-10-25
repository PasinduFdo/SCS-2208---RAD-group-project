import React, { Component, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../stylesheets/styles.view.css';

class dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: {}
        };
    }

    componentDidMount() {

        let id = this.props.location.state;

        axios.get(`http://localhost:8080/doctor/view/${id}`).then(async (res) => {

            try {
                if (res.data.success) {
                    this.setState({
                        profile: res.data.profile
                    });
                }
            }
            catch (err) {
                console.log(err);
            }

        }).catch((err) => { console.log(err) });

    }

    onSubmit = (event) => {

        event.preventDefault();

        const { firstname, lastname } = this.state.profile;

        this.props.navigate(`/edit-Doctor/${firstname}-${lastname}`, { state: this.props.location.state });

    }

    home = () => {
        this.props.navigate('/dashboard');
    }

    doctor = () => {
        this.props.navigate('/doctor');
    }


    render() {

        const { firstname, lastname, dob, address, tel, email, image, speciality, ward, appointment } = this.state.profile;
        const DOB = new Date(dob).toLocaleDateString();
        const apmt = new Date(appointment).toLocaleDateString();
        const profilepic = "/images/profile/" + image + ".png";

        return (
            <>
                <nav aria-label="breadcrumb">
                    <ol className="vd breadcrumb">
                        <li className="breadcrumb-item"><a onClick={this.home}>Home</a></li>
                        <li className="breadcrumb-item"><a onClick={this.doctor}>Doctor</a></li>
                        <li className="breadcrumb-item active" aria-current="page">{firstname} {lastname}</li>
                    </ol>
                </nav>

                <section className="profile">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card mb-4">
                                <div className="card-body text-center">
                                    <div>
                                        <img src={profilepic} alt="profile" className="img-fluid rounded-circle add" id="profile" />
                                    </div>
                                    <h5 className="my-3">{firstname} {lastname}</h5>
                                    <p className="text-muted mb-1">{speciality}</p>
                                    <p className="text-muted mb-4">{address}</p>
                                    <div className="d-flex justify-content-center mb-2">
                                        <button type="button" className="ld btn btn-primary profile" onClick={this.onSubmit}>Edit Profile</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-8">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Full Name</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{firstname} {lastname}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Date of Birth</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{DOB}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Email</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{email}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Phone</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{tel}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Address</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{address}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Ward</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{ward}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Date of Appointment</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{apmt}</p>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
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

        return <Component {...props} location={location} navigate={navigate}/>;
    }

    return CompWithHook;
}

export default addHookTo(dashboard);


