import { Navigate, Route, Routes } from 'react-router-dom';
import { TRoute, privateRoutes, publicRoutes } from './routesConfig';
import { DEFAULT_PATH } from './routesConfig/routesConst';

const renderRoute = (route: TRoute) => (
    <Route key={route.path} path={route.path} element={route.element}>
      {route.children?.map(renderRoute)}
    </Route>
  );

const renderRoutes = (publicR: TRoute[], privateR: TRoute[]) => (
  <Routes>
    <Route>{publicR.map(renderRoute)}</Route>
    <Route>{privateR.map(renderRoute)}</Route>
    <Route path='*' element={<Navigate to={DEFAULT_PATH} />} />
  </Routes>
);

function Router() {
  return renderRoutes(publicRoutes, privateRoutes);
}

export default Router;
