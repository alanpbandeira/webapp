
import './App.css'
import React, { useState } from 'react'
import { HashRouter } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

import Routes from './Routes'
import Logo from '../components/template/Logo'
import Nav from '../components/template/Nav'
import Footer from '../components/template/Footer'
import {AuthContext} from  '../context/Auth'

export default props => {
    
    const [authTokens, setAuthTokens] = useState();
    
    const setTokens = (data) => {
        localStorage.setItem("tokens", JSON.stringify(data));
        setAuthTokens(data);
      }

    return (
        <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
            <HashRouter>
                <div className="app">
                    <Logo />
                    <Nav />
                    <Routes />
                    <Footer />
                </div>
            </HashRouter>
        </AuthContext.Provider>
    )
}

