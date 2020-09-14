import React from 'react'
import {Route, BrowserRouter, Switch, Redirect} from 'react-router-dom'
import Login from './pages/Login'
import Main from './pages/Main'
import Home from './pages/Home'
import UtrList from './pages/UtrList'
import Utr from './pages/Utr/index.js'
import Users from './pages/Users'
import Farms from './pages/Farms'
import Pivots from './pages/Pivots'
import Permissions from './pages/Permissions'

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
            <Route exact component={UtrList} path="/utrs"/>
            <Route exact component={Users} path="/usuarios"/>
            <Route exact component={Utr} path="/utrs/:id"/>
            <Route exact component={Farms} path="/fazendas"/>
            <Route exact component={Pivots} path="/pivos"/>
            <Route exact component={Permissions} path="/permissoes"/>
        </Switch>
        </BrowserRouter>
    )

}
export default Routes