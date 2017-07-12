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
import UserProfilePage from '../../users/UserProfilePage'
import BlockUnblockUserPage from '../../users/BlockUnblockUserPage'
import EditUserPage from '../../users/EditUserPage'
import DetailsUserPage from '../../users/DetailsUserPage'
import LogoutPage from '../../users/LogoutPage'
import HomePage from '../../gadgets/HomePage'
import NotFoundPage from '../NotFoundPage'

const Routes = (props) => (
  <Switch>
    <Route path='/' exact component={HomePage}/>
    <Route path='/users/register' component={RegisterPage}/>
    <Route path='/users/login' component={LoginPage}/>
    <Route path='/gadgets/all' component={ListGadgetsPage}/>
    <PrivateRoute path='/gadgets/details/:id/buy' exact component={GadgetDetailsPage}/>
    <PrivateRoute path='/gadgets/add' exact component={CreateGadgetPage}/>
    <PrivateRoute path='/gadgets/details/:id/comments/create/:title' exact component={CreateCommentPage}/>
    <PrivateRoute path='/gadgets/details/delete/comment/:id' exact component={DeleteCommentPage}/>
    <PrivateRoute path='/gadgets/details/edit/comment/:id' exact component={EditCommentPage}/>
    <PrivateRoute path='/gadgets/details/:id' exact component={GadgetDetailsPage}/>
    <PrivateRoute path='/gadgets/edit/:id' exact component={EditGadgetPage}/>
    <PrivateRoute path='/gadgets/delete/:id' exact component={DeleteGadgetPage}/>
    <PrivateRoute path='/users/admin-panel' exact component={AdminPanelPage}/>
    <PrivateRoute path='/users/bought-products/:id' exact component={UserProfilePage}/>
    <PrivateRoute path='/users/block-unblock/:id' exact component={BlockUnblockUserPage}/>
    <PrivateRoute path='/users/edit/:id' exact component={EditUserPage}/>
    <PrivateRoute path='/users/details/:id' exact component={DetailsUserPage}/>
    <PrivateRoute path='/users/logout' exact component={LogoutPage}/>
    <Route component={NotFoundPage}/>
  </Switch>
)

export default Routes
