import { RouteProps } from 'react-router-dom';

import { DEFAULT_PATH } from './routesConst';
import Home from '../views/Home';
import Jobs from '../views/Jobs';
import News from '../views/News';
import Courses from '../views/Courses';
import Foro from '../views/Foro';
import Dashboard from '../views/Dashboard';
import Profile from '../views/Profile';
import Login from '../views/Login';
import Register from '../views/Register';
import ProtectedRoute from '../layouts/ProtectedLogged';
import ProtectedLogout from '../layouts/ProtectedLogout';

export type TRoute = RouteProps & {
  exact?: boolean;
  children?: TRoute[];
};

export const privateRoutes: TRoute[] = [
  {
    exact: true,
    path: '/dashboard',
    element: (
      <ProtectedLogout>
        <Dashboard />
      </ProtectedLogout>
    ),
  },
  {
    exact: true,
    path: '/mycourses',
    element: (
      <ProtectedLogout>
        <Dashboard />
      </ProtectedLogout>
    ),
  },
  {
    exact: true,
    path: '/profile',
    element: (
      <ProtectedLogout>
        <Profile />
      </ProtectedLogout>
    ),
  },
];

export const publicRoutes: TRoute[] = [
  {
    exact: true,
    path: DEFAULT_PATH,
    element: <Home />,
  },
  {
    exact: true,
    path: '/jobs',
    element: <Jobs />,
  },
  {
    exact: true,
    path: '/news',
    element: <News />,
  },
  {
    exact: true,
    path: '/courses',
    element: <Courses />,
  },
  {
    exact: true,
    path: '/help',
    element: <Foro />,
  },
  {
    exact: true,
    path: '/login',
    element: (
      <ProtectedRoute>
        <Login />
      </ProtectedRoute>
    ),
  },
  {
    exact: true,
    path: '/register',
    element: (
      <ProtectedRoute>
        <Register />
      </ProtectedRoute>
    ),
  },
];
