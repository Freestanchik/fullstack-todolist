import React, {useState, useContext} from 'react'
import {BrowserRouter, Switch, Route, Link, useHistory} from 'react-router-dom'
import axios from 'axios'
import {AuthContext} from '../../context/AuthContext'

import './AuthPage.scss'

const AuthPage = () => {

    const history = useHistory()

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const {login} = useContext(AuthContext)

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            await axios.post('/api/auth/registration', {...form}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    const loginHandler = async () => {
        try {
            await axios.post('/api/auth/login', {...form}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    login(response.data.token, response.data.userId)
                })
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <BrowserRouter>
            <Switch>
                <React.Fragment>
                    <div className="container">
                        <div className="auth-page">
                            <Route path="/login">
                                <h3>Авторизація</h3>
                                <form className="form form-login" onSubmit={e => e.preventDefault()}>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input
                                                placeholder="Імейл"
                                                type="email"
                                                name="email"
                                                className="validate"
                                                onChange={changeHandler}
                                            />
                                        </div>
                                        <div className="input-field col s12">
                                            <input
                                                type="password"
                                                placeholder="Пароль"
                                                name="password"
                                                className="validate"
                                                onChange={changeHandler}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <button
                                            className="wawes-effect wawes-light btn btn blue"
                                            onClick={loginHandler}
                                        >
                                            Увійти
                                        </button>

                                        <Link to="/registration" className="btn-outline btn-reg">немає аккаунту ?</Link>
                                    </div>
                                </form>

                            </Route>


                            <Route path="/registration">
                                <h3>Регістрація</h3>
                                <form className="form form-login" onSubmit={e => e.preventDefault()}>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input
                                                placeholder="Імейл"
                                                type="email"
                                                name="email"
                                                className="validate"
                                                onChange={changeHandler}
                                            />
                                        </div>
                                        <div className="input-field col s12">
                                            <input
                                                placeholder="Пароль"
                                                type="password"
                                                name="password"
                                                className="validate"
                                                onChange={changeHandler}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <button
                                            className="wawes-effect wawes-light btn blue"
                                            onClick={registerHandler}
                                        >
                                            Регістрація
                                        </button>

                                        <Link to="/login" className="btn-outline btn-reg">Вже є аккаунт ?</Link>
                                    </div>
                                </form>
                            </Route>

                        </div>
                    </div>
                </React.Fragment>
            </Switch>
        </BrowserRouter>
    )
}

export default AuthPage
