import React, { Component } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../stylesheets/styles.view.css';

class editInventory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            category: '',
            qty: '',
            ward: ''
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

        const { name, category, qty, ward } = this.state;

        const data = {
            name: name,
            category: category,
            qty: qty,
            ward: ward
        };

        axios.put(`http://localhost:8080/inventory/edit/${id}`, data).then((res) => {

            console.log(res);

            if (res.status === 200) {
                alert("Inventory Updated Successfully");
                this.setState(
                    {
                        name: '',
                        category: '',
                        qty: '',
                        ward: ''
                    }
                );

                this.props.navigate(`/view-Inventory/${name}`, { state: id });

            }

        }).catch((err) => {
            this.setState({
                error: err.response.data.message
            });
        });

    }

    componentDidMount() {

        let id = this.props.location.state;

        axios.get(`http://localhost:8080/inventory/view/${id}`).then(async (res) => {

            try {

                if (res.data.success) {
                    this.setState({
                        name: res.data.profile.name,
                        category: res.data.profile.category,
                        qty: res.data.profile.qty,
                        ward: res.data.profile.ward
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

    inventory = () => {
        this.props.navigate('/inventory');
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
                                    <p className="text-muted mb-1">Edit Inventory</p>
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
                                                <p className="mb-0">Name</p>
                                            </div>
                                            <div className="col-sm-9">
                                            <input type="text"
                                                            id="fname"
                                                            name="name"
                                                            onChange={this.handleChange}
                                                            value={this.state.name}
                                                            className="form-control edit"
                                                            placeholder="Name"
                                                            required />
                                                {/* <p className="text-muted mb-0">{firstname} {lastname}</p> */}
                                            </div>
                                            <div className="col-sm-3">
                                                <p className="mb-0">Category</p>
                                            </div>
                                            <div className="col-sm-9">
                                            <input type="text"
                                                            id="address"
                                                            name="category"
                                                            onChange={this.handleChange}
                                                            value={this.state.category}
                                                            className="form-control edit"
                                                            placeholder="Category"
                                                            required />
                                                {/* <p className="text-muted mb-0">{firstname} {lastname}</p> */}
                                            </div>
                                        </div>
                                        <hr className="edit" />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Quantity</p>
                                            </div>
                                            <div className="col-sm-9">
                                            <input type="tel"
                                                        id="tel"
                                                        name="qty"
                                                        onChange={this.handleChange}
                                                        value={this.state.qty}
                                                        className="form-control edit"
                                                        placeholder="Quantity"
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

export default addHookTo(editInventory);
