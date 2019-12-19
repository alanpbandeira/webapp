import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';


import Home from '../components/home/Home'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'
import Cart from '../components/cart/Cart'
import Checkout from '../components/checkout/Checkout'

import { useAuth } from "../context/Auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { authTokens } = useAuth();
    return (
        <Route
          {...rest}
          render={props =>
            authTokens ? (
              <Component {...props} />
            ) : (
              <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
            )
          }
        />
      )
}


const Routes = () =>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/cart' component={Cart} />

        <PrivateRoute path='/checkout' component={Checkout} />
        <Redirect from='*' to='/' />
    </Switch>
export default Routes