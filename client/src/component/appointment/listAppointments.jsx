import React, { Component } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../stylesheets/styles.list.css';

class listAppointments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profiles: [],
            doctorspeciality : []
        };
    }

    componentDidMount() {

        axios.get(`http://localhost:8080/appointment/list`).then(async (res) => {

            try {
                if (res.data.success) {
                    this.setState({
                        profiles: res.data.profiles
                    });
                }
            }
            catch (err) {
                console.log(err);
            }

        }).catch((err) => { console.log(err) });

        axios.get(`http://localhost:8080/appointment/doctor`).then(async (res) => {

            try {
                if (res.data.success) {
                    this.setState({
                        doctorspeciality: res.data.doctorspeciality
                    });
                }
            }
            catch (err) {
                console.log(err);
            }

        }).catch((err) => { console.log(err) });


    }

    onSearchAll = () => {

        document.getElementById('dropdownMenuLink').innerHTML = 'All';

        axios.get(`http://localhost:8080/appointment/list`).then(async (res) => {

            try {
                if (res.data.success) {
                    this.setState({
                        profiles: res.data.profiles
                    });
                }
            }
            catch (err) {
                console.log(err);
            }

        }).catch((err) => { console.log(err) });
    }

    onSearch = (doctor) => {

        document.getElementById('dropdownMenuLink').innerHTML = doctor;

        axios.get(`http://localhost:8080/appointment/list/${doctor}`).then(async (res) => {

            try {
                if (res.data.success) {
                    this.setState({
                        profiles: res.data.profiles
                    });

                }
            }
            catch (err) {
                console.log(err);
            }

        }).catch((err) => { console.log(err) });
    }


    onSubmit = (id, doctor, patient) => {

        this.props.navigate(`/edit-Appointment/${doctor}-${patient}`, { state: id });

    }

    onDelete = (id) => {

        axios.delete(`http://localhost:8080/appointment/delete/${id}`).then(async (res) => {
            this.props.navigate('/appointment');
        })

        window.location.reload(false);

    }

    addAppointment = () => {
        this.props.navigate('/add-Appointment');
    }

    home = () => {
        this.props.navigate('/');
    }

    render() {

        return (
            <>
                <header id="header" className="fixed-top d-flex align-items-center header-transparent">
                    <div className="container d-flex align-items-center justify-content-between">

                        <div className="logo">
                            <h1><a href="#"><span>Appointments</span></a></h1>
                        </div>

                        <nav id="navbar" className="navbar">
                            <ul>
                                <li><a className="nav-link scrollto logout" onClick={this.addAppointment}>Add Appointment</a></li>
                            </ul>
                            <i className="bi bi-list mobile-nav-toggle"></i>
                        </nav>

                    </div>
                </header>

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a onClick={this.home}>Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Appointment</li>
                    </ol>
                </nav>

                <div className="ld dropdown">
                    <a
                        className="ld btn btn-primary dropdown-toggle"
                        href="#"
                        role="button"
                        id="dropdownMenuLink"
                        data-mdb-toggle="dropdown"
                        aria-expanded="false"
                    >
                        Choose Doctor
                    </a>

                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <li><button type="button" className="dropdown-item" onClick={this.onSearchAll}>All</button></li>
                        {this.state.doctorspeciality.map((doctor, index) => (
                            <li key={index}><button type="button" className="dropdown-item" onClick={()=> this.onSearch(doctor)}>{doctor}</button></li>
                        ))
                        }
                    </ul>
                </div>

                <div className="ld row">
                    {this.state.profiles.map((profile,index) => (
                        // const date = new Date().toLocaleDateString();
                        <div className="ld col-sm-6" key={index}>
                            <div className="ld card">
                                <div className="ld card-body">
                                    <h5 className="card-title">Doctor : {profile.doctor}</h5>
                                    <h5 className="card-title">Patient : {profile.patient}</h5>
                                    <p className="card-text">Date : {new Date(profile.date).toLocaleDateString()}</p>
                                    <p className="card-text">Time : {profile.time}</p>
                                    <p className="card-text">Speciality : {profile.speciality}</p>
                                    <button type="button" className="ld btn btn-primary profile" onClick={() => this.onSubmit(profile._id,profile.doctor,profile.patient)}>Edit Appointment</button>
                                    <button type="button" className="ld btn btn-primary delete-profile" onClick={()=>this.onDelete(profile._id)}>Cancel</button>
                                </div>
                            </div>
                        </div>
                        ))
                    }
                </div>
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

export default addHookTo(listAppointments);


