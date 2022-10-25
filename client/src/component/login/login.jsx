import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../stylesheets/styles.login.css';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: 'null'
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            ...this.state,
            [name]: value
        });
        if (name === 'username' || name === 'password') {
            this.setState({
                error: 'null'
            });
        }
    }

    onSubmit = (event) => {

        event.preventDefault();

        const { username, password } = this.state;

        const data = {
            username: username,
            password: password
        };

        axios.post('http://localhost:8080/login', data).then((res) => {

            try {
                let username = data.username;

                if (res.status === 200) {
                    this.setState(
                        {
                            username: '',
                            password: ''
                        }
                    );
                    localStorage.setItem('username', JSON.stringify({username:res.data.user.username}));
                    window.location.reload(false);
                }

            } catch (error) {
                console.log(error);
            }
            // window.location.href = res.data;

        }).catch((err) => {
            this.setState({
                error: err.response.data.message
            });
        });

    }

    render() {
        return (
            <>
                <header id="header" className="fixed-top d-flex align-items-center header-transparent">
                    <div className="container d-flex align-items-center justify-content-between">

                        <div className="logo">
                            <img alt="Image placeholder" src="images/logo.png" id="navbar-logo"/>
                            <h1><a href="#"><span>Care & Cure</span></a></h1>
                        </div>

                    </div>
                </header>

                <section className="login h-100 gradient-form">
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-xl-10">
                                <div className="card rounded-3 text-black">
                                    <div className="row g-0">
                                        <div className="col-lg-6">
                                            <div className="card-body login p-md-5 mx-md-4">

                                                <div className="text-center">
                                                    <h1 className="mt-1 mb-5 pb-1">Care & Cure</h1>
                                                    <h3 className="mt-1 mb-5 pb-1">Hospital Management System</h3>

                                                </div>

                                                <form>

                                                    <div className="form-outline mb-4 login">
                                                        <input type="email"
                                                            id="email"
                                                            name="username"
                                                            onChange={this.handleChange}
                                                            value={this.email}
                                                            className="form-control"
                                                            placeholder="Username"
                                                            required />
                                                        <label className="form-label" htmlFor="form2Example11">Username</label>
                                                        {this.state.error !== 'null' && <label className='form-error-label username'>Username</label>}
                                                    </div>

                                                    <div className="form-outline mb-4">
                                                        <input type="password"
                                                            id="password"
                                                            name="password"
                                                            onChange={this.handleChange}
                                                            value={this.password}
                                                            className="form-control"
                                                            placeholder="Password"
                                                            required />
                                                        <label className="form-label" htmlFor="form2Example22">Password</label>
                                                        {this.state.error !== 'null' && <label className='form-error-label password'>Password</label>}
                                                    </div>

                                                    <div className="text-center pt-1 mb-5 pb-1">
                                                        <button
                                                            className="login btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                                                            type="submit"
                                                            onClick={this.onSubmit}>
                                                            Login
                                                        </button>
                                                    </div>

                                                </form>

                                            </div>
                                        </div>
                                        <div className="col-lg-6 d-flex align-items-center">
                                            <img src="images/login.png" className="login" alt="login" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

function addHookTo(Component) {
    function CompWithHook(props) {
        const navigate = useNavigate();

        return <Component {...props} navigate={navigate} />;
    }

    return CompWithHook;
}

export default addHookTo(Login);

