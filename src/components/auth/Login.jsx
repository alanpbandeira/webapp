import React, { useState } from 'react'
import './Login.css'
import Main from '../template/Main'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import { useAuth } from "../../context/Auth";

const headerProps = {
    title: 'Maccommerce',
}

function Login() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthTokens } = useAuth();
    let user;


    function postLogin(e) {
         e.preventDefault()

        user = {username, password}

        console.log("Iniciando requisição:")
        console.log(user)
        axios.post(`http://localhost:8000/authenticate`, user)
        .then(resp => {
            console.log(resp.data)
            if ((resp.status_code = 200)) {
                setAuthTokens(resp.data);
                setLoggedIn(true);
                console.log("Login realizado com sucesso!!!")
                alert("Login realizado com sucesso!!!")
            } else {
                console.log("Opa algo deu errado no login!!!")
                alert("Opa algo deu errado no login!!!" + resp.data)
            }
        }).catch((error) => {
            console.log(error)
            alert("Credenciais inválidas")
        })
    }

    if (isLoggedIn) {
        return <Redirect to="/" />;
    }

    return (
        <Main  {...headerProps}>
            <div className="login-page">
                <div className="form">
                    <form className="login-form"><h1>Login</h1><p />
                        Nome de usuario:
                        <input type="text" className="form-control"
                            type="username"
                            value={username}
                            onChange={e => { setUserName(e.target.value)}}
                            placeholder="username" />
                        Senha:
                        <input type="password" className="form-control"
                            type="password"
                            value={password}
                            onChange={e => { setPassword(e.target.value)}}
                            placeholder="1234" />

                        <button className="btn btn-primary"
                            onClick={postLogin}>
                            Login
                            </button>
                        <p className="message">Não registado? <Link to="/register">Crie uma conta</Link></p>
                    </form>
                </div>
            </div>
        </Main>
    )
}

export default Login;