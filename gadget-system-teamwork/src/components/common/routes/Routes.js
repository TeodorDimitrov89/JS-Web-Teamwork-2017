import React from 'react'
import {Switch, Route} from 'react-router-dom'
import PrivateRoute from '../routes/PrivateRoute'
import ListGadgetsPage from '../../gadgets/ListGadgetsPage'
import RegisterPage from '../../users/RegisterPage'
import LoginPage from '../../users/LoginPage'
import CreateGadgetPage from '../../gadgets/CreateGadgetPage'
import GadgetDetailsPage from '../../gadgets/GadgetDetails'
import DeleteGadgetPage from '../../gadgets/DeleteGadgetPage'
import EditGadgetPage from '../../gadgets/EditGadgetPage'
import CreateCommentPage from '../../gadgets/CreateCommentPage'
import AdminPanelPage from '../../users/AdminPanelPage'
import LogoutPage from '../../users/LogoutPage'

const Routes = (props) => (
  <Switch>
    <Route path='/' exact component={ListGadgetsPage} />
    <Route path='/users/register' component={RegisterPage} />
    <Route path='/users/login' component={LoginPage} />
    <PrivateRoute path='/gadgets/add' component={CreateGadgetPage} />
    {/* <PrivateRoute path='/gadgets/details/:id/comments/create' component={CreateCommentPage} /> */}
    <PrivateRoute path='/gadgets/details/:id/comments/create/:title' component={CreateCommentPage} />
    <PrivateRoute path='/gadgets/details/:id' component={GadgetDetailsPage} />
    <PrivateRoute path='/gadgets/edit/:id' component={EditGadgetPage} />
    <PrivateRoute path='/gadgets/delete/:id' component={DeleteGadgetPage} />
    <PrivateRoute path='/users/admin-panel' component={AdminPanelPage} />
    <PrivateRoute path='/users/logout' component={LogoutPage} />
  </Switch>
)

export default Routes
