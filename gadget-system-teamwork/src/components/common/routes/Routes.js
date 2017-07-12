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
import DeleteCommentPage from '../../gadgets/DeleteCommentPage'
import EditCommentPage from '../../gadgets/EditCommentPage'
import AdminPanelPage from '../../users/AdminPanelPage'
import BlockUnblockUserPage from '../../users/BlockUnblockUserPage'
import EditUserPage from '../../users/EditUserPage'
import DetailsUserPage from '../../users/DetailsUserPage'
import LogoutPage from '../../users/LogoutPage'

const Routes = (props) => (
  <Switch>
    <Route path='/' exact component={ListGadgetsPage} />
    <Route path='/users/register' component={RegisterPage} />
    <Route path='/users/login' component={LoginPage} />
    <PrivateRoute path='/gadgets/add' component={CreateGadgetPage} />
    <PrivateRoute path='/gadgets/details/:id/comments/create/:title' component={CreateCommentPage} />
    <PrivateRoute path='/gadgets/details/delete/comment/:id' component={DeleteCommentPage} />
    <PrivateRoute path='/gadgets/details/edit/comment/:id' component={EditCommentPage} />
    <PrivateRoute path='/gadgets/details/:id' component={GadgetDetailsPage} />
    <PrivateRoute path='/gadgets/edit/:id' component={EditGadgetPage} />
    <PrivateRoute path='/gadgets/delete/:id' component={DeleteGadgetPage} />
    <PrivateRoute path='/users/admin-panel' component={AdminPanelPage} />
    <PrivateRoute path='/users/block-unblock/:id' component={BlockUnblockUserPage} />
    <PrivateRoute path='/users/edit/:id' component={EditUserPage} />
    <PrivateRoute path='/users/details/:id' component={DetailsUserPage} />
    <PrivateRoute path='/users/logout' component={LogoutPage} />
  </Switch>
)

export default Routes
