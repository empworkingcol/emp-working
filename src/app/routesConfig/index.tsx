import { RouteProps } from 'react-router-dom'

import { DEFAULT_PATH } from './routesConst'
import Home from '../views/Home';
import Jobs from '../views/Jobs';
import News from '../views/News';
import Courses from '../views/Courses';
import Foro from '../views/Foro';
import Dashboard from '../views/Dashboard';
import Profile from '../views/Profile';

export type TRoute = RouteProps & {
  exact?: boolean;
  children?: TRoute[];
};

export const privateRoutes: TRoute[] = [
  {
    exact: true,
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    exact: true,
    path: '/profile',
    element: <Profile />,
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
];
