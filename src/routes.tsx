import React from 'react'
import {Route, BrowserRouter, Switch, Redirect} from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import HomeAdmin from './pages/HomeAdmin'
import Utr from './pages/Utr/index.jsx'
import Users from './pages/Users'
import User from './pages/User'
import Farms from './pages/Farms'
import Pivots from './pages/Pivots'
import FarmsRegister from './pages/FarmsRegister'
import ModelUtrRegister from './pages/ModelUtrRegister'
import PivotsRegister from './pages/PivotsRegister'
import UsersRegister from './pages/UsersRegister'
import UtrRegister from './pages/UtrRegister'
import Tractor from './pages/Tractor'
import TractorRegister from './pages/TractorRegister'
import PlanoRega from './pages/PlanoRega'
import Header from './pages/Header'

// import Permissions from './pages/Permissions'
import ModelUtr from './pages/ModelUtr'

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
           
            <Route exact component={Users} path="/usuarios"/>
            <Route exact component={User} path="/usuarios/:id"/>
            <Route exact component={Utr} path="/utrs/:id"/>
            <Route exact component={Farms} path="/fazendas"/>
            <Route exact component={Tractor} path="/tratores"/>
            <Route exact component={TractorRegister} path="/cadastros/tratores"/>
            <Route exact component={FarmsRegister} path="/cadastros/fazendas"/>
            <Route exact component={Pivots} path="/pivos"/>
            <Route exact component={PivotsRegister} path="/cadastros/pivos"/>
            <Route exact component={UtrRegister} path="/cadastros/utrs"/>
            <Route exact component={UsersRegister} path="/cadastros/usuarios"/>
            <Route exact component={PlanoRega} path="/cadastros/planorega"/>

           
            {/* <Route exact component={Permissions} path="/permissoes"/> */}

            {/* Adimin routes */}
            <Route exact component={HomeAdmin} path="/admin/home"/>
            <Route exact component={ModelUtr} path="/admin/modeloutr"/>
            
            <Route exact component={Users} path="/admin/usuarios"/>
            <Route exact component={Utr} path="/admin/utrs/:id"/>
            <Route exact component={Farms} path="/admin/fazendas"/>
            <Route exact component={Pivots} path="/admin/pivos"/>
            <Route exact component={Tractor} path="/admin/tratores"/>
            <Route exact component={TractorRegister} path="/admin/cadastros/tratores"/>
            <Route exact component={FarmsRegister} path="/admin/cadastros/fazendas"/>
            <Route exact component={PivotsRegister} path="/admin/cadastros/pivos"/>
            <Route exact component={UsersRegister} path="/admin/cadastros/usuarios"/>
            <Route exact component={UtrRegister} path="/admin/cadastros/utrs"/>
            <Route exact component={ModelUtrRegister} path="/admin/cadastros/modeloutr"/>
            <Route exact component={PlanoRega} path="/admin/cadastros/planorega/:id"/>
            
        </Switch>
        </BrowserRouter>
    )

}
export default Routes