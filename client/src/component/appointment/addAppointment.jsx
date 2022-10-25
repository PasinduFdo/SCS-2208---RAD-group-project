import React, { Component } from 'react';
import axios from 'axios';
import '../../stylesheets/styles.add.css';

export default class addAppointment extends Component {

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

        const { doctor, patient, date, time, speciality } = this.state;

        const data = {
            doctor : doctor,
            patient : patient,
            date : date,
            time : time,
            speciality : speciality
        };

        axios.post('http://localhost:8080/appointment/add', data).then((res) => {

            if (res.status === 200) {

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

                window.location.href = '/appointment';

            }

        }).catch((err) => {
            this.setState({
                error: err.response.data.message
            });
        });

    }

    render() {
        return (
            <>
                <section className="h-100 gradient-form">
                    <div className="add container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-xl-10">
                                <div className="card rounded-3 text-black">
                                    <div className="row g-0">
                                        <div className="col-lg-6">
                                            <div className="card-body p-md-5 mx-md-4">

                                                <div className="section-title" data-aos="fade-up">
                                                    <h2><a href={'/appointment'}>Back to Appointments</a></h2>
                                                    <p>New Appointment</p>
                                                </div>
                                                <form>
                                                    <div className="form-outline mb-4">
                                                        <div className="mb-6 left">
                                                            <input type="text"
                                                                id="doctor"
                                                                name="doctor"
                                                                onChange={this.handleChange}
                                                                value={this.doctor}
                                                                className="form-control"
                                                                placeholder="Doctor Name"
                                                                required />
                                                            <label className="form-label" htmlFor="form2Example11">Doctor Name</label>
                                                        </div>
                                                        <div className="mb-6 right">
                                                            <input type="text"
                                                                id="patient"
                                                                name="patient"
                                                                onChange={this.handleChange}
                                                                value={this.patient}
                                                                className="form-control"
                                                                placeholder="Patient Name"
                                                                required />
                                                            <label className="form-label" htmlFor="form2Example22">Patient Name</label>
                                                        </div>
                                                    </div>
                                                    <div className="form-outline mb-4">
                                                        <input type="date"
                                                               id="date"
                                                               name="date"
                                                               onChange={this.handleChange}
                                                               value={this.date}
                                                               className="form-control"
                                                               placeholder="Date"
                                                               required />
                                                        <label className="form-label" htmlFor="form2Example11">Date</label>
                                                    </div>
                                                    <div className="form-outline mb-4">
                                                        <input type="time"
                                                            id="time"
                                                            name="time"
                                                            onChange={this.handleChange}
                                                            value={this.time}
                                                            className="form-control"
                                                            placeholder="time"
                                                            required />
                                                        <label className="form-label" htmlFor="form2Example11">time</label>
                                                    </div>
                                                    <div className="form-outline mb-4">
                                                        <input type="text"
                                                            id="speciality"
                                                            name="speciality"
                                                            onChange={this.handleChange}
                                                            value={this.speciality}
                                                            className="form-control"
                                                            placeholder="Speciality"
                                                            required />
                                                        <label className="form-label" htmlFor="form2Example22">Speciality</label>
                                                    </div>
                                                    <div className="text-center pt-1 mb-5 pb-1">
                                                        <button
                                                            className="ad btn btn-primary btn-block  gradient-custom-2 mb-3"
                                                            type="submit"
                                                            onClick={this.onSubmit}>
                                                            Add
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="add col-lg-6 d-flex align-items-center" style={{height: '100vh'}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    };
}
