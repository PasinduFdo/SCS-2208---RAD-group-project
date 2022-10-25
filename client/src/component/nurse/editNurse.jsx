import React, { Component } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../stylesheets/styles.view.css';

class editNurse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            dob: '',
            address: '',
            tel: '',
            email: '',
            ward: '',
            position: '',
            appointment: '',
            image: '',
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

        const {firstname, lastname, dob, address, tel, email, ward, position, appointment} = this.state;

        const data = {
            firstname: firstname, 
            lastname: lastname, 
            dob: dob, 
            address: address, 
            tel: tel, 
            email: email, 
            ward: ward, 
            position: position, 
            appointment: appointment, 
        };

        axios.put(`http://localhost:8080/nurse/edit/${id}`, data).then((res) => {

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
                        ward: '',
                        position: '',
                        appointment: '',
                        image: '',
                    }
                );

                this.props.navigate(`/view-Nurse/${firstname}-${lastname}`, { state: id });

            }

        }).catch((err) => {
            this.setState({
                error: err.response.data.message
            });
        });

    }

    componentDidMount() {

        let id = this.props.location.state;

        axios.get(`http://localhost:8080/nurse/view/${id}`).then(async (res) => {

            try {

                if (res.data.success) {
                    this.setState({
                        firstname: res.data.profile.firstname,
                        lastname: res.data.profile.lastname,
                        dob: res.data.profile.dob,
                        address: res.data.profile.address,
                        tel: res.data.profile.tel,
                        email: res.data.profile.email,
                        ward: res.data.profile.ward,
                        position: res.data.profile.position,
                        appointment: res.data.profile.appointment,
                        image: res.data.profile.image,
                    });
                }
            }
            catch (err) {
                console.log(err);
            }

        }).catch((err) => { console.log(err) });

    }

    home = () => {
        this.props.navigate('/');
    }

    nurse = () => {
        this.props.navigate('/nurse');
    }


    render() {

        const profilepic = "/images/profile/" + this.state.image + ".png";

        return (
            <>
                <nav aria-label="breadcrumb">
                    <ol className="vd breadcrumb">
                        <li className="breadcrumb-item"><a onClick={this.home}>Home</a></li>
                        <li className="breadcrumb-item"><a onClick={this.nurse}>Nurse</a></li>
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
                                            <hr className="edit" />
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
                                                <p className="mb-0">Position</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <input type="text"
                                                       id="position"
                                                       name="position"
                                                       onChange={this.handleChange}
                                                       value={this.state.position}
                                                       className="form-control edit"
                                                       placeholder="Position"
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

export default addHookTo(editNurse);