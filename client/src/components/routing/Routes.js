import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../routing/PrivateRoute';
import RegisterPage from '../../components/auth/RegisterPage';
import LoginPage from '../../components/auth/LoginPage';
import Alert from '../../components/layout/Alert';
import CreatePostPage from '../../components/CreatePostPage/CreatePostPage';
import PostsPage from '../../components/posts/PostsPage';
import NotFound from '../../components/notfoundpage/NotFound';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={RegisterPage} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/civic' component={PostsPage} />
        <PrivateRoute exact path='/create-post' component={CreatePostPage} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;