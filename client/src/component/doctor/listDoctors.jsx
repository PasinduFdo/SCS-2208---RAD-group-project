import React, { Component } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../stylesheets/styles.list.css';

class listDoctors extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profiles: [],
            specialities: []
        };

    }

    componentDidMount() {

        axios.get(`http://localhost:8080/doctor/list`).then(async (res) => {

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

        axios.get(`http://localhost:8080/doctor/specialities`).then(async (res) => {

                try {
                    if (res.data.success) {
                        this.setState({
                            specialities: res.data.specialities
                        });
                    }
                }
                catch (err) {
                    console.log(err);
                }

        }).catch((err) => { console.log(err) });

    }

    onSearchAll = () => {

        document.getElementById('dropdownMenuLink').innerHTML = 'Speciality';

        axios.get(`http://localhost:8080/doctor/list`).then(async (res) => {

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

    onSearch = (speciality) => {

        document.getElementById('dropdownMenuLink').innerHTML = speciality;

        axios.get(`http://localhost:8080/doctor/list/${speciality}`).then(async (res) => {

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

    onSubmit = (id, firstname, lastname) => {

        this.props.navigate(`/view-Doctor/${firstname}-${lastname}`, { state: id });

    }

    onDelete = (id) => {

        axios.delete(`http://localhost:8080/doctor/delete/${id}`).then(async (res) => {
            // this.props.navigate('/doctor');
            window.location.reload();
        })


    }

    addDoctor = () => {
        this.props.navigate('/add-Doctor');
    }

    home = () => {
        this.props.navigate('/dashboard');
    }

    render() {

        return (
            <>
                <header id="header" className="fixed-top d-flex align-items-center header-transparent">
                    <div className="container d-flex align-items-center justify-content-between">

                        <div className="logo">
                            <h1><a href="#"><span>Doctor</span></a></h1>
                        </div>

                        <nav id="navbar" className="navbar">
                            <ul>
                                <li><a className="nav-link scrollto logout" onClick={this.addDoctor}>Add Doctor</a></li>
                            </ul>
                            <i className="bi bi-list mobile-nav-toggle"></i>
                        </nav>

                    </div>
                </header>

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a onClick={this.home}>Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Doctor</li>
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
                        Speciality
                    </a>

                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <li><button type="button" className="dropdown-item" onClick={this.onSearchAll}>All</button></li>
                        {this.state.specialities.map((speciality, index) => (
                            <li key={index}><button type="button" className="dropdown-item" onClick={()=> this.onSearch(speciality)}>{speciality}</button></li>
                            ))
                        }
                    </ul>
                </div>

                <div className="ld row">
                    {this.state.profiles.map((profile,index) => (
                        <div className="ld col-sm-6" key={index}>
                            <div className="ld card">
                                <div className="ld card-body">
                                    <h5 className="card-title">{profile.firstname} {profile.lastname}</h5>
                                    <p className="card-text">{profile.email}</p>
                                    <p className="card-text">Speciality : {profile.speciality}</p>
                                    <p className="card-text">Ward : {profile.ward}</p>
                                    <button type="button" className="ld btn btn-primary profile" onClick={() => this.onSubmit(profile._id,profile.firstname,profile.lastname)}>View Full Details</button>
                                    <button type="button" className="ld btn btn-primary delete-profile" onClick={()=>this.onDelete(profile._id)}>Delete Profile</button>
                                </div>
                            </div>
                        </div>
                        ))
                        // .filter((profile,index) => index !== 0)
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

export default addHookTo(listDoctors);


