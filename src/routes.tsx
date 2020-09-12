import React from 'react'
import {Route, BrowserRouter, Switch, Redirect} from 'react-router-dom'
import Login from './pages/Login'
import Main from './pages/Main'
import Home from './pages/Home'
import UtrList from './pages/UtrList'
import Utr from './pages/Utr'
import Users from './pages/Users'
import User from './pages/User'

function checkAuthenticated(){
    return localStorage.getItem('token') ? Home : Login 
}

const Routes = () => {
    return (
        <BrowserRouter>
        <Switch>
            <Route exact  path="/" render={()=>{
                return(
                    localStorage.getItem('token') ?
                    <Redirect to="/home"/> :
                    <Redirect to="/login"/>

                )
            }}/>

            <Route exact component={Login} path="/login"/>
            <Route exact component={Home} path="/home"/>
            <Route exact component={Main} path="/main"/>
            <Route exact component={Utr} path="/pivot/:id"/>
            <Route exact component={UtrList} path="/pivot"/>
            <Route exact component={Users} path="/users"/>
            <Route exact component={User} path="/user:id"/>
        </Switch>
        </BrowserRouter>
    )

}
export default Routes