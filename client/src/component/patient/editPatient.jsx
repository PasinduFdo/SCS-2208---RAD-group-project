import React, { Component } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../stylesheets/styles.view.css';

class editPatient extends Component{
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
    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            ...this.state,
            [name]: value
        });
        if (name === 'nic') {
            this.setState({
                error: 'null'
            })
        }
    }
    onSubmit = (event) => {
 
        event.preventDefault();

        let id=this.props.location.state;

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
        axios.put(`http://localhost:8080/patient/edit/${id}`, data).then((res) => {

            console.log(res);

            if (res.status === 200) {
                alert("profile Updated Successfully");
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

                this.props.navigate(`/view-Patient/${firstname}-${lastname}`, { state: id });

            }

        }).catch((err) => {
            this.setState({
                error: err.response.data.message
            });
        });

    }

    componentDidMount() {

        let id = this.props.location.state;

        axios.get(`http://localhost:8080/patient/view/${id}`).then(async (res) => {

            try {

                if (res.data.success) {
                    this.setState({
                        nic: res.data.profile.nic,
                        firstname: res.data.profile.firstname,
                        lastname: res.data.profile.lastname,                      
                        address: res.data.profile.address,
                        age: res.data.profile.age,
                        tel: res.data.profile.tel,
                        ward: res.data.profile.ward,
                        admittedDate: res.data.profile.admittedDate,
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

    patient = () => {
        this.props.navigate('/patient');
    }
    render() {

        return (
            <>
                <nav aria-label="breadcrumb">
                    <ol className="vd breadcrumb">
                        <li className="breadcrumb-item"><a onClick={this.home}>Home</a></li>
                        <li className="breadcrumb-item"><a onClick={this.patient}>Patient</a></li>
                        <li className="breadcrumb-item active" aria-current="page">{this.state.firstname} {this.state.lastname}</li>
                    </ol>
                </nav>
                <section className="proflie">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card mb-4">
                                <div className="card-body text-center">
                                    <p className="text-muted mb-1">Edit Patient Information</p>
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
                                            <p className="mb-0">NIC</p>
                                        </div>
                                        <div className="col-sm-9">
                                             <input type="text"
                                                    id="nic"
                                                    name="nic"
                                                    onChange={this.handleChange}
                                                    value={this.state.nic}
                                                    className="form-control edit"
                                                    placeholder="NIC"
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
                                                <p className="mb-0">Age</p>
                                            </div>
                                            <div className="col-sm-9">
                                            <input type="number"
                                                        id="age"
                                                        name="age"
                                                        onChange={this.handleChange}
                                                        value={this.state.age}
                                                        className="form-control edit"
                                                        placeholder="Age"
                                                        required />
                                                {/* <p className="text-muted mb-0">{address}</p> */}
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
                                                <p className="mb-0">Admitted Date</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <input type="date"
                                                       id="admittedDate"
                                                       name="admittedDate"
                                                       onChange={this.handleChange}
                                                       value={this.state.admittedDate.toString().substring(0,10)}
                                                       className="form-control edit"
                                                       placeholder="Admitted Date"
                                                       required />
                                                {/* <p className="text-muted mb-0">{email}</p> */}
                                            </div>
                                        </div>
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

export default addHookTo(editPatient);
