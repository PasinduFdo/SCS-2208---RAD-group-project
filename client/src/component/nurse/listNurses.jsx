import React, { Component } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../stylesheets/styles.list.css';

class listNurses extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profiles: [],
            wards: []
        };
    }

    componentDidMount() {

        axios.get(`http://localhost:8080/nurse/list`).then(async (res) => {

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

        axios.get(`http://localhost:8080/nurse/wards`).then(async (res) => {

            try {
                if (res.data.success) {
                    this.setState({
                        wards: res.data.wards
                    });
                }
            }
            catch (err) {
                console.log(err);
            }

        }).catch((err) => { console.log(err) });

    }

    onSearchAll = () => {

        document.getElementById('dropdownMenuLink').innerHTML = 'Ward';

        axios.get(`http://localhost:8080/nurse/list`).then(async (res) => {

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

    onSearch = (ward) => {

        document.getElementById('dropdownMenuLink').innerHTML = "Ward " + ward;

        axios.get(`http://localhost:8080/nurse/list/${ward}`).then(async (res) => {

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

        this.props.navigate(`/view-Nurse/${firstname}-${lastname}`, { state: id });

    }

    onDelete = (id) => {

        axios.delete(`http://localhost:8080/nurse/delete/${id}`).then(async (res) => {
            //this.props.navigate('/nurse');
            window.location.reload(false);
        })

    }

    addNurse = () => {
        this.props.navigate('/add-Nurse');
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
                            <h1><a href="#"><span>Nurse</span></a></h1>
                        </div>

                        <nav id="navbar" className="navbar">
                            <ul>
                                <li><a className="nav-link scrollto logout" onClick={this.addNurse}>Add Nurse</a></li>
                            </ul>
                            <i className="bi bi-list mobile-nav-toggle"></i>
                        </nav>

                    </div>
                </header>

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a onClick={this.home}>Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Nurse</li>
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
                        Ward
                    </a>

                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <li><button type="button" className="dropdown-item" onClick={this.onSearchAll}>All</button></li>
                        {this.state.wards.map((ward, index) => (
                            <li key={index}><button type="button" className="dropdown-item" onClick={()=> this.onSearch(ward)}>{ward}</button></li>
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
                                    <p className="card-text">Position : {profile.position}</p>
                                    <p className="card-text">Ward : {profile.ward}</p>
                                    <button type="button" className="ld btn btn-primary profile" onClick={() => this.onSubmit(profile._id,profile.firstname,profile.lastname)}>View Full Details</button>
                                    <button type="button" className="ld btn btn-primary delete-profile" onClick={()=>this.onDelete(profile._id)}>Delete Profile</button>
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

export default addHookTo(listNurses);


