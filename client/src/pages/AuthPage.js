import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from './../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const { loading, error, request, clearError } = useHttp()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'Post', { ...form })
            message(data.message)
        } catch(e) {}
    }
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'Post', { ...form })
            auth.login(data.token, data.userId)

        } catch(e) {}
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Rlink</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div className="input-field">
                            <input 
                                placeholder="Введите email" 
                                id="email" type="text" 
                                name="email" 
                                className="white-text"
                                value={form.email}
                                onChange={changeHandler} 
                            />
                            <label hmtlFor="email">email</label>
                        </div>
                        <div className="input-field">
                            <input 
                                placeholder="Введите пароль" 
                                id="password" type="password"
                                name="password" 
                                className="white-text" 
                                value={form.password}
                                onChange={changeHandler}
                            />
                            <label htmlFor="password">password</label>
                        </div>
                    </div>
                    <div className="card-action">
                        <button 
                            onClick={loginHandler}
                            className="btn yellow darken-4" 
                            style={{ marginRight: 20 }}
                            disabled={loading}
                        >
                            Войти
                        </button>
                        <button 
                            onClick={registerHandler} 
                            className="btn grey lighten-1 black-text"
                            disabled={loading}
                        >
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
