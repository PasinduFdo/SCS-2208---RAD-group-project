import React, { Component } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../stylesheets/styles.view.css';

class editDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            dob: '',
            address: '',
            tel: '',
            email: '',
            image: '',
            speciality: '',
            ward: '',
            appointment: '',
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            ...this.state,
            [name]: value
        });
        if (name === 'email') {
            this.setState({
                error: 'null'
            })
        }
    }

    onSubmit = (event) => {

        event.preventDefault();

        let id = this.props.location.state;

        const { firstname, lastname, dob, address, tel, email, speciality, ward, appointment } = this.state;

        const data = {
            firstname: firstname,
            lastname: lastname,
            dob: dob,
            address: address,
            tel: tel,
            email: email,
            speciality: speciality,
            ward: ward,
            appointment: appointment,
        };

        axios.put(`http://localhost:8080/doctor/edit/${id}`, data).then((res) => {

            console.log(res);

            if (res.status === 200) {
                alert("Profile Updated Successfully");
                this.setState(
                    {
                        firstname: '',
                        lastname: '',
                        dob: '',
                        address: '',
                        tel: '',
                        email: '',
                        image: '',
                        speciality: '',
                        ward: '',
                        appointment: '',
                    }
                );

                this.props.navigate(`/view-Doctor/${firstname}-${lastname}`, { state: id });

            }

        }).catch((err) => {
            this.setState({
                error: err.response.data.message
            });
        });

    }

    componentDidMount() {

        let id = this.props.location.state;

        axios.get(`http://localhost:8080/doctor/view/${id}`).then(async (res) => {

            try {

                if (res.data.success) {
                    this.setState({
                        firstname: res.data.profile.firstname,
                        lastname: res.data.profile.lastname,
                        dob: res.data.profile.dob,
                        email: res.data.profile.email,
                        address: res.data.profile.address,
                        tel: res.data.profile.tel,
                        image: res.data.profile.image,
                        speciality: res.data.profile.speciality,
                        ward: res.data.profile.ward,
                        appointment: res.data.profile.appointment,
                    });
                }
            }
            catch (err) {
                console.log(err);
            }

        }).catch((err) => { console.log(err) });

    }

    home = () => {
        this.props.navigate('/dashboard');
    }

    doctor = () => {
        this.props.navigate('/doctor');
    }


    render() {

        const profilepic = "/images/profile/" + this.state.image + ".png";

        return (
            <>
                <nav aria-label="breadcrumb">
                    <ol className="vd breadcrumb">
                        <li className="breadcrumb-item"><a onClick={this.home}>Home</a></li>
                        <li className="breadcrumb-item"><a onClick={this.doctor}>Doctor</a></li>
                        <li className="breadcrumb-item active" aria-current="page">{this.state.firstname} {this.state.lastname}</li>
                    </ol>
                </nav>
                <section className="proflie">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card mb-4">
                                <div className="card-body text-center">
                                <img src={profilepic} alt="profile" className="img-fluid rounded-circle add" id="profile" />
                                    <p className="text-muted mb-1">Edit Profile</p>
                                    <div className="d-flex justify-content-center mb-2">
                                        <button type="button" className="ld btn btn-primary profile" onClick={this.onSubmit}>Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="card mb-4">
                                <form>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">First Name</p>
                                            </div>
                                            <div className="col-sm-9">
                                            <input type="text"
                                                            id="fname"
                                                            name="firstname"
                                                            onChange={this.handleChange}
                                                            value={this.state.firstname}
                                                            className="form-control edit"
                                                            placeholder="First Name"
                                                            required />
                                                {/* <p className="text-muted mb-0">{firstname} {lastname}</p> */}
                                            </div>
                                            {/*<hr className="edit" />*/}
                                            <div className="col-sm-3">
                                                <p className="mb-0">Last Name</p>
                                            </div>
                                            <div className="col-sm-9">
                                            <input type="text"
                                                            id="lname"
                                                            name="lastname"
                                                            onChange={this.handleChange}
                                                            value={this.state.lastname}
                                                            className="form-control edit"
                                                            placeholder="Last Name"
                                                            required />
                                                {/* <p className="text-muted mb-0">{firstname} {lastname}</p> */}
                                            </div>
                                        </div>
                                        <hr className="edit" />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Date of Birth</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <input type="date"
                                                       id="dob"
                                                       name="dob"
                                                       onChange={this.handleChange}
                                                       value={this.state.dob.toString().substring(0, 10)}
                                                       className="form-control edit"
                                                       placeholder="Last Name"
                                                       required />
                                                {/* <p className="text-muted mb-0">{firstname} {lastname}</p> */}
                                            </div>
                                        </div>
                                        <hr className="edit" />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Email</p>
                                            </div>
                                            <div className="col-sm-9">
                                            <input type="email"
                                                        id="email"
                                                        name="email"
                                                        onChange={this.handleChange}
                                                        value={this.state.email}
                                                        className="form-control edit"
                                                        placeholder="Email"
                                                        required />
                                                {/* <p className="text-muted mb-0">{email}</p> */}
                                            </div>
                                        </div>
                                        <hr className="edit" />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Phone</p>
                                            </div>
                                            <div className="col-sm-9">
                                            <input type="tel"
                                                        id="tel"
                                                        name="tel"
                                                        onChange={this.handleChange}
                                                        value={this.state.tel}
                                                        className="form-control edit"
                                                        placeholder="Telephone"
                                                        required />
                                                {/* <p className="text-muted mb-0">{tel}</p> */}
                                            </div>
                                        </div>
                                        <hr className="edit" />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Address</p>
                                            </div>
                                            <div className="col-sm-9">
                                            <input type="text"
                                                        id="address"
                                                        name="address"
                                                        onChange={this.handleChange}
                                                        value={this.state.address}
                                                        className="form-control edit"
                                                        placeholder="Address"
                                                        required />
                                                {/* <p className="text-muted mb-0">{address}</p> */}
                                            </div>
                                        </div>
                                        <hr className="edit" />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Speciality</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <input type="text"
                                                       id="speciality"
                                                       name="speciality"
                                                       onChange={this.handleChange}
                                                       value={this.state.speciality}
                                                       className="form-control edit"
                                                       placeholder="Speciality"
                                                       required />
                                                {/* <p className="text-muted mb-0">{email}</p> */}
                                            </div>
                                        </div>
                                        <hr className="edit" />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Ward</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <input type="text"
                                                       id="ward"
                                                       name="ward"
                                                       onChange={this.handleChange}
                                                       value={this.state.ward}
                                                       className="form-control edit"
                                                       placeholder="Ward"
                                                       required />
                                                {/* <p className="text-muted mb-0">{email}</p> */}
                                            </div>
                                        </div>
                                        <hr className="edit" />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Date of Appointment</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <input type="date"
                                                       id="appointment"
                                                       name="appointment"
                                                       onChange={this.handleChange}
                                                       value={this.state.appointment.toString().substring(0, 10)}
                                                       className="form-control edit"
                                                       placeholder="Appointment"
                                                       required />
                                                {/* <p className="text-muted mb-0">{firstname} {lastname}</p> */}
                                            </div>
                                        </div>
                                        <hr className="edit" />
                                    </div>
                                </form>
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

export default addHookTo(editDoctor);