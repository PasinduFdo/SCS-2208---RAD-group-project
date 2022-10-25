import React, { Component } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../stylesheets/styles.view.css';

class editAppointment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doctor: '',
            patient: '',
            date: '',
            time: '',
            speciality: '',
            error: 'null'
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            ...this.state,
            [name]: value
        });
        if (name === 'doctor') {
            this.setState({
                error: 'null'
            })
        }
    }

    onSubmit = (event) => {

        event.preventDefault();

        let id = this.props.location.state;

        const { doctor, patient, date, time, speciality } = this.state;

        const data = {
            doctor : doctor,
            patient : patient,
            date : date,
            time : time,
            speciality : speciality
        };

        axios.put(`http://localhost:8080/appointment/edit/${id}`, data).then((res) => {

            if (res.status === 200) {
                alert("Appointment Updated Successfully");
                this.setState(
                    {
                        doctor: '',
                        patient: '',
                        date: '',
                        time: '',
                        speciality: '',
                        error: 'null'
                    }
                );

                this.props.navigate(`/appointment`, { state: id });

            }

        }).catch((err) => {
            this.setState({
                error: err.response.data.message
            });
        });

    }

    componentDidMount() {

        let id = this.props.location.state;

        axios.get(`http://localhost:8080/appointment/view/${id}`).then(async (res) => {

            try {

                if (res.data.success) {
                    this.setState({
                        doctor: res.data.profile.doctor,
                        patient: res.data.profile.patient,
                        date: res.data.profile.date,
                        time: res.data.profile.time,
                        speciality: res.data.profile.speciality
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

    appointment = () => {
        this.props.navigate('/appointment');
    }


    render() {
        return (
            <>
                <nav aria-label="breadcrumb">
                    <ol className="vd breadcrumb">
                        <li className="breadcrumb-item"><a onClick={this.home}>Home</a></li>
                        <li className="breadcrumb-item"><a onClick={this.appointment}>Appointments</a></li>
                        <li className="breadcrumb-item active" aria-current="page">{this.state.doctor} | {this.state.patient}</li>
                    </ol>
                </nav>
                <section className="proflie">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card mb-4">
                                <div className="card-body text-center">
                                    <p className="text-muted mb-1">Edit Appointment</p>
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
                                                <p className="mb-0">Doctor Name</p>
                                            </div>
                                            <div className="col-sm-9">
                                            <input type="text"
                                                            id="doctor"
                                                            name="doctor"
                                                            onChange={this.handleChange}
                                                            value={this.state.doctor}
                                                            className="form-control edit"
                                                            placeholder="Doctor Name"
                                                            required />
                                            </div>
                                            <hr className="edit" />
                                            <div className="col-sm-3">
                                                <p className="mb-0">Patient Name</p>
                                            </div>
                                            <div className="col-sm-9">
                                            <input type="text"
                                                            id="patient"
                                                            name="patient"
                                                            onChange={this.handleChange}
                                                            value={this.state.patient}
                                                            className="form-control edit"
                                                            placeholder="Patient Name"
                                                            required />
                                            </div>
                                        </div>
                                        <hr className="edit" />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Date</p>
                                            </div>
                                            <div className="col-sm-9">
                                            <input type="date"
                                                        id="date"
                                                        name="date"
                                                        onChange={this.handleChange}
                                                        value = {this.state.date.toString().substring(0,10)}
                                                        className="form-control edit"
                                                        placeholder="Date"
                                                        required />
                                            </div>
                                        </div>
                                        <hr className="edit" />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Time</p>
                                            </div>
                                            <div className="col-sm-9">
                                            <input type="time"
                                                        id="time"
                                                        name="time"
                                                        onChange={this.handleChange}
                                                        value={this.state.time}
                                                        className="form-control edit"
                                                        placeholder="Time"
                                                        required />
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

export default addHookTo(editAppointment);