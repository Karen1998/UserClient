import { BrowserRouter, Switch, Route } from 'react-router-dom'
import loadable from 'react-loadable';

import PrivateRoute from './PrivateRoute';


const ProfileComponent = loadable({
  loader: () => import('../pages/Profile'),
  loading: () => <div>Loading...</div>
});

const LoginComponent = loadable({
  loader: () => import('../pages/Login'),
  loading: () => <div>Loading...</div>
});

const HomeComponent = loadable({
  loader: () => import('../pages/Home'),
  loading: () => <div>Loading...</div>
});


const privateRoutes = [
  {
    name: 'Profile',
    path: '/profile',
    exact: true,
    component: ProfileComponent
  },
];

const publicRoutes = [
  {
    name: 'Home',
    path: '/',
    exact: true,
    component: HomeComponent
  },
  {
    name: 'Login',
    path: '/login',
    exact: true,
    component: LoginComponent
  },
];


const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        {publicRoutes.map((route) => (
          <Route key={route.path} {...route} />
        ))}

        {privateRoutes.map((route) => (
          <PrivateRoute key={route.path} {...route} />
        ))}
      </Switch>
    </BrowserRouter>
  )
};


export default Routes