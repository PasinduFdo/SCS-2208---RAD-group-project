import React, { Component } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../stylesheets/styles.list.css';

class listInventory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profiles: []
        };
    }

    componentDidMount() {

        axios.get(`http://localhost:8080/inventory/list`).then(async (res) => {

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

    onSubmit = (id, name) => {

        this.props.navigate(`/view-Inventory/${name}`, { state: id });

    }

    onDelete = (id) => {

        axios.delete(`http://localhost:8080/inventory/delete/${id}`).then(async (res) => {
            this.props.navigate('/inventory');
            if(window.confirm('Are you sure you want to delete this Item?')){
              window.location.reload();
            }

        })

    }

    addInventory = () => {
        this.props.navigate('/add-Inventory');
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
                            <h1><a href="#"><span>Inventory</span></a></h1>
                        </div>

                        <nav id="navbar" className="navbar">
                            <ul>
                                <li><a className="nav-link scrollto logout" onClick={this.addInventory}>Add Inventory</a></li>
                            </ul>
                            <i className="bi bi-list mobile-nav-toggle"></i>
                        </nav>

                    </div>
                </header>

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a onClick={this.home}>Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Inventory</li>
                    </ol>
                </nav>

                <div className="ld row">
                    {this.state.profiles.map((profile,index) => (
                        <div className="ld col-sm-6" key={index}>
                            <div className="ld card">
                                <div className="ld card-body">
                                    <h5 className="card-title">{profile.name}</h5>
                                    <p className="card-text">Category : {profile.category}</p>
                                    <button type="button" className="ld btn btn-primary profile" onClick={() => this.onSubmit(profile._id,profile.name)}>View Full Details</button>
                                    <button type="button" className="ld btn btn-primary delete-profile" onClick={()=>this.onDelete(profile._id)}>Delete Inventory</button>
                                </div>
                            </div>
                        </div>
                      )).filter((profile,index) => index >= 0)
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

export default addHookTo(listInventory);
