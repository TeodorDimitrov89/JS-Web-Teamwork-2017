import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import ListPetsPage from '../../pets/ListPetsPage'
import RegisterPage from '../../users/RegisterPage'
import LoginPage from '../../users/LoginPage'
import LogoutPage from '../../users/LogoutPage'
import CreatePetPage from '../../pets/CreatePetPage'

const Routes = () => (
  <Switch>
    <Route path='/' exact component={ListPetsPage} />
    <Route path='/users/register' exact component={RegisterPage} />
    <Route path='/users/login' exact component={LoginPage} />
    <PrivateRoute path='/users/logout' component={LogoutPage} />
    <PrivateRoute path='/pets/add' component={CreatePetPage} />
  </Switch>
)

export default Routes
