import React, { Component } from 'react';
import axios from 'axios';
import '../../stylesheets/styles.add.css';

export default class AddPatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nic:'',
            firstname:'',
            lastname:'',
            address:'',
            age:'',
            tel:'',
            ward:'',
            admittedDate:'',
            error: 'null'
        };
    }

    handleChange = (event) =>{
        const {name, value} = event.target;
        this.setState({
           ...this.state,
           [name]:value
        });
        if(name === 'nic'){
            this.setState({
               error: 'null'
            })
        }
    }

    onSubmit = (event) => {
 
        event.preventDefault();

       const {nic, firstname, lastname, address, age, tel, ward, admittedDate} = this.state;

        const data={
            nic:nic,
            firstname:firstname,
            lastname:lastname,
            address:address,
            age:age,
            tel:tel,
            ward:ward,
            admittedDate:admittedDate,
        };
        axios.post('http://localhost:8080/patient/add', data).then((res) => {

            if (res.status === 200) {

                this.setState(
                    {
                        nic:'',
                        firstname:'',
                        lastname:'',
                        address:'',
                        age:'',
                        tel:'',
                        ward:'',
                        admittedDate:'',
                        error: 'null'
                    }
                );

                window.location.href = '/patient';

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
                                                    <h2><a href={'/patient'}>Back to Patients</a></h2>
                                                    <p>New Patient</p>
                                                </div>
                                                <form>
                                                    <div className="form-outline mb-4">
                                                        <div className="mb-6 left">
                                                            <input type="text"
                                                                id="fname"
                                                                name="firstname"
                                                                onChange={this.handleChange}
                                                                value={this.firstname}
                                                                className="form-control"
                                                                placeholder="First Name"
                                                                required />
                                                            <label className="form-label" htmlFor="form2Example11">First Name</label>
                                                        </div>
                                                        <div className="mb-6 right">
                                                            <input type="text"
                                                                id="lname"
                                                                name="lastname"
                                                                onChange={this.handleChange}
                                                                value={this.lastname}
                                                                className="form-control"
                                                                placeholder="Last Name"
                                                                required />
                                                            <label className="form-label" htmlFor="form2Example22">Last Name</label>
                                                        </div>
                                                    </div>
                                                    <div className="form-outline mb-4">
                                                        <input type="text"
                                                               id="nic"
                                                               name="nic"
                                                               onChange={this.handleChange}
                                                               value={this.nic}
                                                               className="form-control"
                                                               placeholder="NIC"
                                                               required />
                                                        <label className="form-label" htmlFor="form2Example11">NIC</label>
                                                    </div>
                                                    <div className="form-outline mb-4">
                                                        <input type="text"
                                                            id="address"
                                                            name="address"
                                                            onChange={this.handleChange}
                                                            value={this.address}
                                                            className="form-control"
                                                            placeholder="Address"
                                                            required />
                                                        <label className="form-label" htmlFor="form2Example11">Address</label>
                                                    </div>
                                                    <div className="form-outline mb-4">
                                                        <input type="number"
                                                               id="age"
                                                               name="age"
                                                               onChange={this.handleChange}
                                                               value={this.age}
                                                               className="form-control"
                                                               placeholder="Age"
                                                               required />
                                                        <label className="form-label" htmlFor="form2Example11">Age</label>
                                                    </div>
                                                    <div className="form-outline mb-4">
                                                        <input type="tel"
                                                            id="tel"
                                                            name="tel"
                                                            onChange={this.handleChange}
                                                            value={this.tel}
                                                            className="form-control"
                                                            placeholder="Telephone"
                                                            required />
                                                        <label className="form-label" htmlFor="form2Example11">Telephone</label>
                                                    </div>
                                                    <div className="form-outline mb-4">
                                                        <input type="text"
                                                               id="ward"
                                                               name="ward"
                                                               onChange={this.handleChange}
                                                               value={this.ward}
                                                               className="form-control"
                                                               placeholder="Ward"
                                                               required />
                                                        <label className="form-label" htmlFor="form2Example22">Ward</label>
                                                    </div>
                                                    <div className="form-outline mb-4">
                                                        <input type="date"
                                                               id="admittedDate"
                                                               name="admittedDate"
                                                               onChange={this.handleChange}
                                                               value={this.admittedDate}
                                                               className="form-control"
                                                               placeholder="admitedDate"
                                                               required />
                                                        <label className="form-label" htmlFor="form2Example22">Admitted-Date</label>
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
                                        <div className="add col-lg-6 d-flex align-items-center"></div>
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

