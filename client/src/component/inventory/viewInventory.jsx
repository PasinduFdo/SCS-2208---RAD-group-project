import React, { Component } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../stylesheets/styles.view.css';

class dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: {}
        };
    }

    componentDidMount() {

        let id = this.props.location.state;

        axios.get(`http://localhost:8080/inventory/view/${id}`).then(async (res) => {

            try {
                if (res.data.success) {
                    this.setState({
                        profile: res.data.profile
                    });
                }
            }
            catch (err) {
                console.log(err);
            }

        }).catch((err) => { console.log(err) });

    }

    onSubmit = (event) => {

        event.preventDefault();

        const { name } = this.state.profile;

        this.props.navigate(`/edit-Inventory/${name}`, { state: this.props.location.state });

    }

    home = () => {
        this.props.navigate('/');
    }

    inventory = () => {
        this.props.navigate('/inventory');
    }


    render() {

        const { name, category, qty, ward } = this.state.profile;

        return (
            <>
                <nav aria-label="breadcrumb">
                    <ol className="vd breadcrumb">
                        <li className="breadcrumb-item"><a onClick={this.home}>Home</a></li>
                        <li className="breadcrumb-item"><a onClick={this.inventory}>Inventory</a></li>
                        <li className="breadcrumb-item active" aria-current="page">{name}</li>
                    </ol>
                </nav>

                <section className="profile">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card mb-4">
                                <div className="card-body text-center">
                                    <h5 className="my-3">{name}</h5>
                                    <p className="text-muted mb-4">{category}</p>
                                    <div className="d-flex justify-content-center mb-2">
                                        <button type="button" className="ld btn btn-primary profile" onClick={this.onSubmit}>Edit Item</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-8">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Name</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{name}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Category</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{category}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Quantity</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{qty}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Ward</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{ward}</p>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
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

export default addHookTo(dashboard);
