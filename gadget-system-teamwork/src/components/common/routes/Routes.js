import React from 'react'
import {Switch, Route} from 'react-router-dom'
import PrivateRoute from '../routes/PrivateRoute'
import ListGadgetsPage from '../../gadgets/ListGadgetsPage'
import RegisterPage from '../../users/RegisterPage'
import LoginPage from '../../users/LoginPage'
import CreateGadgetPage from '../../gadgets/CreateGadgetPage'
import GadgetDetails from '../../gadgets/GadgetDetails'
import DeleteGadgetPage from '../../gadgets/DeleteGadgetPage'
import LogoutPage from '../../users/LogoutPage'

const Routes = (props) => (
  <Switch>
    <Route path='/' exact component={ListGadgetsPage} />
    <Route path='/users/register' component={RegisterPage} />
    <Route path='/users/login' component={LoginPage} />
    <PrivateRoute path='/gadgets/add' component={CreateGadgetPage} />
    <PrivateRoute path='/gadgets/details/:id' component={GadgetDetails} />
    <PrivateRoute path='/gadgets/delete/:id' component={DeleteGadgetPage} />
    <PrivateRoute path='/users/logout' component={LogoutPage} />
  </Switch>
)

export default Routes
